import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { CORRIDOR_DATA_MAP } from '../data/corridorStations';
import { 
  forecastCommuterEgress, 
  calculateLMSI, 
  generateRebalancingPlan,
  calculateFleetEconomics 
} from '../services/mathModels';

const SimulationContext = createContext(null);

// Audio synthesizer for dispatch pings and alerts (Pure Web Audio API - zero external files)
class SoundFx {
  constructor() {
    this.ctx = null;
  }
  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }
  playDispatchChime() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.12); // G5
      osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.28); // C6
      
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    } catch (e) {
      // Audio not permitted or supported
    }
  }
  playAlertWarning() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(330, now + 0.15);
      
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {}
  }
}

const soundFx = new SoundFx();

export function SimulationProvider({ children }) {
  const [currentCorridorKey, setCurrentCorridorKey] = useState('bengaluru-purple');
  const [timeOfDay, setTimeOfDay] = useState(8.75); // 08:45 AM
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState(1); // 1x, 2x, 5x

  // Scenarios
  const [scenarios, setScenarios] = useState({
    monsoon: false,
    doubleTrain: false,
    evChargingSurge: false,
    megaEvent: false,
  });

  // Selected Station for detailed inspector
  const [selectedStationId, setSelectedStationId] = useState('stn-hodi'); // Default Hoodi or HITEC
  
  // Real-time train countdowns (seconds remaining until next train arrives per station)
  const [trainCountdowns, setTrainCountdowns] = useState({
    'stn-byph': 195,
    'stn-bnhl': 340,
    'stn-krpr': 140,
    'stn-grcp': 260,
    'stn-hodi': 225, // 3m 45s
    'stn-itpl': 180,
    'stn-kndh': 310,
    'stn-whfd': 120,
    'stn-ampt': 210,
    'stn-mdhp': 160,
    'stn-durg': 290,
    'stn-htec': 175,
    'stn-rdrg': 240,
  });

  // Dynamic dispatch history & active moving vehicles
  const [dispatchEvents, setDispatchEvents] = useState([
    {
      id: 'disp-001',
      plate: 'KA-03-ER-4821',
      driver: 'Ramesh Gowda',
      type: 'EV Auto (Mahindra Treo)',
      battery: 84,
      targetGate: 'Gate 2 (EPIP Zone Feeder)',
      stationName: 'Hoodi',
      status: 'En-route',
      etaSec: 140,
      timestamp: 'Just now',
      fareEstimate: '₹45',
    },
    {
      id: 'disp-002',
      plate: 'KA-53-E-9012',
      driver: 'Syed Farooq',
      type: 'Piaggio Ape E-City',
      battery: 76,
      targetGate: 'Gate 1 (Park Square Mall)',
      stationName: 'ITPL',
      status: 'Dispatched',
      etaSec: 90,
      timestamp: '1 min ago',
      fareEstimate: '₹50',
    },
    {
      id: 'disp-003',
      plate: 'KA-04-MB-3310',
      driver: 'Manjunath K.',
      type: 'BMTC Feeder Minibus',
      battery: 92,
      targetGate: 'Gate 1 (Ring Road Southbound)',
      stationName: 'KR Pura',
      status: 'Boarding',
      etaSec: 30,
      timestamp: '2 mins ago',
      fareEstimate: '₹20 (Fixed)',
    },
  ]);

  // Toast feedback state
  const [activeToast, setActiveToast] = useState(null);

  // Time ticker effect
  useEffect(() => {
    const timer = setInterval(() => {
      // 1. Tick train countdowns
      setTrainCountdowns((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((stnId) => {
          if (next[stnId] <= 1) {
            // Train arrived, reset to randomized 4 to 7 minutes
            next[stnId] = Math.floor(240 + Math.random() * 180);
          } else {
            next[stnId] -= 1;
          }
        });
        return next;
      });

      // 2. Advance time of day if auto-playing
      if (isPlaying) {
        setTimeOfDay((prevTime) => {
          const step = (0.015 * playSpeed);
          let newTime = prevTime + step;
          if (newTime >= 23.5) newTime = 6.0; // loop to morning
          return +newTime.toFixed(2);
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, playSpeed]);

  // Format decimal hour to HH:MM AM/PM
  const formattedTime = useMemo(() => {
    const h = Math.floor(timeOfDay);
    const m = Math.floor((timeOfDay - h) * 60);
    const period = h >= 12 ? 'PM' : 'AM';
    const displayHour = h % 12 === 0 ? 12 : h % 12;
    const displayMinute = m < 10 ? `0${m}` : m;
    return `${displayHour}:${displayMinute} ${period}`;
  }, [timeOfDay]);

  // Active corridor configuration
  const activeCorridor = useMemo(() => {
    return CORRIDOR_DATA_MAP[currentCorridorKey] || CORRIDOR_DATA_MAP['bengaluru-purple'];
  }, [currentCorridorKey]);

  // Ensure selected station belongs to active corridor
  useEffect(() => {
    const exists = activeCorridor.stations.some((s) => s.id === selectedStationId);
    if (!exists && activeCorridor.stations.length > 0) {
      setSelectedStationId(activeCorridor.stations[0].id);
    }
  }, [activeCorridor, selectedStationId]);

  // Compute live station telemetry
  const computedStations = useMemo(() => {
    return activeCorridor.stations.map((stn) => {
      const forecast = forecastCommuterEgress({
        station: stn,
        decimalHour: timeOfDay,
        scenarios,
      });

      // Find highest deficit gate
      const sortedGates = [...forecast.gateForecasts].sort((a, b) => b.deficit - a.deficit);
      const highDeficitGate = sortedGates[0];

      // Station-wide LMSI
      const lmsi = calculateLMSI(
        forecast.lastMileSeekers,
        forecast.totalSupply * 2.5,
        forecast.avgWaitTime
      );

      // Rebalancing recommendation
      const rebalancingPlan = generateRebalancingPlan(
        stn,
        highDeficitGate,
        stn.stands
      );

      const countdownSec = trainCountdowns[stn.id] || 180;
      const countdownMin = Math.floor(countdownSec / 60);
      const countdownSecRem = countdownSec % 60;
      const countdownFormatted = `${countdownMin}m ${countdownSecRem < 10 ? '0' : ''}${countdownSecRem}s`;

      return {
        ...stn,
        forecast,
        highDeficitGate,
        lmsi,
        rebalancingPlan,
        trainCountdown: {
          seconds: countdownSec,
          formatted: countdownFormatted,
        },
      };
    });
  }, [activeCorridor, timeOfDay, scenarios, trainCountdowns]);

  // Currently focused station object
  const currentStation = useMemo(() => {
    return (
      computedStations.find((s) => s.id === selectedStationId) ||
      computedStations[0] ||
      null
    );
  }, [computedStations, selectedStationId]);

  // Fleet Overall Telemetry
  const corridorTelemetry = useMemo(() => {
    const totalDeficit = computedStations.reduce((acc, s) => acc + s.forecast.totalDeficit, 0);
    const totalSupply = computedStations.reduce((acc, s) => acc + s.forecast.totalSupply, 0);
    const avgWaitTime = Math.round(
      computedStations.reduce((acc, s) => acc + s.forecast.avgWaitTime, 0) /
        Math.max(1, computedStations.length)
    );
    const criticalStationsCount = computedStations.filter((s) => s.lmsi.level === 'CRITICAL').length;
    
    // Utilization rate
    const utilizationRate = Math.min(96, Math.max(54, Math.round(72 + (1 - totalDeficit / (totalSupply + 50)) * 22)));

    // Economics
    const economics = calculateFleetEconomics({
      fleetSize: totalSupply * 2,
      dailyTrips: 15,
      avgFare: 55,
      deadKmSavedPercent: 34,
      evRatio: 0.7,
    });

    return {
      totalDeficit,
      totalSupply,
      avgWaitTime,
      criticalStationsCount,
      utilizationRate,
      economics,
    };
  }, [computedStations]);

  // Action: Execute Auto-Dispatch / Rebalancing
  const executeAutoDispatch = useCallback((stationId) => {
    const stn = computedStations.find((s) => s.id === (stationId || selectedStationId));
    if (!stn || !stn.highDeficitGate) return;

    soundFx.playDispatchChime();

    const plan = stn.rebalancingPlan;
    const rebalanceCount = plan ? plan.dispatchCount : 8;
    const targetGateName = stn.highDeficitGate.gateName;

    // Create simulated Indian registration plates
    const cityPrefix = currentCorridorKey.includes('hyderabad') ? 'TS' : 'KA';
    const rto = currentCorridorKey.includes('hyderabad') ? '09' : '03';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const plate = `${cityPrefix}-${rto}-ER-${randomNum}`;
    
    const driverNames = [
      'Ramesh Gowda', 'Suresh Kumar', 'Venkat Reddy', 'Malleshappa',
      'Syed Farooq', 'Rajendra Prasad', 'Anil Naik', 'Shivanna'
    ];
    const randomDriver = driverNames[Math.floor(Math.random() * driverNames.length)];

    const newDispatch = {
      id: `disp-${Date.now()}`,
      plate,
      driver: randomDriver,
      type: Math.random() > 0.4 ? 'Mahindra Treo EV' : 'Piaggio Ape E-City',
      battery: Math.floor(70 + Math.random() * 28),
      targetGate: targetGateName,
      stationName: stn.name,
      status: 'Dispatched (En-route)',
      etaSec: 90 + Math.floor(Math.random() * 60),
      timestamp: 'Just now',
      fareEstimate: '₹45 (Pool ₹25)',
    };

    setDispatchEvents((prev) => [newDispatch, ...prev.slice(0, 9)]);

    // Trigger toast notification
    setActiveToast({
      title: 'Dynamic Rebalancing Dispatched',
      message: `Rebalanced ${rebalanceCount} EV feeders to ${stn.name} (${targetGateName}). Wait time projected to drop to 5.2m!`,
      type: 'success',
    });

    setTimeout(() => {
      setActiveToast(null);
    }, 4500);
  }, [computedStations, selectedStationId, currentCorridorKey]);

  // Toggle scenario
  const toggleScenario = useCallback((scenarioKey) => {
    soundFx.playAlertWarning();
    setScenarios((prev) => ({
      ...prev,
      [scenarioKey]: !prev[scenarioKey],
    }));
  }, []);

  return (
    <SimulationContext.Provider
      value={{
        currentCorridorKey,
        setCurrentCorridorKey,
        timeOfDay,
        setTimeOfDay,
        formattedTime,
        isPlaying,
        setIsPlaying,
        playSpeed,
        setPlaySpeed,
        scenarios,
        toggleScenario,
        selectedStationId,
        setSelectedStationId,
        activeCorridor,
        computedStations,
        currentStation,
        corridorTelemetry,
        dispatchEvents,
        executeAutoDispatch,
        activeToast,
        setActiveToast,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const ctx = useContext(SimulationContext);
  if (!ctx) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return ctx;
}
