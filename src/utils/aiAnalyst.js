// NinoShield AI Climate Intelligence Analyst & Early Action Engine

export function generateAIAnalysis(locationData, customIndicators = null) {
  const data = customIndicators || locationData;
  const locationName = locationData.name || "Selected Region";

  const tempRisk = data.temperatureRisk;
  const rainRisk = data.rainfallRisk;
  const waterStress = data.waterStress;
  const agRisk = data.agricultureRisk;
  const healthRisk = data.healthRisk;
  const elNino = data.elNinoStatus || "Moderate";

  // Determine Primary Risk Driver
  let primaryRisk = "Water Stress & Hydrological Deficit";
  let maxRiskVal = waterStress;
  
  if (tempRisk > maxRiskVal) {
    primaryRisk = "Extreme Thermal Heat Stress";
    maxRiskVal = tempRisk;
  }
  if (agRisk > maxRiskVal) {
    primaryRisk = "Agricultural Drought & Soil Moisture Deficit";
    maxRiskVal = agRisk;
  }

  // Summary logic
  const summary = `${locationName} is experiencing elevated climate risk (Score: ${data.calculatedScore || 78}/100) due to compounding temperature anomalies (${data.anomalies?.tempAnomaly || '+2.1°C'}) and rainfall deficits (${data.anomalies?.rainAnomaly || '-22%'}) under ${elNino} El Niño conditions.`;

  // Secondary risks
  const secondaryRisks = [];
  if (tempRisk > 70) secondaryRisks.push("Increased heat-induced respiratory & cardiovascular emergencies");
  if (waterStress > 65) secondaryRisks.push("Severe municipal water reservoir depletion within 21-30 days");
  if (agRisk > 65) secondaryRisks.push("Paddy and cash crop yield reductions up to 35%");
  if (rainRisk > 60) secondaryRisks.push("Unseasonal dry spell disrupting local monsoon recharge");

  // Priority Actions
  const priorityActions = [
    {
      id: 1,
      rank: 1,
      title: `Emergency Reservoir & Aquifer Drawdown Monitoring`,
      category: "Water Resource",
      priority: "CRITICAL",
      badgeColor: "bg-red-500 text-white",
      reason: `Water stress level is at ${waterStress}/100 with a ${data.anomalies?.waterAvailability || '-17%'} supply deficit. Failure to act now risks municipal rationing in 3 weeks.`
    },
    {
      id: 2,
      rank: 2,
      title: `Urban & Rural Heatwave Public Health Alert`,
      category: "Public Health",
      priority: "HIGH",
      badgeColor: "bg-orange-500 text-white",
      reason: `Temperature anomaly (+${data.anomalies?.tempAnomaly || '2.1°C'}) poses high danger to ${locationData.vulnerableGroups?.elderly || '85,000'} elderly residents and outdoor workers.`
    },
    {
      id: 3,
      rank: 3,
      title: `Agricultural Advisory & Drought-Resistant Seed Dispatch`,
      category: "Agriculture",
      priority: "HIGH",
      badgeColor: "bg-orange-500 text-white",
      reason: `Soil moisture stress is impacting farming zones. Micro-irrigation guidance can save up to 40% crop yield.`
    },
    {
      id: 4,
      rank: 4,
      title: `Community Water Conservation & Household Hydration Campaign`,
      category: "Community",
      priority: "MEDIUM",
      badgeColor: "bg-yellow-500 text-black",
      reason: `Grassroots demand reduction helps buffer municipal supply reserves during peak temperature weeks.`
    }
  ];

  // Action Playbook
  const immediateActions = [
    "Increase reservoir outflow monitoring & detect pipe leaks across urban zones",
    "Alert 150+ vulnerable community centers regarding thermal heat risks",
    "Pre-position mobile drinking water tankers in high-stress wards",
    "Monitor emergency hospital admissions for heat exhaustion signals"
  ];

  const shortTermActions = [
    "Issue targeted agricultural irrigation advisories to district extension officers",
    "Implement temporary industrial water draw restrictions",
    "Review local disaster response logistics and emergency cooling shelters",
    "Deploy shade structures at outdoor agricultural and construction sites"
  ];

  const communityActions = [
    "Conserve daily household water usage by avoiding non-essential washing",
    "Ensure elderly relatives and young children stay hydrated during peak UV hours (11am - 3pm)",
    "Store emergency potable water reserves for at least 72 hours",
    "Report localized water pipe leaks or extreme crop wilting to NinoShield Community Signals"
  ];

  // Public Early Warning Copy
  const publicWarning = `🚨 EARLY CLIMATE RISK ALERT — ${locationName.toUpperCase()} 🚨\n\nElevated heat and water stress signals have been detected due to El Niño weather anomalies.\n\n• Key Risks: ${primaryRisk}, low rainfall reserve (-22%).\n• Recommended Citizen Actions: Conserve water immediately, avoid direct sun exposure between 11 AM - 3 PM, check on elderly neighbors.\n• Local Authorities: Response Plan Activated. Monitoring reservoirs and health advisories.`;

  // Departmental Response Plan
  const departmentalPlan = [
    {
      department: "Department of Water & Reservoirs",
      icon: "💧",
      action: "Implement daily reservoir monitoring & activate emergency groundwater borewell reserves.",
      priority: "CRITICAL",
      timeline: "Within 24 - 48 hours",
      status: "READY TO DEPLOY"
    },
    {
      department: "Department of Health & Emergency Services",
      icon: "🏥",
      action: "Equip primary health centers with IV fluids, oral rehydration salts & heat-stroke wards.",
      priority: "HIGH",
      timeline: "Within 48 - 72 hours",
      status: "READY TO DEPLOY"
    },
    {
      department: "Department of Agriculture & Rural Development",
      icon: "🌾",
      action: "Broadcast SMS advisories on crop mulching, pulse crop diversification & irrigation timing.",
      priority: "HIGH",
      timeline: "Within 3 days",
      status: "READY TO DEPLOY"
    },
    {
      department: "Municipal & Community Action Cell",
      icon: "📢",
      action: "Launch public water conservation drive & set up mobile hydration stations across public transit hubs.",
      priority: "MEDIUM",
      timeline: "Within 7 days",
      status: "READY TO DEPLOY"
    }
  ];

  return {
    summary,
    primaryRisk,
    secondaryRisks,
    priorityActions,
    immediateActions,
    shortTermActions,
    communityActions,
    publicWarning,
    departmentalPlan,
    disclaimer: "AI-assisted scenario analysis for decision support. Risk estimates are scenario-based and should be validated against official emergency management sources before operational deployment."
  };
}
