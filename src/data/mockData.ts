import { SkillCourse, JobListing, AssessmentQuestion, LearnerProfile, PracticalLab } from '../types';

export const COURSES_DATA: SkillCourse[] = [
  {
    id: 'course-ev-01',
    title: 'Electric Vehicle Powertrain & Battery Diagnostic Technician',
    hindiTitle: 'इलेक्ट्रिक वाहन (EV) पॉवरट्रेन आणि बॅटरी डायग्नोस्टिक तंत्रज्ञ',
    sector: 'EV & Automotive',
    nsqfLevel: 5,
    durationWeeks: 16,
    totalHours: 420,
    practicalHours: 290,
    deliveryMode: 'Industry Apprenticeship',
    provider: 'National Skill Training Institute (NSTI) & Tata Motors Tech Hub',
    partnerCompany: 'Tata Motors EV Division',
    rating: 4.9,
    enrolledCount: 1420,
    feeType: 'Stipend Provided',
    stipendAmount: '₹9,500/month during on-the-job training',
    eligibility: 'ITI (Electrician / Fitter / Motor Mechanic) or Diploma in Mech/EE',
    description: 'Master high-voltage battery safety protocols, regenerative braking diagnostic tools, battery management system (BMS) cell balancing, and CAN bus error debugging in modern electric passenger and commercial vehicles.',
    modules: [
      {
        id: 'ev-m1',
        title: 'High-Voltage Safety & Isolation Procedures (NFPA 70E)',
        duration: '30 Hours',
        topics: ['HV Disconnect Safety Lockout', 'PPE Class 0 Insulation Checks', 'Thermal Runaway Prevention'],
        hasPracticalLab: true
      },
      {
        id: 'ev-m2',
        title: 'Lithium-Ion BMS Telemetry & Cell Balancing',
        duration: '110 Hours',
        topics: ['Cell Voltage Deviation Analysis', 'CAN bus protocol decoders', 'Module replacement'],
        hasPracticalLab: true
      },
      {
        id: 'ev-m3',
        title: 'BLDC & PMSM Motor Controller Troubleshooting',
        duration: '140 Hours',
        topics: ['Inverter IGBT Gate Signal Diagnostics', 'Rotary Encoder Calibration', 'Regenerative Testing']
      },
      {
        id: 'ev-m4',
        title: 'Industry Shop Floor Apprenticeship',
        duration: '140 Hours',
        topics: ['Live EV Assembly Line Diagnostics', 'Customer Fleet Road Testing', 'Warranty Claim Reporting']
      }
    ],
    careerOutcomes: [
      { role: 'Senior EV Diagnostics Technician', avgMonthlySalary: '₹32,000 - ₹45,000', hiringDemand: 'Critical Shortage' },
      { role: 'Battery Pack Service Specialist', avgMonthlySalary: '₹28,000 - ₹38,000', hiringDemand: 'Very High' }
    ],
    certificationBadge: 'NSQF Level 5 — Dual Certified Automotive Skills Council of India (ASDC)',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'course-solar-02',
    title: 'Solar Photovoltaic Grid-Tied System Installer & Microgrid Engineer',
    hindiTitle: 'सोलर पीव्ही ग्रीड-टाइड सिस्टीम इन्स्टॉलर आणि मायक्रोग्रीड अभियंता',
    sector: 'Clean Energy & Solar',
    nsqfLevel: 4,
    durationWeeks: 12,
    totalHours: 320,
    practicalHours: 220,
    deliveryMode: 'Hybrid Workshop',
    provider: 'National Institute of Solar Energy (NISE) & Surya Mitra Program',
    partnerCompany: 'Adani Solar & Renew Power',
    rating: 4.8,
    enrolledCount: 2310,
    feeType: '100% Free / PMKVY Funded',
    eligibility: '10th Standard Pass with Science / ITI Wireman or Electrician',
    description: 'Specialized rooftop & utility-scale solar PV system layout designing, azimuth/tilt optimization, DC string inverter synchronization, net-metering setup, and SCADA monitoring compliance.',
    modules: [
      {
        id: 'sol-m1',
        title: 'Site Solar Irradiance Survey & Shadow Path Analysis',
        duration: '40 Hours',
        topics: ['Solar Pathfinder & Sun Eye Tooling', 'Roof Load Bearing Calculation', 'Cable Sizing'],
        hasPracticalLab: true
      },
      {
        id: 'sol-m2',
        title: 'String Inverter, Net-Metering & Grid Interconnection',
        duration: '120 Hours',
        topics: ['Three-Phase Synchronous Inverter Wiring', 'Lightning Arrester & Earth Pit Testing', 'DISCOM Net Meter Approvals'],
        hasPracticalLab: true
      },
      {
        id: 'sol-m3',
        title: 'Microgrid Battery Energy Storage Systems (BESS)',
        duration: '80 Hours',
        topics: ['Hybrid Inverter Programming', 'Off-Grid Generator Integration', 'Scheduled Preventive Maintenance']
      },
      {
        id: 'sol-m4',
        title: 'Field Project & Safety Certification',
        duration: '80 Hours',
        topics: ['Working at Heights Safety Rigging', 'Live 25kW Rooftop Commissioning', 'Yield Generation Audit']
      }
    ],
    careerOutcomes: [
      { role: 'Certified Surya Mitra Site Lead', avgMonthlySalary: '₹26,000 - ₹36,000', hiringDemand: 'Very High' },
      { role: 'Rooftop Solar Plant Commissioning Supervisor', avgMonthlySalary: '₹30,000 - ₹42,000', hiringDemand: 'Very High' }
    ],
    certificationBadge: 'Surya Mitra Skill Council for Green Jobs (SCGJ)',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'course-cnc-03',
    title: '5-Axis Precision CNC Machining & CAD/CAM Programming',
    hindiTitle: '५-ॲक्सिस प्रिसिजन सीएनसी मशिनिंग आणि सीएडी/सीएएम प्रोग्रामिंग',
    sector: 'Advanced Manufacturing & CNC',
    nsqfLevel: 6,
    durationWeeks: 20,
    totalHours: 500,
    practicalHours: 380,
    deliveryMode: 'Center of Excellence',
    provider: 'Advanced Tool Training Centre (ATTC) & Indo-German Tool Room',
    partnerCompany: 'Bharat Forge & Godrej Aerospace',
    rating: 4.95,
    enrolledCount: 890,
    feeType: 'Stipend Provided',
    stipendAmount: '₹11,000/month stipend in Phase 2',
    eligibility: 'ITI Machinist/Turner or Diploma in Mechanical/Production',
    description: 'High-precision manufacturing course for aerospace, defense, and high-performance turbine components using Siemens Sinumerik & Fanuc 5-axis CNC machines and Mastercam / SolidWorks.',
    modules: [
      {
        id: 'cnc-m1',
        title: 'G-Code & M-Code Advanced Parametric Macro Programming',
        duration: '60 Hours',
        topics: ['Subroutines & Modal Commands', 'Tool Center Point Control (TCPC)', 'Rotary Axis Vector Math']
      },
      {
        id: 'cnc-m2',
        title: 'CAM Toolpath Generation for Aerospace Blisks',
        duration: '140 Hours',
        topics: ['Simultaneous 5-axis Swarf Milling', 'Collision Avoidance Simulation', 'Surface Finish Optimization']
      },
      {
        id: 'cnc-m3',
        title: 'CMM Metrology & GD&T Quality Inspection',
        duration: '120 Hours',
        topics: ['Coordinate Measuring Machine Probing', 'Sub-micron Tolerance Verification', 'Calibration Certificates'],
        hasPracticalLab: true
      },
      {
        id: 'cnc-m4',
        title: 'Live Aerospace Prototype Production Batch',
        duration: '180 Hours',
        topics: ['Titanium & Inconel Machining Speeds/Feeds', 'Coolant Optimization', 'First Article Inspection Reports']
      }
    ],
    careerOutcomes: [
      { role: '5-Axis CNC Programmer & Setter', avgMonthlySalary: '₹38,000 - ₹55,000', hiringDemand: 'Critical Shortage' },
      { role: 'Aerospace Component Quality Specialist', avgMonthlySalary: '₹34,000 - ₹48,000', hiringDemand: 'Very High' }
    ],
    certificationBadge: 'Capital Goods Skill Council (CGSC) NSQF Level 6',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'course-drone-04',
    title: 'DGCA Certified Remote Drone Pilot & Precision Agriculture Operator',
    hindiTitle: 'डीजीसीए प्रमाणित रिमोट ड्रोन पायलट आणि कृषी फवारणी ऑपरेटर',
    sector: 'Drone Tech & Robotics',
    nsqfLevel: 5,
    durationWeeks: 8,
    totalHours: 200,
    practicalHours: 140,
    deliveryMode: 'Hybrid Workshop',
    provider: 'Drone Federation of India & Remote Pilot Training Organization (RPTO)',
    partnerCompany: 'Garuda Aerospace & IoTechWorld',
    rating: 4.88,
    enrolledCount: 1650,
    feeType: 'Subsidized Fee',
    eligibility: '10th Pass with Valid Passport or Aadhar card, Minimum Age 18',
    description: 'Acquire the official DGCA Remote Pilot Certificate (RPC), learn multi-rotor flight mechanics, automated waypoint mission planning, multispectral crop health scanning, and precision pesticide payload dispensing.',
    modules: [
      {
        id: 'dr-m1',
        title: 'Air Regulations, Airspace Classification & DigitalSky Portal',
        duration: '30 Hours',
        topics: ['DGCA Drone Rules 2021', 'Red/Yellow/Green Zone Compliance', 'Emergency Failsafe Flight Protocols']
      },
      {
        id: 'dr-m2',
        title: 'Flight Simulator & Manual Line-of-Sight Flying',
        duration: '50 Hours',
        topics: ['Aerodynamic Stall Recovery', 'Wind Shear Handling', 'Night Operations with Anti-Collision Beacons']
      },
      {
        id: 'dr-m3',
        title: 'Precision Agri-Payloads & GIS Orthomosaic Mapping',
        duration: '60 Hours',
        topics: ['LiDAR & NDVI Spectral Camera Calibration', 'Auto-Flight Boundary Geometry', 'Nozzle Flow Rate Tuning'],
        hasPracticalLab: true
      },
      {
        id: 'dr-m4',
        title: 'Drone Maintenance, Prop Balancing & Battery Health',
        duration: '60 Hours',
        topics: ['ESC Firmware Flashing', 'Gimbal Gyroscope Calibration', 'LiPo Battery Storage Cycle Care']
      }
    ],
    careerOutcomes: [
      { role: 'Commercial Drone Pilot (Kisan Drone)', avgMonthlySalary: '₹30,000 - ₹45,000', hiringDemand: 'Critical Shortage' },
      { role: 'GIS Drone Surveyor & Mapper', avgMonthlySalary: '₹28,000 - ₹40,000', hiringDemand: 'High' }
    ],
    certificationBadge: 'DGCA Official Remote Pilot Certificate (RPC) + Skill India',
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'course-health-05',
    title: 'Emergency Medical Technician & Phlebotomy Practitioner',
    hindiTitle: 'आपत्कालीन वैद्यकीय तंत्रज्ञ (ईएमटी) आणि रक्त नमुना संकलन तज्ज्ञ',
    sector: 'Healthcare & Caregiving',
    nsqfLevel: 4,
    durationWeeks: 18,
    totalHours: 440,
    practicalHours: 320,
    deliveryMode: 'ITI Campus',
    provider: 'Healthcare Sector Skill Council (HSSC) & Max Healthcare Academy',
    partnerCompany: 'Apollo Emergency Services & Red Cross',
    rating: 4.85,
    enrolledCount: 1980,
    feeType: '100% Free / PMKVY Funded',
    eligibility: '12th Pass with Biology / General Science',
    description: 'Hands-on clinical training in triage management, BLS/ACLS automated external defibrillator (AED) operation, sterile intravenous cannulation, and critical trauma transport protocols.',
    modules: [
      {
        id: 'hc-m1',
        title: 'Basic Life Support (BLS) & Airway Management',
        duration: '60 Hours',
        topics: ['CPR for Adults/Pediatric', 'BVM Ventilation', 'Suctioning & Choking Relief']
      },
      {
        id: 'hc-m2',
        title: 'Trauma Immobilization & Rapid Triage Protocols',
        duration: '100 Hours',
        topics: ['Spinal Backboard Securing', 'Tourniquet & Hemostatic Bandaging', 'Mass Casualty Triage Tagging'],
        hasPracticalLab: true
      },
      {
        id: 'hc-m3',
        title: 'Sterile Phlebotomy & Diagnostic Sample Preservation',
        duration: '120 Hours',
        topics: ['Vacutainer Needle Angle Insertion', 'Cold Chain Transport Preservation', 'Biomedical Waste Segregation']
      },
      {
        id: 'hc-m4',
        title: 'Hospital Emergency Ward Rotations',
        duration: '160 Hours',
        topics: ['Live Ambulance Shifts', 'Patient Vitals Monitoring', 'Emergency Room Handover Records']
      }
    ],
    careerOutcomes: [
      { role: 'Ambulance Critical Care EMT', avgMonthlySalary: '₹24,000 - ₹35,000', hiringDemand: 'Very High' },
      { role: 'Diagnostic Center Senior Phlebotomist', avgMonthlySalary: '₹22,000 - ₹32,000', hiringDemand: 'High' }
    ],
    certificationBadge: 'Healthcare Sector Skill Council (HSSC) Level 4',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'course-artisan-06',
    title: 'Modern Woodworking, Ergonomic Joinery & Heritage Wood Carving',
    hindiTitle: 'आधुनिक काष्ठशिल्प, अर्गोनॉमिक जॉइनरी आणि पारंपरिक कोरीव काम',
    sector: 'Artisan & Traditional Crafts',
    nsqfLevel: 4,
    durationWeeks: 14,
    totalHours: 350,
    practicalHours: 300,
    deliveryMode: 'Center of Excellence',
    provider: 'PM Vishwakarma Skill Center & Furniture & Fittings Skill Council',
    partnerCompany: 'Godrej Interio & Fabindia Craft Guild',
    rating: 4.92,
    enrolledCount: 1120,
    feeType: 'Stipend Provided',
    stipendAmount: '₹500/day training allowance under PM Vishwakarma',
    eligibility: 'Open to traditional artisans, school leavers, and craft enthusiasts',
    description: 'Blend timeless Indian architectural woodcraft (Shekhawati & Saharanpur carvings) with modern CNC router tooling, mortise-tenon joinery, and non-toxic UV resin finishes for global export markets.',
    modules: [
      {
        id: 'art-m1',
        title: 'Timber Identification, Moisture Metering & Seasoning',
        duration: '40 Hours',
        topics: ['Teak, Sheesham & Engineered Plywood', 'Grain Orientation', 'Kiln Drying Analysis']
      },
      {
        id: 'art-m2',
        title: 'Precision Hand & Power Joinery Systems',
        duration: '110 Hours',
        topics: ['Dovetail Joints', 'Biscuit Joiners & Domino Cutters', 'Edge Banding Mastery'],
        hasPracticalLab: true
      },
      {
        id: 'art-m3',
        title: 'Digital 3D Relief Carving & CAD Integration',
        duration: '90 Hours',
        topics: ['3D Relief Toolpaths', 'Traditional Floral & Jali Motifs', 'Hand Chisel Detailing']
      },
      {
        id: 'art-m4',
        title: 'Export Packaging, Sanding Grits & PU Lacquer Spraying',
        duration: '110 Hours',
        topics: ['Electrostatic Spray Booth Work', 'Moisture-Barrier Packing', 'E-commerce Catalogue Portfolio']
      }
    ],
    careerOutcomes: [
      { role: 'Master Craftsman & Custom Furniture Maker', avgMonthlySalary: '₹35,000 - ₹60,000', hiringDemand: 'High' },
      { role: 'Architectural Woodworking Supervisor', avgMonthlySalary: '₹30,000 - ₹45,000', hiringDemand: 'Very High' }
    ],
    certificationBadge: 'PM Vishwakarma Artisan Certified + FFSC Certified',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
  }
];

export const JOBS_DATA: JobListing[] = [
  {
    id: 'job-01',
    title: 'Junior Electric Vehicle Test & Diagnostics Technician',
    hindiTitle: 'कनिष्ठ ईव्ही टेस्ट आणि डायग्नोस्टिक्स तंत्रज्ञ',
    company: 'Mahindra Electric Mobility Ltd.',
    location: 'Chakan Industrial Area, Pune, Maharashtra',
    sector: 'EV & Automotive',
    type: 'Apprenticeship (NAPS)',
    stipendOrSalary: '₹18,500/month + Subsidized Canteen & Transport',
    nsqfRequired: 4,
    requiredSkills: ['Battery Cell Testing', 'Multimeter Proficiency', 'CAN bus Basics', 'High-Voltage Safety'],
    vacancies: 45,
    postedDaysAgo: 2,
    isVerifiedPartner: true,
    benefits: ['On-site Dormitory Option', 'PF & ESI Health Cover', 'Permanent Absorption Track in 1 Year'],
    description: 'Assist Senior Powertrain Engineers in endurance testing of battery packs, wiring harness continuity verifications, and regenerative dynamometer test benches.'
  },
  {
    id: 'job-02',
    title: 'Solar Microgrid Installation Lead',
    hindiTitle: 'सोलर मायक्रोग्रीड इन्स्टॉलेशन साइट लीड',
    company: 'Tata Power Renewable Energy',
    location: 'Dholera Solar Park / Ahmedabad, Gujarat',
    sector: 'Clean Energy & Solar',
    type: 'Full-Time Employment',
    stipendOrSalary: '₹28,000 - ₹34,000 / month + Performance Bonus',
    nsqfRequired: 5,
    requiredSkills: ['Surya Mitra Certified', 'Three-Phase Inverter Synchronization', 'Earthing Pit Testing'],
    vacancies: 22,
    postedDaysAgo: 3,
    isVerifiedPartner: true,
    benefits: ['Accidental Insurance ₹10 Lakhs', 'Site Allowance ₹300/day', 'Tool Kit Allowance'],
    description: 'Lead a team of 6 installers for rooftop industrial solar setups. Review engineering drawings, ensure OSHA/CEA electrical compliance, and handle net-metering commissioning with DISCOM engineers.'
  },
  {
    id: 'job-03',
    title: '5-Axis CNC Milling Operator & Setter',
    hindiTitle: '५-ॲक्सिस सीएनसी मिलिंग ऑपरेटर आणि सेटर',
    company: 'Dynamatic Technologies Aerospace',
    location: 'Peenya Industrial Estate, Bengaluru, Karnataka',
    sector: 'Advanced Manufacturing & CNC',
    type: 'Full-Time Employment',
    stipendOrSalary: '₹35,000 - ₹44,000 / month',
    nsqfRequired: 5,
    requiredSkills: ['Siemens Sinumerik', 'CMM Verification', 'GD&T Drawing Reading', 'Titanium Tooling'],
    vacancies: 18,
    postedDaysAgo: 1,
    isVerifiedPartner: true,
    benefits: ['Quarterly Quality Incentive', 'Free Technical Upskilling', 'Medical Insurance for Family'],
    description: 'Setup and operate state-of-the-art 5-axis CNC machining centers for aircraft structural ribs and flaps. Inspect parts within 5-micron tolerance limits.'
  },
  {
    id: 'job-04',
    title: 'Agri-Drone Spraying Pilot (Kisan Drone Fleet)',
    hindiTitle: 'कृषी ड्रोन फवारणी पायलट (किसान ड्रोन)',
    company: 'Coromandel International & AgroDrone Services',
    location: 'Ludhiana & Bathinda, Punjab',
    sector: 'Drone Tech & Robotics',
    type: 'Apprenticeship (NAPS)',
    stipendOrSalary: '₹22,000/month + ₹50 per acre sprayed incentive',
    nsqfRequired: 4,
    requiredSkills: ['DGCA Drone License (RPC)', 'Field Spray Calibration', 'Battery Swap Logistics'],
    vacancies: 60,
    postedDaysAgo: 4,
    isVerifiedPartner: true,
    benefits: ['Company Utility Vehicle Provided', 'Mobile & Fuel Allowance', 'Safety Suit Provided'],
    description: 'Fly agricultural hexacopter drones over paddy and wheat crops using pre-planned geofenced flight coordinates. Perform field battery charging and nozzle unclogging.'
  },
  {
    id: 'job-05',
    title: 'Emergency Medical Technician - Advanced Life Support (ALS)',
    hindiTitle: 'इमर्जन्सी मेडिकल तंत्रज्ञ - ॲडव्हान्स्ड लाईफ सपोर्ट',
    company: 'GVK EMRI 108 Emergency Response',
    location: 'Lucknow & Varanasi, Uttar Pradesh',
    sector: 'Healthcare & Caregiving',
    type: 'Full-Time Employment',
    stipendOrSalary: '₹23,500 - ₹29,000 / month',
    nsqfRequired: 4,
    requiredSkills: ['BLS Certification', 'Emergency IV Access', 'Defibrillator Operation', 'Trauma Triage'],
    vacancies: 35,
    postedDaysAgo: 5,
    isVerifiedPartner: true,
    benefits: ['Govt Health Scheme Coverage', 'Overtime Double Pay', 'Annual Uniform Allowance'],
    description: 'Respond to 108 ambulance dispatch calls, stabilize critical cardiac and accident patients en route to district hospitals, and administer prescribed emergency care.'
  },
  {
    id: 'job-06',
    title: 'Artisanal Wooden Furniture Quality Specialist',
    hindiTitle: 'कुशल लाकडी फर्निचर गुणवत्ता तज्ज्ञ',
    company: 'Pepperfry Studio Workshop',
    location: 'Jodhpur Handicraft Cluster, Rajasthan',
    sector: 'Artisan & Traditional Crafts',
    type: 'Full-Time Employment',
    stipendOrSalary: '₹26,000 - ₹33,000 / month',
    nsqfRequired: 4,
    requiredSkills: ['Timber Moisture Metering', 'Dovetail Joinery Inspection', 'Export Finish Standard'],
    vacancies: 12,
    postedDaysAgo: 6,
    isVerifiedPartner: true,
    benefits: ['Artisan Welfare Grant Match', 'Annual Festival Bonus', 'Tool Allowance'],
    description: 'Inspect handmade and semi-automated hardwood dining tables, consoles, and carved headboards before warehouse dispatch. Ensure 100% adherence to moisture and structural stability standards.'
  }
];

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    question: 'What kind of work environment energizes you the most?',
    hindiQuestion: 'कोणत्या प्रकारचे कामाचे वातावरण तुम्हाला सर्वात जास्त ऊर्जावान बनवते?',
    domain: 'work_style',
    options: [
      {
        text: 'Hands-on troubleshooting in high-tech workshops with circuits, batteries, and electric vehicles.',
        hindiText: 'सर्किट, बॅटरी आणि इलेक्ट्रिक वाहनांसह हाय-टेक कार्यशाळांमध्ये प्रत्यक्ष समस्या निवारण.',
        scoreWeight: { 'EV & Automotive': 3, 'Advanced Manufacturing & CNC': 1 }
      },
      {
        text: 'Outdoor field installations, solar panels, heights, and clean energy setups.',
        hindiText: 'मोकळ्या मैदानात सोलर पॅनेल, सौर ऊर्जा प्रणाली आणि स्वच्छ ऊर्जा प्रकल्प.',
        scoreWeight: { 'Clean Energy & Solar': 3, 'Drone Tech & Robotics': 1 }
      },
      {
        text: 'Precision machinery, computer-controlled tools (CNC), and crafting metal or aerospace parts.',
        hindiText: 'अचूक मशिनरी, सीएनसी टूल्स आणि धातू किंवा एरोस्पेस भागांची निर्मिती.',
        scoreWeight: { 'Advanced Manufacturing & CNC': 3, 'Artisan & Traditional Crafts': 1 }
      },
      {
        text: 'Helping people in critical moments, medical equipment, and clinical healthcare response.',
        hindiText: 'गरजूंची मदत, वैद्यकीय उपकरणे आणि आपत्कालीन आरोग्य सेवा.',
        scoreWeight: { 'Healthcare & Caregiving': 3 }
      }
    ]
  },
  {
    id: 2,
    question: 'When diagnosing a broken machine or faulty system, what is your first instinct?',
    hindiQuestion: 'जेव्हा एखादे मशीन किंवा सिस्टीम खराब होते, तेव्हा तुमची पहिली पायरी कोणती असते?',
    domain: 'diagnostic_approach',
    options: [
      {
        text: 'Grab a digital multimeter or scan tool to measure voltage, resistance, and signal codes.',
        hindiText: 'मल्टीमीटर किंवा स्कॅन टूलने व्होल्टेज, रेझिस्टन्स आणि सिग्नल कोड तपासणे.',
        scoreWeight: { 'EV & Automotive': 2, 'Clean Energy & Solar': 2 }
      },
      {
        text: 'Open CAD drawings, inspect physical tolerances with micrometers, and check alignments.',
        hindiText: 'सीएडी रेखाचित्रे पाहणे, मायक्रोमीटरने मोजमाप घेणे आणि अलाइनमेंट तपासणे.',
        scoreWeight: { 'Advanced Manufacturing & CNC': 3, 'Artisan & Traditional Crafts': 2 }
      },
      {
        text: 'Inspect drone telemetry, recalibrate gyroscopes/sensors, and test radio frequencies.',
        hindiText: 'ड्रोन टेलिमेट्री तपासणे, जायरोस्कोप कॅलिब्रेट करणे आणि रेडिओ फ्रिक्वेन्सी चाचणी करणे.',
        scoreWeight: { 'Drone Tech & Robotics': 3 }
      },
      {
        text: 'Check vital signs, follow emergency triage protocols, and prepare stabilization equipment.',
        hindiText: 'महत्त्वाची लक्षणे (व्हायटल्स) पाहणे, ट्रायज प्रोटोकॉल स्वीकारणे आणि उपकरणे तयार करणे.',
        scoreWeight: { 'Healthcare & Caregiving': 3 }
      }
    ]
  },
  {
    id: 3,
    question: 'What is your current highest education or technical background?',
    hindiQuestion: 'तुमचे सध्याचे सर्वोच्च शिक्षण किंवा तांत्रिक पार्श्वभूमी काय आहे?',
    domain: 'education_level',
    options: [
      {
        text: 'ITI Certificate (Electrician / Wireman / Electronics / Fitter / Machinist)',
        hindiText: 'आयटीआय प्रमाणपत्र (इलेक्ट्रिशियन / वायरमन / इलेक्ट्रॉनिक्स / फिटर / मशिनिस्ट)',
        scoreWeight: { 'EV & Automotive': 2, 'Advanced Manufacturing & CNC': 2, 'Clean Energy & Solar': 2 }
      },
      {
        text: '10th or 12th Standard Pass (Science / Vocational Stream)',
        hindiText: '१०वी किंवा १२वी उत्तीर्ण (विज्ञान / व्होकेशनल)',
        scoreWeight: { 'Clean Energy & Solar': 2, 'Drone Tech & Robotics': 2, 'Healthcare & Caregiving': 2 }
      },
      {
        text: 'Diploma or Degree in Engineering / Applied Sciences',
        hindiText: 'अभियांत्रिकी किंवा उपयोजित विज्ञानातील डिप्लोमा किंवा पदवी',
        scoreWeight: { 'Advanced Manufacturing & CNC': 3, 'EV & Automotive': 2, 'Drone Tech & Robotics': 2 }
      },
      {
        text: 'Traditional Artisan / Practical Experience without formal technical degree',
        hindiText: 'पारंपरिक कारागीर / औपचारिक पदवीशिवाय प्रत्यक्ष कामाचा अनुभव',
        scoreWeight: { 'Artisan & Traditional Crafts': 3, 'Clean Energy & Solar': 1 }
      }
    ]
  },
  {
    id: 4,
    question: 'Which career outcome appeals to you the most in the next 1-2 years?',
    hindiQuestion: 'पुढील १-२ वर्षांत कोणता करिअर निकाल तुम्हाला सर्वात जास्त आकर्षित करतो?',
    domain: 'career_aspiration',
    options: [
      {
        text: 'Earning an immediate monthly stipend (₹15k-₹22k) on a company factory floor while earning NSQF Level 5.',
        hindiText: 'कंपनीमध्ये त्वरित मासिक विद्यावेतन (स्टायपेंड) मिळवणे आणि सोबतच NSQF स्तर ५ पदवी मिळवणे.',
        scoreWeight: { 'EV & Automotive': 3, 'Advanced Manufacturing & CNC': 2 }
      },
      {
        text: 'Starting my own local enterprise (solar rooftop contracting, drone spraying services, or craft studio).',
        hindiText: 'स्वतःचा व्यवसाय सुरू करणे (सोलर रूफटॉप, ड्रोन फवारणी किंवा क्राफ्ट स्टुडिओ).',
        scoreWeight: { 'Clean Energy & Solar': 3, 'Drone Tech & Robotics': 3, 'Artisan & Traditional Crafts': 2 }
      },
      {
        text: 'Securing a permanent skilled role in critical infrastructure or public health services.',
        hindiText: 'महत्त्वाच्या पायाभूत सुविधांमध्ये किंवा सार्वजनिक आरोग्य सेवेत कायमस्वरूपी कुशल पद मिळवणे.',
        scoreWeight: { 'Healthcare & Caregiving': 3, 'Clean Energy & Solar': 1 }
      }
    ]
  }
];

export const INITIAL_USER_PROFILE: LearnerProfile = {
  id: 'usr-kaushal-8834',
  name: 'Aarav Sharma',
  hindiName: 'आरव शर्मा',
  marathiName: 'आरव शर्मा',
  email: 'aarav.sharma@kaushal.gov.in',
  phone: '+91 98765 43210',
  state: 'Maharashtra',
  district: 'Pune',
  currentNSQF: 4,
  kaushalScore: 780,
  practicalHoursLogged: 146,
  enrolledCourses: ['course-ev-01'],
  completedCourses: ['course-solar-02'],
  appliedJobs: ['job-01'],
  bookmarkedJobs: ['job-02', 'job-03'],
  badges: [
    {
      id: 'badge-surya-01',
      title: 'Certified Surya Mitra Solar PV Technician',
      issuedDate: '12 August 2025',
      sector: 'Clean Energy & Solar',
      certificateNumber: 'KSHL-SCGJ-2025-08942'
    },
    {
      id: 'badge-ev-saf-02',
      title: 'High Voltage Safety & Isolation Clearance (NFPA 70E)',
      issuedDate: '10 January 2026',
      sector: 'EV & Automotive',
      certificateNumber: 'KSHL-ASDC-2026-11429'
    }
  ]
};

export const EV_SIMULATOR_LAB: PracticalLab = {
  id: 'lab-ev-01',
  title: 'Electric Vehicle High-Voltage Isolation & Multimeter Diagnostic Lab',
  sector: 'EV & Automotive',
  objective: 'Perform a live high-voltage isolation safety check on an EV traction inverter prior to servicing. Measure DC bus capacitor residual voltage and verify lockout tagout.',
  components: [
    { id: 'safety-plug', name: 'Manual Service Disconnect (MSD) Orange Plug', status: 'normal' },
    { id: 'dc-bus', name: '400V DC Traction Inverter Terminal', status: 'normal' },
    { id: 'chassis-ground', name: 'Vehicle Chassis Ground Stud', status: 'normal' },
    { id: 'safety-interlock', name: 'High-Voltage Interlock Loop (HVIL)', status: 'normal' }
  ],
  tools: [
    { id: 'fluke-multimeter', name: 'CAT-IV 1000V Digital Multimeter', icon: 'Gauge' },
    { id: 'insulation-gloves', name: 'Class 0 1000V Insulated Gloves', icon: 'ShieldCheck' },
    { id: 'lockout-tag', name: 'Lockout/Tagout (LOTO) Safety Padlock', icon: 'Lock' },
    { id: 'discharge-resistor', name: 'DC Bus Capacitor Discharging Probe', icon: 'Zap' }
  ],
  steps: [
    {
      id: 1,
      instruction: 'Put on certified Class 0 (1000V) Insulating Gloves before touching any component in the high-voltage bay.',
      hint: 'Select the "Class 0 1000V Insulated Gloves" tool and apply to the workstation.',
      targetTool: 'insulation-gloves',
      targetComponent: 'safety-plug'
    },
    {
      id: 2,
      instruction: 'Pull and lock out the Manual Service Disconnect (MSD) orange plug to physically isolate the traction battery pack.',
      hint: 'Use the "Lockout/Tagout (LOTO) Safety Padlock" on the "Manual Service Disconnect (MSD) Orange Plug".',
      targetTool: 'lockout-tag',
      targetComponent: 'safety-plug'
    },
    {
      id: 3,
      instruction: 'Touch the DC Bus Capacitor Discharging Probe across inverter terminals to bleed residual 400V charge.',
      hint: 'Use the "DC Bus Capacitor Discharging Probe" on the "400V DC Traction Inverter Terminal".',
      targetTool: 'discharge-resistor',
      targetComponent: 'dc-bus'
    },
    {
      id: 4,
      instruction: 'Use CAT-IV 1000V Multimeter between the Inverter Terminal and Chassis Ground to confirm voltage is safe (< 5V DC).',
      hint: 'Use the "CAT-IV 1000V Digital Multimeter" on the "400V DC Traction Inverter Terminal".',
      targetTool: 'fluke-multimeter',
      targetComponent: 'dc-bus',
      correctReading: '0.4 Volts DC (Safe for Servicing)'
    }
  ]
};
