import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { CORRIDOR_DATA_MAP } from '../data/corridorStations';
import { 
  forecastCommuterEgress, 
  calculateLMSI, 
  generateRebalancingPlan,
  calculateFleetEconomics 
} from '../services/mathModels';

export const ACCOUNTS = {
  fleet: {
    id: 'acc-fleet',
    roleKey: 'fleet',
    name: 'Rohan Mehta',
    title: 'Fleet Dispatch Director',
    organization: 'Maha-EV Feeder Syndicate',
    initials: 'RM',
    badgeColor: '#10B981',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    description: 'Live dispatch control, station deficit alerts, driver queue & unit economics',
    viewLabel: 'Fleet Operator Command View',
  },
  planner: {
    id: 'acc-planner',
    roleKey: 'planner',
    name: 'Dr. Anjali Deshmukh',
    title: 'Senior Urban Transit Planner',
    organization: 'MMRDA Infrastructure Wing',
    initials: 'AD',
    badgeColor: '#06B6D4',
    badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    description: 'Suburban transit equity, bottleneck chokepoints & dedicated feeder lane ROI',
    viewLabel: 'B2G Municipal Planning View',
  },
  commuter: {
    id: 'acc-commuter',
    roleKey: 'commuter',
    name: 'Aditya Sharma',
    title: 'Daily Metro & Suburban Rider',
    organization: 'ONDC / Chalo Network',
    initials: 'AS',
    badgeColor: '#F59E0B',
    badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    description: 'Concourse exit guide, shared EV auto booking & fixed-fare OTP token',
    viewLabel: 'B2C Commuter Mobile View',
  },
};

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
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.28);
      
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    } catch (e) {}
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
  // Account Role System (Default: Fleet Operator)
  const [activeAccountRole, setActiveAccountRole] = useState('fleet'); // 'fleet' | 'planner' | 'commuter'

  // Default to Mumbai Metro Line 1 (Versova - Andheri - Ghatkopar)
  const [currentCorridorKey, setCurrentCorridorKey] = useState('mumbai-metro-1');
  const [timeOfDay, setTimeOfDay] = useState(8.75); // 08:45 AM
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState(1);

  // Scenarios
  const [scenarios, setScenarios] = useState({
    monsoon: false,
    doubleTrain: false,
    evChargingSurge: false,
    megaEvent: false,
  });

  // Selected Station for detailed inspector (default to Andheri Metro)
  const [selectedStationId, setSelectedStationId] = useState('stn-m1-and');
  
  // Real-time train / local countdowns
  const [trainCountdowns, setTrainCountdowns] = useState({
    'stn-m1-vsv': 210,
    'stn-m1-dnn': 165,
    'stn-m1-and': 140,
    'stn-m1-weh': 280,
    'stn-m1-mrln': 195,
    'stn-m1-sknk': 110,
    'stn-m1-ghtk': 175,
    'stn-m2a-dhs': 240,
    'stn-m2a-borw': 180,
    'stn-m2a-kndw': 220,
    'stn-m2a-mldw': 150,
    'stn-m2a-grgw': 210,
    'stn-m2a-dnn': 190,
    'stn-m7-dhs': 230,
    'stn-m7-npk': 170,
    'stn-m7-dnd': 195,
    'stn-m7-gnd': 145,
    'stn-m3-ary': 260,
    'stn-m3-spz': 160,
    'stn-m3-t2': 185,
    'stn-m3-bkc': 120,
    'stn-m2b-dnn': 220,
    'stn-m2b-bnd': 180,
    'stn-m2b-bkc': 130,
    'stn-m2b-chm': 240,
    'stn-m6-ssn': 230,
    'stn-m6-iit': 150,
    'stn-m6-vkh': 260,
    'stn-wr-chg': 180,
    'stn-wr-ddr': 90,
    'stn-wr-bnd': 110,
    'stn-wr-and': 80,
    'stn-wr-bor': 130,
    'stn-cr-csmt': 175,
    'stn-cr-ddr': 85,
    'stn-cr-krl': 105,
    'stn-cr-ght': 95,
    'stn-cr-thn': 120,
    'stn-hr-vdl': 210,
    'stn-hr-krl': 140,
    'stn-hr-vsh': 160,
    'stn-hr-pnv': 240,
  });

  // Dynamic dispatch history with Mumbai license plates
  const [dispatchEvents, setDispatchEvents] = useState([
    {
      id: 'disp-001',
      plate: 'MH-02-ER-4192',
      driver: 'Sachin Shinde',
      type: 'Mahindra Treo EV Auto',
      battery: 86,
      targetGate: 'Gate 1 (Andheri Railway Skywalk)',
      stationName: 'Andheri Metro',
      status: 'En-route',
      etaSec: 120,
      timestamp: 'Just now',
      fareEstimate: '₹35 (Pool ₹20)',
    },
    {
      id: 'disp-002',
      plate: 'MH-03-E-8812',
      driver: 'Prakash Patil',
      type: 'Piaggio Ape E-City',
      battery: 79,
      targetGate: 'Gate 2 (LBS Marg Feeder)',
      stationName: 'Ghatkopar Metro',
      status: 'Dispatched',
      etaSec: 85,
      timestamp: '1 min ago',
      fareEstimate: '₹30',
    },
    {
      id: 'disp-003',
      plate: 'MH-01-BF-9040',
      driver: 'Nilesh Sawant',
      type: 'BEST Feeder Minibus (Olectra)',
      battery: 94,
      targetGate: 'Gate 1 (ICICI Bank BKC)',
      stationName: 'Bandra-Kurla Complex (BKC)',
      status: 'Boarding',
      etaSec: 25,
      timestamp: '2 mins ago',
      fareEstimate: '₹15 (BEST Flat)',
    },
  ]);

  // Toast feedback state
  const [activeToast, setActiveToast] = useState(null);

  // Time ticker effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTrainCountdowns((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((stnId) => {
          if (next[stnId] <= 1) {
            next[stnId] = Math.floor(180 + Math.random() * 180);
          } else {
            next[stnId] -= 1;
          }
        });
        return next;
      });

      if (isPlaying) {
        setTimeOfDay((prevTime) => {
          const step = 0.015 * playSpeed;
          let newTime = prevTime + step;
          if (newTime >= 23.5) newTime = 6.0;
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
    return CORRIDOR_DATA_MAP[currentCorridorKey] || CORRIDOR_DATA_MAP['mumbai-metro-1'];
  }, [currentCorridorKey]);

  // Active Account Profile
  const currentAccount = useMemo(() => {
    return ACCOUNTS[activeAccountRole] || ACCOUNTS.fleet;
  }, [activeAccountRole]);

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

      const sortedGates = [...forecast.gateForecasts].sort((a, b) => b.deficit - a.deficit);
      const highDeficitGate = sortedGates[0];

      const lmsi = calculateLMSI(
        forecast.lastMileSeekers,
        forecast.totalSupply * 2.5,
        forecast.avgWaitTime
      );

      const rebalancingPlan = generateRebalancingPlan(
        stn,
        highDeficitGate,
        stn.stands
      );

      const countdownSec = trainCountdowns[stn.id] || 150;
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
    
    const utilizationRate = Math.min(96, Math.max(58, Math.round(76 + (1 - totalDeficit / (totalSupply + 50)) * 20)));

    const economics = calculateFleetEconomics({
      fleetSize: totalSupply * 2,
      dailyTrips: 16,
      avgFare: 40,
      deadKmSavedPercent: 36,
      evRatio: 0.75,
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

    const rtoPrefixes = ['MH-01', 'MH-02', 'MH-03', 'MH-04', 'MH-47'];
    const rto = rtoPrefixes[Math.floor(Math.random() * rtoPrefixes.length)];
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const plate = `${rto}-ER-${randomNum}`;
    
    const driverNames = [
      'Sachin Shinde', 'Prakash Patil', 'Ganesh More', 'Nilesh Sawant',
      'Deepak Kamble', 'Santosh Jadhav', 'Pradeep Pawar', 'Vinod Gaikwad'
    ];
    const randomDriver = driverNames[Math.floor(Math.random() * driverNames.length)];

    const vehicleTypes = [
      'Mahindra Treo EV Auto',
      'Bajaj RE Electric',
      'Piaggio Ape E-City',
      'BEST Metro Feeder (Olectra)',
    ];
    const randomVehicle = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];

    const newDispatch = {
      id: `disp-${Date.now()}`,
      plate,
      driver: randomDriver,
      type: randomVehicle,
      battery: Math.floor(74 + Math.random() * 24),
      targetGate: targetGateName,
      stationName: stn.name,
      status: 'Dispatched (En-route)',
      etaSec: 60 + Math.floor(Math.random() * 50),
      timestamp: 'Just now',
      fareEstimate: '₹35 (Pool ₹20)',
    };

    setDispatchEvents((prev) => [newDispatch, ...prev.slice(0, 9)]);

    setActiveToast({
      title: 'Mumbai Feeder Rebalance Dispatched',
      message: `Rebalanced ${rebalanceCount} EV units to ${stn.name} (${targetGateName}). Commuter wait time capped at 4.5m!`,
      type: 'success',
    });

    setTimeout(() => {
      setActiveToast(null);
    }, 4500);
  }, [computedStations, selectedStationId]);

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
        activeAccountRole,
        setActiveAccountRole,
        currentAccount,
        ACCOUNTS,
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
