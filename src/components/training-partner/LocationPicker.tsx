import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Navigation,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
  Compass,
  Crosshair,
  Search,
  X,
  Layers,
} from 'lucide-react';

interface LocationPickerProps {
  latitude?: string;
  longitude?: string;
  onLocationChange: (
    lat: string,
    lng: string,
    geocodedData?: {
      addressLine1?: string;
      city?: string;
      district?: string;
      pinCode?: string;
      state?: string;
    }
  ) => void;
  label?: string;
  description?: string;
  defaultDistrict?: string;
}

// Popular training hub centers in Maharashtra for quick reference
const POPULAR_MH_HUBS = [
  { name: 'Pune (Hinjawadi IT Park)', lat: 18.5913, lng: 73.7389, district: 'Pune', pin: '411057' },
  { name: 'Pune (Shivajinagar / Central)', lat: 18.5314, lng: 73.8446, district: 'Pune', pin: '411005' },
  { name: 'Mumbai (BKC Skill Complex)', lat: 19.0664, lng: 72.8687, district: 'Mumbai Suburban', pin: '400051' },
  { name: 'Thane (Wagle Industrial Estate)', lat: 19.1918, lng: 72.9554, district: 'Thane', pin: '400604' },
  { name: 'Nagpur (MIDC Butibori)', lat: 20.9167, lng: 78.9667, district: 'Nagpur', pin: '441108' },
  { name: 'Nashik (Ambad MIDC)', lat: 19.9572, lng: 73.7431, district: 'Nashik', pin: '422010' },
  { name: 'Aurangabad / Chh. Sambhajinagar', lat: 19.8762, lng: 75.3433, district: 'Chhatrapati Sambhajinagar', pin: '431001' },
];

export const LocationPicker: React.FC<LocationPickerProps> = ({
  latitude = '',
  longitude = '',
  onLocationChange,
  label = 'Geo-Location & Map Coordinates',
  description = 'Accurate geographic coordinates are mandatory for MSSDS centre inspection & GIS geo-tagging.',
  defaultDistrict = 'Pune',
}) => {
  const [isLocating, setIsLocating] = useState(false);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [locationStatus, setLocationStatus] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [reverseAddress, setReverseAddress] = useState<string | null>(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Parse current coordinates
  const currentLat = parseFloat(latitude) || 18.5204;
  const currentLng = parseFloat(longitude) || 73.8567;
  const hasValidCoords = Boolean(latitude && longitude && !isNaN(parseFloat(latitude)) && !isNaN(parseFloat(longitude)));

  // Perform reverse geocoding lookup
  const performReverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        {
          headers: {
            'Accept-Language': 'en',
          },
        }
      );
      if (!response.ok) return;

      const data = await response.json();
      if (data && data.address) {
        const addr = data.address;
        const road = addr.road || addr.suburb || addr.neighbourhood || addr.industrial || '';
        const city = addr.city || addr.town || addr.village || addr.municipality || '';
        const district = addr.state_district || addr.county || '';
        const pinCode = addr.postcode || '';
        const state = addr.state || 'Maharashtra';

        const formattedAddress = [road, city, district, pinCode].filter(Boolean).join(', ');
        setReverseAddress(formattedAddress || data.display_name);

        onLocationChange(lat.toFixed(6), lng.toFixed(6), {
          addressLine1: road,
          city,
          district,
          pinCode,
          state,
        });
      }
    } catch (err) {
      console.warn('Reverse geocode lookup warning:', err);
    }
  };

  // HTML5 Geolocation API Handler
  const handleAcquireCurrentLocation = () => {
    if (!navigator.geolocation) {
      setStatusType('error');
      setLocationStatus('Geolocation is not supported by your current browser.');
      return;
    }

    setIsLocating(true);
    setStatusType('loading');
    setLocationStatus('Requesting GPS permission from browser... Please click "Allow".');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude: lat, longitude: lng, accuracy: acc } = position.coords;
        const latStr = lat.toFixed(6);
        const lngStr = lng.toFixed(6);

        setIsLocating(false);
        setStatusType('success');
        setAccuracy(Math.round(acc));
        setLocationStatus(`GPS Location acquired successfully (Accuracy: ±${Math.round(acc)}m)`);

        onLocationChange(latStr, lngStr);
        await performReverseGeocode(lat, lng);
      },
      (error) => {
        setIsLocating(false);
        setStatusType('error');
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationStatus(
              'Location permission was denied. Please allow location access in your browser address bar icon, or pick coordinates using the map.'
            );
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationStatus('GPS signal unavailable. Please ensure location services are enabled on your device.');
            break;
          case error.TIMEOUT:
            setLocationStatus('Location request timed out. Please try again or select your location on the map.');
            break;
          default:
            setLocationStatus('Unable to acquire GPS location. Please enter coordinates or pick on map.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 0,
      }
    );
  };

  // Search places in Maharashtra using Nominatim
  const handleSearchPlace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const query = `${searchQuery.trim()}, Maharashtra, India`;
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`,
        { headers: { 'Accept-Language': 'en' } }
      );
      const results = await res.json();
      if (results && results.length > 0) {
        const first = results[0];
        const lat = parseFloat(first.lat);
        const lng = parseFloat(first.lon);
        onLocationChange(lat.toFixed(6), lng.toFixed(6));
        setReverseAddress(first.display_name);
        setStatusType('success');
        setLocationStatus(`Location matched: ${first.display_name.split(',')[0]}`);
      } else {
        setStatusType('error');
        setLocationStatus('Could not locate address. Try searching a district, city, or landmark.');
      }
    } catch {
      setStatusType('error');
      setLocationStatus('Location search failed. Please verify internet connection.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#ea580c]" />
            <span>{label}</span>
          </span>
          <p className="text-[11px] text-slate-500 mt-0.5">{description}</p>
        </div>

        {hasValidCoords && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full text-[10px] font-bold self-start sm:self-auto">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Geo-Coordinates Tagged</span>
          </span>
        )}
      </div>

      {/* Lat & Lng Input Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
            Latitude (°N) *
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g., 18.520430"
              value={latitude}
              onChange={(e) => onLocationChange(e.target.value, longitude)}
              className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-mono text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0f2e5a] focus:border-transparent transition"
            />
            <span className="absolute right-3 top-2.5 text-[10px] text-slate-400 font-mono">°N</span>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
            Longitude (°E) *
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g., 73.856743"
              value={longitude}
              onChange={(e) => onLocationChange(latitude, e.target.value)}
              className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-mono text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0f2e5a] focus:border-transparent transition"
            />
            <span className="absolute right-3 top-2.5 text-[10px] text-slate-400 font-mono">°E</span>
          </div>
        </div>
      </div>

      {/* Action Buttons: Allow Location / Pick on Map */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <button
          type="button"
          onClick={handleAcquireCurrentLocation}
          disabled={isLocating}
          className="px-3.5 py-2 bg-[#ea580c] hover:bg-[#c2410c] text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-60"
          title="Detect precise location using browser GPS"
        >
          {isLocating ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
              <span>Acquiring GPS Fix...</span>
            </>
          ) : (
            <>
              <Navigation className="w-3.5 h-3.5 text-white" />
              <span>Allow &amp; Detect My Live Location</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => setShowMapModal(true)}
          className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
        >
          <Compass className="w-3.5 h-3.5 text-[#0f2e5a]" />
          <span>Mark Location on Interactive Map</span>
        </button>
      </div>

      {/* Live Status / Accuracy Feedback Banner */}
      {statusType !== 'idle' && locationStatus && (
        <div
          className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
            statusType === 'loading'
              ? 'bg-blue-50 text-blue-900 border border-blue-200'
              : statusType === 'success'
              ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
              : 'bg-red-50 text-red-900 border border-red-200'
          }`}
        >
          {statusType === 'loading' && <Loader2 className="w-4 h-4 animate-spin shrink-0 text-blue-600 mt-0.5" />}
          {statusType === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />}
          {statusType === 'error' && <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />}
          <div className="flex-1 leading-relaxed">
            <span className="font-semibold">{locationStatus}</span>
            {accuracy && (
              <span className="block text-[10px] text-emerald-700 mt-0.5">
                Precision: High-Accuracy GPS satellite/network lock
              </span>
            )}
          </div>
        </div>
      )}

      {/* Reverse Geocoded Address Preview if available */}
      {reverseAddress && (
        <div className="p-2.5 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-950 flex items-start gap-2">
          <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-[11px]">
            <span className="font-bold text-amber-900">Detected Geographic Area: </span>
            <span className="font-medium text-slate-700">{reverseAddress}</span>
          </div>
        </div>
      )}

      {/* Embedded Mini Map Preview when coordinates are present */}
      {hasValidCoords && (
        <div className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-2xs">
          <div className="px-3 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5 font-bold text-slate-700">
              <Layers className="w-3.5 h-3.5 text-[#0f2e5a]" />
              <span>Active GPS Location Preview</span>
            </div>
            <a
              href={`https://www.google.com/maps?q=${latitude},${longitude}`}
              target="_blank"
              rel="noreferrer"
              className="text-[10px] text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 hover:underline"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

          <div className="relative h-44 w-full bg-slate-100">
            <iframe
              title="Centre Location Map"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${currentLng - 0.01}%2C${currentLat - 0.007}%2C${currentLng + 0.01}%2C${currentLat + 0.007}&layer=mapnik&marker=${currentLat}%2C${currentLng}`}
              className="w-full h-full border-0 select-none"
            />
          </div>
        </div>
      )}

      {/* Interactive Map Modal */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-slate-200">
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-[#0f2e5a] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span className="font-bold text-sm">Mark Training Partner Centre Location</span>
              </div>
              <button
                type="button"
                onClick={() => setShowMapModal(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Box inside Modal */}
            <div className="p-3 bg-slate-50 border-b border-slate-200">
              <form onSubmit={handleSearchPlace} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search city, area, landmark in Maharashtra (e.g. Hinjawadi Pune, Vashi Navi Mumbai)..."
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0f2e5a]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSearching}
                  className="px-4 py-2 bg-[#0f2e5a] hover:bg-[#1e3a8a] text-white rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer shrink-0"
                >
                  {isSearching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Search Area'}
                </button>
              </form>
            </div>

            {/* Quick Hub Selector in Maharashtra */}
            <div className="px-4 py-2 bg-amber-50/50 border-b border-amber-200/50 overflow-x-auto">
              <div className="flex items-center gap-1.5 text-[11px] whitespace-nowrap">
                <span className="text-slate-500 font-semibold text-[10px]">Quick Select Hub:</span>
                {POPULAR_MH_HUBS.map((hub) => (
                  <button
                    key={hub.name}
                    type="button"
                    onClick={() => {
                      onLocationChange(hub.lat.toFixed(6), hub.lng.toFixed(6), {
                        city: hub.name.split(' ')[0],
                        district: hub.district,
                        pinCode: hub.pin,
                      });
                      performReverseGeocode(hub.lat, hub.lng);
                    }}
                    className="px-2 py-0.5 bg-white hover:bg-orange-50 border border-slate-200 hover:border-orange-300 rounded-md text-[10px] font-semibold text-slate-700 hover:text-orange-950 transition cursor-pointer"
                  >
                    {hub.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Map Frame */}
            <div className="relative flex-1 min-h-[300px] sm:min-h-[360px] bg-slate-100">
              <iframe
                title="Interactive Map Picker"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${currentLng - 0.02}%2C${currentLat - 0.015}%2C${currentLng + 0.02}%2C${currentLat + 0.015}&layer=mapnik&marker=${currentLat}%2C${currentLng}`}
                className="w-full h-full border-0 select-none"
              />

              {/* Pin indicator banner */}
              <div className="absolute top-3 left-3 right-3 bg-white/95 backdrop-blur-xs p-2.5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Crosshair className="w-4 h-4 text-[#ea580c]" />
                  <div>
                    <span className="font-bold text-slate-800">Current Marker Coordinates: </span>
                    <span className="font-mono text-slate-600">
                      {latitude || currentLat.toFixed(6)}, {longitude || currentLng.toFixed(6)}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAcquireCurrentLocation}
                  className="px-2.5 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer transition"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Use GPS Here</span>
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <div className="text-[11px] text-slate-500">
                Coordinates will be locked to this Training Centre profile.
              </div>
              <button
                type="button"
                onClick={() => setShowMapModal(false)}
                className="px-5 py-2 bg-[#0f2e5a] hover:bg-[#1e3a8a] text-white rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Confirm Location
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
