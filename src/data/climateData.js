// NinoShield - Core Data & Risk Engine Model

export const RISK_WEIGHTS = {
  temperatureRisk: 0.30,
  rainfallRisk: 0.25,
  waterStress: 0.20,
  elNinoSignal: 0.15,
  vulnerability: 0.10,
};

export const EL_NINO_WEIGHTS = {
  "Weak": 40,
  "Moderate": 70,
  "Strong": 88,
  "Very Strong": 98
};

/**
 * Formula: Risk Score = 0.30 * Temp + 0.25 * Rain + 0.20 * Water + 0.15 * ElNino + 0.10 * Vuln
 */
export function calculateRiskScore(indicators) {
  const elNinoVal = typeof indicators.elNinoSignal === 'number' 
    ? indicators.elNinoSignal 
    : (EL_NINO_WEIGHTS[indicators.elNinoStatus] || 70);

  const score = (
    (indicators.temperatureRisk * RISK_WEIGHTS.temperatureRisk) +
    (indicators.rainfallRisk * RISK_WEIGHTS.rainfallRisk) +
    (indicators.waterStress * RISK_WEIGHTS.waterStress) +
    (elNinoVal * RISK_WEIGHTS.elNinoSignal) +
    (indicators.vulnerability * RISK_WEIGHTS.vulnerability)
  );

  return Math.round(score);
}

export function getRiskCategory(score) {
  if (score >= 71) return { level: 'CRITICAL', color: 'red', bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/40', badge: 'bg-red-500 text-white' };
  if (score >= 51) return { level: 'HIGH', color: 'orange', bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/40', badge: 'bg-orange-500 text-white' };
  if (score >= 31) return { level: 'MODERATE', color: 'yellow', bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/40', badge: 'bg-yellow-500 text-black' };
  return { level: 'LOW', color: 'green', bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/40', badge: 'bg-emerald-500 text-white' };
}

export const SAMPLE_LOCATIONS = [
  {
    id: "madurai",
    name: "Madurai",
    district: "Madurai District",
    state: "Tamil Nadu",
    coordinates: [9.9252, 78.1198],
    overallRisk: 82,
    temperatureRisk: 85,
    rainfallRisk: 72,
    waterStress: 74,
    agricultureRisk: 79,
    healthRisk: 68,
    elNinoStatus: "Moderate",
    vulnerability: 72,
    population: 1200000,
    populationAtRisk: "1,200,000",
    vulnerableGroups: {
      elderly: 120000,
      children: 185000,
      farmers: 310000,
      outdoorWorkers: 240000
    },
    anomalies: {
      tempAnomaly: "+2.6°C",
      rainAnomaly: "-28%",
      waterAvailability: "-21%",
      elNinoSignal: "Moderate"
    },
    communityReports: {
      waterShortage: 24,
      extremeHeat: 16,
      cropProblem: 12,
      heavyRainfall: 7
    },
    resources: {
      waterTanks: { available: 3, required: 5 },
      medicalCenters: { available: 1, required: 2 },
      shelters: { available: 2, required: 3 },
      emergencyVehicles: { available: 1, required: 2 },
      emergencyKits: { available: 14, required: 20 }
    },
    mainThreat: "Severe Urban & Agricultural Water Stress",
    recommendedActions: [
      "Deploy emergency water distribution tankers to Madurai South & West zones",
      "Setup shade shelters and hydration points across rural market squares",
      "Issue drought protection crop guidance to dryland paddy farmers",
      "Implement canal irrigation rotation schedules"
    ]
  },
  {
    id: "chennai",
    name: "Chennai",
    district: "Chennai Metro",
    state: "Tamil Nadu",
    coordinates: [13.0827, 80.2707],
    overallRisk: 80,
    temperatureRisk: 82,
    rainfallRisk: 65,
    waterStress: 76,
    agricultureRisk: 71,
    healthRisk: 65,
    elNinoStatus: "Moderate",
    vulnerability: 70,
    population: 4800000,
    populationAtRisk: "2,400,000",
    vulnerableGroups: {
      elderly: 240000,
      children: 350000,
      farmers: 45000,
      outdoorWorkers: 420000
    },
    anomalies: {
      tempAnomaly: "+2.1°C",
      rainAnomaly: "-22%",
      waterAvailability: "-17%",
      elNinoSignal: "Moderate"
    },
    communityReports: {
      waterShortage: 38,
      extremeHeat: 29,
      cropProblem: 4,
      heavyRainfall: 11
    },
    resources: {
      waterTanks: { available: 8, required: 15 },
      medicalCenters: { available: 5, required: 5 },
      shelters: { available: 6, required: 10 },
      emergencyVehicles: { available: 4, required: 6 },
      emergencyKits: { available: 45, required: 60 }
    },
    mainThreat: "Severe Urban Heatwave & Reservoir Storage Drop",
    recommendedActions: [
      "Increase Chembarambakkam & Poondi reservoir monitoring immediately",
      "Alert 200+ vulnerable coastal & slum communities on heat safety",
      "Deploy emergency water tankers to Zone 4 & 7",
      "Issue urban heatwave health advisories to hospitals & outdoor workers"
    ]
  },
  {
    id: "dindigul",
    name: "Dindigul",
    district: "Dindigul District",
    state: "Tamil Nadu",
    coordinates: [10.3673, 77.9803],
    overallRisk: 76,
    temperatureRisk: 80,
    rainfallRisk: 70,
    waterStress: 71,
    agricultureRisk: 82,
    healthRisk: 61,
    elNinoStatus: "Moderate",
    vulnerability: 68,
    population: 640000,
    populationAtRisk: "640,000",
    vulnerableGroups: {
      elderly: 58000,
      children: 92000,
      farmers: 210000,
      outdoorWorkers: 85000
    },
    anomalies: {
      tempAnomaly: "+2.4°C",
      rainAnomaly: "-25%",
      waterAvailability: "-19%",
      elNinoSignal: "Moderate"
    },
    communityReports: {
      waterShortage: 19,
      extremeHeat: 14,
      cropProblem: 22,
      heavyRainfall: 2
    },
    resources: {
      waterTanks: { available: 2, required: 4 },
      medicalCenters: { available: 1, required: 2 },
      shelters: { available: 1, required: 2 },
      emergencyVehicles: { available: 1, required: 1 },
      emergencyKits: { available: 10, required: 15 }
    },
    mainThreat: "Agricultural Drought & Soil Moisture Deficit",
    recommendedActions: [
      "Issue micro-irrigation guidelines for vegetable growers",
      "Activate drought relief centers for local livestock farmers"
    ]
  },
  {
    id: "sivagangai",
    name: "Sivagangai",
    district: "Sivagangai District",
    state: "Tamil Nadu",
    coordinates: [9.8433, 78.4809],
    overallRisk: 64,
    temperatureRisk: 72,
    rainfallRisk: 62,
    waterStress: 64,
    agricultureRisk: 71,
    healthRisk: 55,
    elNinoStatus: "Moderate",
    vulnerability: 62,
    population: 480000,
    populationAtRisk: "480,000",
    vulnerableGroups: {
      elderly: 42000,
      children: 68000,
      farmers: 145000,
      outdoorWorkers: 52000
    },
    anomalies: {
      tempAnomaly: "+1.9°C",
      rainAnomaly: "-18%",
      waterAvailability: "-14%",
      elNinoSignal: "Moderate"
    },
    communityReports: {
      waterShortage: 15,
      extremeHeat: 11,
      cropProblem: 16,
      heavyRainfall: 3
    },
    resources: {
      waterTanks: { available: 2, required: 3 },
      medicalCenters: { available: 1, required: 1 },
      shelters: { available: 1, required: 2 },
      emergencyVehicles: { available: 1, required: 1 },
      emergencyKits: { available: 8, required: 12 }
    },
    mainThreat: "Groundwater Table Depletion & Rainfed Ag Stress",
    recommendedActions: [
      "Inspect village borewell pumps and rainwater recharge structures",
      "Distribute dryland crop advisories via agricultural extension officers"
    ]
  },
  {
    id: "virudhunagar",
    name: "Virudhunagar",
    district: "Virudhunagar District",
    state: "Tamil Nadu",
    coordinates: [9.5872, 77.9578],
    overallRisk: 52,
    temperatureRisk: 68,
    rainfallRisk: 54,
    waterStress: 52,
    agricultureRisk: 58,
    healthRisk: 48,
    elNinoStatus: "Moderate",
    vulnerability: 50,
    population: 520000,
    populationAtRisk: "520,000",
    vulnerableGroups: {
      elderly: 46000,
      children: 71000,
      farmers: 98000,
      outdoorWorkers: 88000
    },
    anomalies: {
      tempAnomaly: "+1.7°C",
      rainAnomaly: "-15%",
      waterAvailability: "-12%",
      elNinoSignal: "Moderate"
    },
    communityReports: {
      waterShortage: 11,
      extremeHeat: 9,
      cropProblem: 8,
      heavyRainfall: 1
    },
    resources: {
      waterTanks: { available: 2, required: 3 },
      medicalCenters: { available: 1, required: 2 },
      shelters: { available: 1, required: 2 },
      emergencyVehicles: { available: 1, required: 1 },
      emergencyKits: { available: 9, required: 14 }
    },
    mainThreat: "Industrial & Domestic Water Storage Drop",
    recommendedActions: [
      "Coordinate industrial water reuse and conservation measures",
      "Provide heat stress prevention kits to factory & outdoor workers"
    ]
  },
  {
    id: "theni",
    name: "Theni",
    district: "Theni District",
    state: "Tamil Nadu",
    coordinates: [10.0104, 77.4768],
    overallRisk: 48,
    temperatureRisk: 61,
    rainfallRisk: 49,
    waterStress: 46,
    agricultureRisk: 52,
    healthRisk: 42,
    elNinoStatus: "Moderate",
    vulnerability: 45,
    population: 390000,
    populationAtRisk: "390,000",
    vulnerableGroups: {
      elderly: 32000,
      children: 54000,
      farmers: 112000,
      outdoorWorkers: 39000
    },
    anomalies: {
      tempAnomaly: "+1.5°C",
      rainAnomaly: "-12%",
      waterAvailability: "-10%",
      elNinoSignal: "Moderate"
    },
    communityReports: {
      waterShortage: 7,
      extremeHeat: 6,
      cropProblem: 9,
      heavyRainfall: 5
    },
    resources: {
      waterTanks: { available: 2, required: 2 },
      medicalCenters: { available: 1, required: 1 },
      shelters: { available: 1, required: 1 },
      emergencyVehicles: { available: 1, required: 1 },
      emergencyKits: { available: 11, required: 12 }
    },
    mainThreat: "Irrigation Canal Storage Inflow Drop",
    recommendedActions: [
      "Monitor Vaigai dam upper catchment river inflows",
      "Encourage drip irrigation adoption in spice and fruit plantations"
    ]
  },
  {
    id: "ramanathapuram",
    name: "Ramanathapuram",
    district: "Ramanathapuram Coastal",
    state: "Tamil Nadu",
    coordinates: [9.3639, 78.8395],
    overallRisk: 38,
    temperatureRisk: 55,
    rainfallRisk: 41,
    waterStress: 44,
    agricultureRisk: 42,
    healthRisk: 38,
    elNinoStatus: "Moderate",
    vulnerability: 40,
    population: 310000,
    populationAtRisk: "310,000",
    vulnerableGroups: {
      elderly: 28000,
      children: 41000,
      farmers: 62000,
      outdoorWorkers: 54000
    },
    anomalies: {
      tempAnomaly: "+1.2°C",
      rainAnomaly: "-8%",
      waterAvailability: "-7%",
      elNinoSignal: "Moderate"
    },
    communityReports: {
      waterShortage: 5,
      extremeHeat: 4,
      cropProblem: 3,
      heavyRainfall: 2
    },
    resources: {
      waterTanks: { available: 2, required: 2 },
      medicalCenters: { available: 1, required: 1 },
      shelters: { available: 2, required: 2 },
      emergencyVehicles: { available: 1, required: 1 },
      emergencyKits: { available: 8, required: 10 }
    },
    mainThreat: "Coastal Salinity Intrusion & Heatwave",
    recommendedActions: [
      "Inspect coastal desalination units & village water distribution points",
      "Provide drinking water kiosks at fisherman landing centers"
    ]
  },
  {
    id: "trichy",
    name: "Trichy",
    district: "Tiruchirappalli Delta Region",
    state: "Tamil Nadu",
    coordinates: [10.7905, 78.7047],
    overallRisk: 68,
    temperatureRisk: 72,
    rainfallRisk: 60,
    waterStress: 62,
    agricultureRisk: 65,
    healthRisk: 57,
    elNinoStatus: "Moderate",
    vulnerability: 60,
    population: 650000,
    populationAtRisk: "650,000",
    vulnerableGroups: {
      elderly: 45000,
      children: 68000,
      farmers: 110000,
      outdoorWorkers: 42000
    },
    anomalies: {
      tempAnomaly: "+1.8°C",
      rainAnomaly: "-18%",
      waterAvailability: "-14%",
      elNinoSignal: "Moderate"
    },
    communityReports: {
      waterShortage: 14,
      extremeHeat: 10,
      cropProblem: 18,
      heavyRainfall: 4
    },
    resources: {
      waterTanks: { available: 3, required: 4 },
      medicalCenters: { available: 2, required: 2 },
      shelters: { available: 2, required: 3 },
      emergencyVehicles: { available: 2, required: 2 },
      emergencyKits: { available: 15, required: 18 }
    },
    mainThreat: "Kaveri River Discharge Deficit & Irrigation Stress",
    recommendedActions: [
      "Monitor Mettur dam outflow allocations to delta districts",
      "Promote micro-irrigation and drip system subsidies",
      "Alert cattle herders regarding fodder storage"
    ]
  },
  {
    id: "coimbatore",
    name: "Coimbatore",
    district: "Coimbatore Foothills",
    state: "Tamil Nadu",
    coordinates: [11.0168, 76.9558],
    overallRisk: 42,
    temperatureRisk: 60,
    rainfallRisk: 48,
    waterStress: 45,
    agricultureRisk: 51,
    healthRisk: 44,
    elNinoStatus: "Moderate",
    vulnerability: 48,
    population: 820000,
    populationAtRisk: "820,000",
    vulnerableGroups: {
      elderly: 55000,
      children: 80000,
      farmers: 60000,
      outdoorWorkers: 50000
    },
    anomalies: {
      tempAnomaly: "+1.1°C",
      rainAnomaly: "-9%",
      waterAvailability: "-6%",
      elNinoSignal: "Moderate"
    },
    communityReports: {
      waterShortage: 6,
      extremeHeat: 5,
      cropProblem: 4,
      heavyRainfall: 8
    },
    resources: {
      waterTanks: { available: 3, required: 3 },
      medicalCenters: { available: 2, required: 2 },
      shelters: { available: 2, required: 2 },
      emergencyVehicles: { available: 2, required: 2 },
      emergencyKits: { available: 16, required: 16 }
    },
    mainThreat: "Moderate Heat Stress & Forest Edge Fire Risk",
    recommendedActions: [
      "Maintain baseline water monitoring across Noyyal basin",
      "Conduct regular fire line checks near Western Ghats border"
    ]
  },
  {
    id: "salem",
    name: "Salem",
    district: "Salem North / Industrial Belt",
    state: "Tamil Nadu",
    coordinates: [11.6643, 78.1460],
    overallRisk: 58,
    temperatureRisk: 74,
    rainfallRisk: 62,
    waterStress: 64,
    agricultureRisk: 68,
    healthRisk: 59,
    elNinoStatus: "Moderate",
    vulnerability: 62,
    population: 540000,
    populationAtRisk: "540,000",
    vulnerableGroups: {
      elderly: 38000,
      children: 52000,
      farmers: 78000,
      outdoorWorkers: 35000
    },
    anomalies: {
      tempAnomaly: "+1.9°C",
      rainAnomaly: "-16%",
      waterAvailability: "-12%",
      elNinoSignal: "Moderate"
    },
    communityReports: {
      waterShortage: 12,
      extremeHeat: 11,
      cropProblem: 9,
      heavyRainfall: 3
    },
    resources: {
      waterTanks: { available: 2, required: 3 },
      medicalCenters: { available: 1, required: 2 },
      shelters: { available: 1, required: 2 },
      emergencyVehicles: { available: 1, required: 1 },
      emergencyKits: { available: 10, required: 15 }
    },
    mainThreat: "Industrial Groundwater Depletion & Orchard Stress",
    recommendedActions: [
      "Issue industrial water rationing protocols",
      "Prepare urban shade zones along high-density corridors"
    ]
  }
];

export const INITIAL_COMMUNITY_SIGNALS = [
  { id: 1, type: 'water', icon: '💧', category: 'Water Shortage', title: 'Reservoir inlet flow decreased by 40%', location: 'Madurai South', locationId: 'madurai', count: 24, time: '10 mins ago', urgent: true, desc: 'Multiple families reporting municipal supply drop in ward 12.' },
  { id: 2, type: 'heat', icon: '🌡️', category: 'Extreme Heat', title: 'Workplaces reporting thermal exhaustion cases', location: 'Madurai Rural', locationId: 'madurai', count: 16, time: '25 mins ago', urgent: true, desc: 'Outdoor laborers experiencing heat exhaustion around agricultural markets.' },
  { id: 3, type: 'crop', icon: '🌾', category: 'Crop Stress', title: 'Paddy leaves wilting due to 14-day dry spell', location: 'Dindigul North', locationId: 'dindigul', count: 22, time: '1 hr ago', urgent: true, desc: 'Groundwater irrigation pumps running dry in 4 village panchayats.' },
  { id: 4, type: 'rain', icon: '🌧️', category: 'Heavy Rainfall Anomaly', title: 'Localized cloudburst in high elevation pocket', location: 'Coimbatore Hills', locationId: 'coimbatore', count: 8, time: '2 hrs ago', urgent: false, desc: 'Unseasonal flash runoff recorded in mountain streams.' }
];
