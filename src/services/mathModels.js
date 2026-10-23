// LastMileIQ Core Mathematical & Optimization Models

/**
 * Computes circadian passenger flow factor based on 24h decimal time
 * @param {number} decimalHour - e.g. 8.75 for 08:45 AM
 * @returns {number} Demand multiplier
 */
export function getCircadianDemandMultiplier(decimalHour) {
  // Morning Rush (08:00 - 10:30)
  if (decimalHour >= 8.0 && decimalHour <= 10.5) {
    const peakCenter = 9.0;
    const dist = Math.abs(decimalHour - peakCenter);
    return 2.2 - dist * 0.6; // 1.3 to 2.2x
  }
  // Afternoon Lull (11:30 - 15:30)
  if (decimalHour >= 11.5 && decimalHour <= 15.5) {
    return 0.55;
  }
  // Evening Tech Rush (17:30 - 20:45)
  if (decimalHour >= 17.5 && decimalHour <= 20.75) {
    const peakCenter = 18.75;
    const dist = Math.abs(decimalHour - peakCenter);
    return 2.4 - dist * 0.5; // 1.4 to 2.4x
  }
  // Late Night Shutdown (22:00 - 05:30)
  if (decimalHour >= 22.0 || decimalHour < 5.5) {
    return 0.18;
  }
  // Intermediate / Shoulder hours
  return 0.95;
}

/**
 * Commuter Egress & Mode Split Prediction using Poisson-adjusted arrivals
 */
export function forecastCommuterEgress({
  station,
  decimalHour,
  scenarios = {}
}) {
  const circadian = getCircadianDemandMultiplier(decimalHour);
  let multiplier = circadian;

  if (scenarios.monsoon) {
    multiplier *= 1.5; // +50% demand due to rain deterrence of walking
  }
  if (scenarios.doubleTrain) {
    multiplier *= 1.85; // 2 trains arrive within 90 seconds
  }
  if (scenarios.megaEvent && station.type === 'tech_hub') {
    multiplier *= 2.1; // Major conference/tech summit surge
  }

  // Base train egress batch for typical 6-car metro train (350 - 900 pax alighting at this stop)
  const baseTrainEgress = Math.round(station.baseDemandRate * 9 * multiplier);
  // Commuters requiring motorized last-mile transit (approx 58% - 72%)
  const lastMileShare = scenarios.monsoon ? 0.85 : 0.62;
  const lastMileSeekers = Math.round(baseTrainEgress * lastMileShare);

  // Egress split across station gates
  const gateForecasts = station.gates.map((gate, idx) => {
    // Gate weighting (Gate 1 and Gate 2 usually take lion's share)
    const weight = idx === 0 ? 0.48 : idx === 1 ? 0.36 : 0.16;
    const gateCommuters = Math.round(lastMileSeekers * weight);

    // Current supply at gate
    let availableSupply = gate.currentSupply;
    if (scenarios.evChargingSurge) {
      availableSupply = Math.max(2, Math.round(availableSupply * 0.75));
    }

    // Vehicle Deficit calculation (1 vehicle = 2.5 pax capacity average pooling)
    const requiredVehicles = Math.ceil(gateCommuters / 2.5);
    const deficit = Math.max(0, requiredVehicles - availableSupply);

    // Current estimated wait time in minutes
    let waitTime = deficit === 0 ? 3.2 : Math.round(3.5 + (deficit / Math.max(availableSupply, 1)) * 4.8);
    if (scenarios.monsoon) waitTime = Math.round(waitTime * 1.35);

    return {
      gateId: gate.id,
      gateName: gate.name,
      facing: gate.facing,
      expectedEgress: Math.round(baseTrainEgress * weight),
      lastMileSeekers: gateCommuters,
      currentSupply: availableSupply,
      requiredVehicles,
      deficit,
      waitTimeMinutes: waitTime,
    };
  });

  const totalDeficit = gateForecasts.reduce((acc, g) => acc + g.deficit, 0);
  const totalSupply = gateForecasts.reduce((acc, g) => acc + g.currentSupply, 0);
  const avgWaitTime = Math.round(
    gateForecasts.reduce((acc, g) => acc + g.waitTimeMinutes, 0) / gateForecasts.length
  );

  return {
    baseTrainEgress,
    lastMileSeekers,
    gateForecasts,
    totalDeficit,
    totalSupply,
    avgWaitTime,
  };
}

/**
 * Calculates Last-Mile Stress Index (LMSI)
 * Formula: LMSI = (Demand / Supply) * (WaitTime / TargetWaitTime)^0.8
 * @returns {{ score: number, level: string, color: string, badge: string }}
 */
export function calculateLMSI(demandRate, supplyRate, waitTimeMinutes) {
  const safeSupply = Math.max(supplyRate, 1);
  const ratio = demandRate / safeSupply;
  const timeFactor = Math.pow(Math.max(waitTimeMinutes, 1) / 5.0, 0.8);
  const rawScore = +(ratio * timeFactor).toFixed(2);

  if (rawScore < 1.25) {
    return {
      score: rawScore,
      level: 'OPTIMAL',
      color: '#10B981', // Cyber Emerald
      tailwindColor: 'text-emerald-400',
      tailwindBg: 'bg-emerald-500/20',
      badge: 'BALANCED SUPPLY',
      waitCategory: '< 5 min wait',
    };
  } else if (rawScore <= 2.4) {
    return {
      score: rawScore,
      level: 'WARNING',
      color: '#F59E0B', // Electric Amber
      tailwindColor: 'text-amber-400',
      tailwindBg: 'bg-amber-500/20',
      badge: 'MODERATE SURGE',
      waitCategory: '5–12 min wait',
    };
  } else {
    return {
      score: rawScore,
      level: 'CRITICAL',
      color: '#EF4444', // Coral Red
      tailwindColor: 'text-rose-400',
      tailwindBg: 'bg-rose-500/20',
      badge: 'ACUTE TRANSIT DEFICIT',
      waitCategory: '> 15 min wait',
    };
  }
}

/**
 * Dynamic Vehicle Rebalancing Optimization
 * Selects candidate feeder stands and generates an actionable dispatch plan
 */
export function generateRebalancingPlan(station, highDeficitGate, allStands) {
  if (!highDeficitGate || highDeficitGate.deficit <= 0) {
    return null;
  }

  // Find candidate stands in the station area with idle vehicles
  const viableStands = allStands
    .filter((s) => s.currentVehicles > 3)
    .sort((a, b) => b.currentVehicles - a.currentVehicles);

  if (viableStands.length === 0) {
    return {
      sourceStand: 'Regional Mobile Reserve',
      targetGate: highDeficitGate.gateName,
      dispatchCount: Math.min(10, highDeficitGate.deficit),
      estimatedArrivalMin: 4.5,
      projectedWaitTimeDrop: {
        from: highDeficitGate.waitTimeMinutes,
        to: 5.5,
      },
      deadKmPerVehicle: 1.1,
      co2SavedKg: 14.2,
    };
  }

  const primaryStand = viableStands[0];
  const dispatchCount = Math.min(
    Math.floor(primaryStand.currentVehicles * 0.7),
    highDeficitGate.deficit
  );

  return {
    sourceStand: primaryStand.name,
    sourceStandId: primaryStand.id,
    targetGate: highDeficitGate.gateName,
    targetGateId: highDeficitGate.gateId,
    dispatchCount: Math.max(dispatchCount, 4),
    estimatedArrivalMin: 2.8,
    projectedWaitTimeDrop: {
      from: highDeficitGate.waitTimeMinutes,
      to: Math.min(5.2, Math.max(3.8, highDeficitGate.waitTimeMinutes - 11)),
    },
    deadKmPerVehicle: 0.7,
    co2SavedKg: 22.4,
  };
}

/**
 * Fleet Economics & Dead Mileage Elimination Calculator
 */
export function calculateFleetEconomics({
  fleetSize = 120,
  dailyTrips = 14,
  avgFare = 55, // INR per trip
  deadKmSavedPercent = 34, // % reduction in non-revenue cruising
  evRatio = 0.65 // 65% EV, 35% CNG/Petrol
}) {
  const avgTripKm = 3.2; // 1-5 km last mile average
  const totalDailyRevenueKm = fleetSize * dailyTrips * avgTripKm;
  
  // Baseline dead mileage without predictive positioning: approx 42% of revenue km
  const baselineDeadKm = totalDailyRevenueKm * 0.42;
  const deadKmSavedDaily = baselineDeadKm * (deadKmSavedPercent / 100);

  // Financial calculations (INR)
  // Saved fuel/energy cost: ~₹3.2 per km for ICE/CNG, ~₹0.85 per km for EV
  const blendedFuelCostPerKm = evRatio * 0.85 + (1 - evRatio) * 3.4;
  const dailyFuelSavings = Math.round(deadKmSavedDaily * blendedFuelCostPerKm);

  // Revenue uplift from capturing 2.5 additional peak trips per vehicle due to zero wait dispatch
  const additionalTripsPerVehicle = 2.4;
  const dailyRevenueUpliftPerVehicle = Math.round(additionalTripsPerVehicle * avgFare * 0.85); // 85% net
  const totalFleetDailyRevenueUplift = fleetSize * dailyRevenueUpliftPerVehicle + dailyFuelSavings;

  const monthlyFleetRevenueUplift = totalFleetDailyRevenueUplift * 30;
  const annualFleetRevenueUplift = totalFleetDailyRevenueUplift * 365;

  // Environmental impact
  // 120g CO2 / km for ICE, 25g CO2 / km lifecycle EV
  const co2AbatementKgDaily = Math.round(deadKmSavedDaily * (evRatio * 0.095 + (1 - evRatio) * 0.135));
  const annualCo2Tonnes = +((co2AbatementKgDaily * 365) / 1000).toFixed(1);

  return {
    dailyFuelSavings,
    dailyRevenueUpliftPerVehicle,
    totalFleetDailyRevenueUplift,
    monthlyFleetRevenueUplift,
    annualFleetRevenueUplift,
    deadKmSavedDaily: Math.round(deadKmSavedDaily),
    co2AbatementKgDaily,
    annualCo2Tonnes,
  };
}
