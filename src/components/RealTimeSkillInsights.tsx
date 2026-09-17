import React, { useState } from 'react';
import { ArrowUpRight, BarChart3, TrendingUp, PieChart, Sparkles } from 'lucide-react';

interface RealTimeSkillInsightsProps {
  onViewSkillReport?: () => void;
  onViewSectorReport?: () => void;
  onViewPlacementReport?: () => void;
}

export const RealTimeSkillInsights: React.FC<RealTimeSkillInsightsProps> = ({
  onViewSkillReport,
  onViewSectorReport,
  onViewPlacementReport,
}) => {
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

  // Line Chart Data
  const enrollmentData = [
    { year: 2021, value: 80, label: '80k' },
    { year: 2022, value: 92, label: '92k' },
    { year: 2023, value: 85, label: '85k' },
    { year: 2024, value: 112, label: '112k' },
    { year: 2025, value: 128, label: '128k' },
  ];

  // Sector Breakdown Data
  const sectorData = [
    { name: 'IT & Digital Skills', percent: 35, color: '#e67e22', display: '35%' },
    { name: 'Manufacturing', percent: 25, color: '#f5b041', display: '25%' },
    { name: 'Healthcare', percent: 15, color: '#fad7a0', display: '15%' },
    { name: 'Agriculture', percent: 10, color: '#1e4620', display: '10%' },
    { name: 'Others', percent: 15, color: '#529944', display: '15%' },
  ];

  // Regional Placement Data
  const districtData = [
    { district: 'Pune', value: 4850, color: '#e67e22' },
    { district: 'Mumbai', value: 3620, color: '#f5b041' },
    { district: 'Nagpur', value: 3120, color: '#fad7a0' },
    { district: 'Nashik', value: 2940, color: '#1e4620' },
    { district: 'Chhatrapati SN', value: 2720, color: '#529944' },
  ];

  // SVG coordinate calculations for line chart (width 320, height 180)
  // X range: 50 to 300, Y range: 150 (0k) to 25 (140k)
  const getY = (val: number) => 150 - (val / 140) * 125;
  const getX = (index: number) => 55 + index * 60;

  // Pie chart geometry: Center at (85, 85), Radius 70
  const cx = 85;
  const cy = 85;
  const radius = 70;

  let currentAngle = -90; // Start at 12 o'clock
  const slices = sectorData.map((item) => {
    const angle = (item.percent / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = cx + radius * Math.cos(startRad);
    const y1 = cy + radius * Math.sin(startRad);
    const x2 = cx + radius * Math.cos(endRad);
    const y2 = cy + radius * Math.sin(endRad);

    const largeArcFlag = angle > 180 ? 1 : 0;

    const pathData = [
      `M ${cx} ${cy}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z',
    ].join(' ');

    return {
      ...item,
      pathData,
    };
  });

  return (
    <section className="w-full bg-[#fbfdfc] py-12 sm:py-16 border-y border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Matching Bihar YuvaSaathi portal */}
        <div className="text-left mb-8 sm:mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1b4332] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#1b4332]/80">
              Live State Skill Observability
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1b4332] tracking-tight">
            Real-time KAUSHAL Skill Insights
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-1 font-medium">
            Enrollment growth, sector mix, and regional outcomes at a glance.
          </p>
        </div>

        {/* 3 Interactive Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* CARD 1: Skill Enrollment Growth */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between relative overflow-hidden">
            <div>
              {/* Header Pill */}
              <div className="flex justify-center -mt-1 mb-5">
                <div className="px-5 py-2 rounded-full bg-[#1b4332] text-white text-xs sm:text-[13px] font-bold tracking-wide shadow-xs flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Skill Enrollment Growth</span>
                </div>
              </div>

              {/* Line Chart Area */}
              <div className="relative w-full h-[220px] flex items-center justify-center">
                <svg viewBox="0 0 340 180" className="w-full h-full select-none overflow-visible">
                  {/* Grid Lines */}
                  {[140, 105, 70, 35, 0].map((level) => {
                    const y = getY(level);
                    return (
                      <g key={level}>
                        <text
                          x="32"
                          y={y + 4}
                          textAnchor="end"
                          className="text-[10px] fill-slate-500 font-medium"
                        >
                          {level}k
                        </text>
                        <line
                          x1="42"
                          y1={y}
                          x2="310"
                          y2={y}
                          stroke="#e2e8f0"
                          strokeDasharray={level === 0 ? 'none' : '3 3'}
                          strokeWidth="1"
                        />
                      </g>
                    );
                  })}

                  {/* Smooth Bezier Line Path */}
                  <path
                    d={`M ${getX(0)} ${getY(80)} 
                       C ${getX(0) + 25} ${getY(80)}, ${getX(1) - 25} ${getY(92)}, ${getX(1)} ${getY(92)}
                       C ${getX(1) + 25} ${getY(92)}, ${getX(2) - 25} ${getY(85)}, ${getX(2)} ${getY(85)}
                       C ${getX(2) + 25} ${getY(85)}, ${getX(3) - 25} ${getY(112)}, ${getX(3)} ${getY(112)}
                       C ${getX(3) + 25} ${getY(112)}, ${getX(4) - 25} ${getY(128)}, ${getX(4)} ${getY(128)}`}
                    fill="none"
                    stroke="#4a2818"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Points with Tooltips */}
                  {enrollmentData.map((d, i) => {
                    const cx = getX(i);
                    const cy = getY(d.value);
                    const isHovered = hoveredYear === d.year;

                    return (
                      <g
                        key={d.year}
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredYear(d.year)}
                        onMouseLeave={() => setHoveredYear(null)}
                      >
                        <circle
                          cx={cx}
                          cy={cy}
                          r={isHovered ? 6 : 4}
                          fill="#4a2818"
                          stroke="#ffffff"
                          strokeWidth="2"
                          className="transition-all"
                        />
                        {/* Year Label */}
                        <text
                          x={cx}
                          y="170"
                          textAnchor="middle"
                          className={`text-[11px] font-semibold transition-colors ${
                            isHovered ? 'fill-orange-600 font-bold' : 'fill-slate-600'
                          }`}
                        >
                          {d.year}
                        </text>

                        {/* Hover Tooltip */}
                        {isHovered && (
                          <g>
                            <rect
                              x={cx - 24}
                              y={cy - 30}
                              width="48"
                              height="22"
                              rx="5"
                              fill="#102A43"
                              className="shadow-md"
                            />
                            <text
                              x={cx}
                              y={cy - 15}
                              textAnchor="middle"
                              fill="#ffffff"
                              className="text-[10px] font-bold"
                            >
                              {d.label}
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Card Description */}
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mt-3 pt-3 border-t border-slate-100">
                Tracks year-on-year enrollment across KAUSHAL, highlighting steady growth from 2021 to 2025 and stronger uptake after 2023.
              </p>
            </div>

            {/* Bottom Link */}
            <button
              type="button"
              onClick={onViewSkillReport}
              className="mt-4 pt-3 border-t border-slate-100 text-xs sm:text-[13px] font-bold text-[#1b4332] hover:text-orange-600 flex items-center justify-between group cursor-pointer transition-colors"
            >
              <span className="uppercase tracking-wider">View Skill Report</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* CARD 2: Skill Distribution (Sector Breakdown) */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between relative overflow-hidden">
            <div>
              {/* Header Pill */}
              <div className="flex justify-center -mt-1 mb-5">
                <div className="px-5 py-2 rounded-full bg-[#1b4332] text-white text-xs sm:text-[13px] font-bold tracking-wide shadow-xs flex items-center gap-1.5">
                  <PieChart className="w-3.5 h-3.5 text-amber-300" />
                  <span>Skill Distribution (Sector Breakdown)</span>
                </div>
              </div>

              {/* Pie Chart with Legend */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 h-[220px]">
                {/* Pie SVG */}
                <div className="relative w-[170px] h-[170px] shrink-0">
                  <svg viewBox="0 0 170 170" className="w-full h-full select-none">
                    {slices.map((slice) => {
                      const isHovered = hoveredSector === slice.name;
                      return (
                        <path
                          key={slice.name}
                          d={slice.pathData}
                          fill={slice.color}
                          stroke="#ffffff"
                          strokeWidth="2"
                          className="cursor-pointer transition-transform hover:opacity-90"
                          onMouseEnter={() => setHoveredSector(slice.name)}
                          onMouseLeave={() => setHoveredSector(null)}
                        />
                      );
                    })}
                  </svg>
                </div>

                {/* Legend matching YuvaSaathi screenshot */}
                <div className="flex flex-col gap-2 text-xs">
                  {sectorData.map((item) => {
                    const isHovered = hoveredSector === item.name;
                    return (
                      <div
                        key={item.name}
                        onMouseEnter={() => setHoveredSector(item.name)}
                        onMouseLeave={() => setHoveredSector(null)}
                        className={`flex items-center gap-2 cursor-pointer transition-colors p-1 rounded-md ${
                          isHovered ? 'bg-slate-100 font-bold' : 'text-slate-700'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-xs shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="font-bold text-slate-900 w-8">{item.display}</span>
                        <span className="truncate">{item.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Card Description */}
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mt-3 pt-3 border-t border-slate-100">
                Shows how training demand is spread across key sectors, helping identify priority skills and plan programs for 2025.
              </p>
            </div>

            {/* Bottom Link */}
            <button
              type="button"
              onClick={onViewSectorReport}
              className="mt-4 pt-3 border-t border-slate-100 text-xs sm:text-[13px] font-bold text-[#1b4332] hover:text-orange-600 flex items-center justify-between group cursor-pointer transition-colors"
            >
              <span className="uppercase tracking-wider">View Sector Report</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* CARD 3: Regional Placement Trends */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between relative overflow-hidden">
            <div>
              {/* Header Pill */}
              <div className="flex justify-center -mt-1 mb-5">
                <div className="px-5 py-2 rounded-full bg-[#1b4332] text-white text-xs sm:text-[13px] font-bold tracking-wide shadow-xs flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-lime-300" />
                  <span>Regional Placement Trends</span>
                </div>
              </div>

              {/* Bar Chart Area */}
              <div className="relative w-full h-[220px] flex items-center justify-center">
                <svg viewBox="0 0 340 180" className="w-full h-full select-none overflow-visible">
                  {/* Grid Lines for 6000, 4500, 3000, 1500, 0 */}
                  {[6000, 4500, 3000, 1500, 0].map((val) => {
                    const y = 145 - (val / 6000) * 120;
                    return (
                      <g key={val}>
                        <text
                          x="34"
                          y={y + 4}
                          textAnchor="end"
                          className="text-[10px] fill-slate-500 font-medium"
                        >
                          {val}
                        </text>
                        <line
                          x1="42"
                          y1={y}
                          x2="320"
                          y2={y}
                          stroke="#e2e8f0"
                          strokeDasharray={val === 0 ? 'none' : '3 3'}
                          strokeWidth="1"
                        />
                      </g>
                    );
                  })}

                  {/* Vertical Bars */}
                  {districtData.map((d, i) => {
                    const barWidth = 36;
                    const x = 58 + i * 54;
                    const barHeight = (d.value / 6000) * 120;
                    const y = 145 - barHeight;
                    const isHovered = hoveredDistrict === d.district;

                    return (
                      <g
                        key={d.district}
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredDistrict(d.district)}
                        onMouseLeave={() => setHoveredDistrict(null)}
                      >
                        <rect
                          x={x}
                          y={y}
                          width={barWidth}
                          height={barHeight}
                          rx="3"
                          fill={d.color}
                          className="transition-all hover:opacity-90"
                        />

                        {/* District Name */}
                        <text
                          x={x + barWidth / 2}
                          y="163"
                          textAnchor="middle"
                          className={`text-[9.5px] font-semibold transition-colors ${
                            isHovered ? 'fill-orange-600 font-bold' : 'fill-slate-600'
                          }`}
                        >
                          {d.district}
                        </text>

                        {/* Tooltip on Hover */}
                        {isHovered && (
                          <g>
                            <rect
                              x={x + barWidth / 2 - 28}
                              y={y - 26}
                              width="56"
                              height="20"
                              rx="4"
                              fill="#102A43"
                              className="shadow-md"
                            />
                            <text
                              x={x + barWidth / 2}
                              y={y - 12}
                              textAnchor="middle"
                              fill="#ffffff"
                              className="text-[10px] font-bold"
                            >
                              {(d.value ?? 0).toLocaleString()}
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Card Description */}
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mt-3 pt-3 border-t border-slate-100">
                Compares job opportunities by district, with Pune leading demand and steady openings across Mumbai, Nagpur, Nashik, and Chhatrapati Sambhaji Nagar.
              </p>
            </div>

            {/* Bottom Link */}
            <button
              type="button"
              onClick={onViewPlacementReport}
              className="mt-4 pt-3 border-t border-slate-100 text-xs sm:text-[13px] font-bold text-[#1b4332] hover:text-orange-600 flex items-center justify-between group cursor-pointer transition-colors"
            >
              <span className="uppercase tracking-wider">View Placement Report</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
