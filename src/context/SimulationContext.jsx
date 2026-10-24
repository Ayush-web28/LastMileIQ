import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { CORRIDORS } from '../data/corridors';
import { CORRIDOR_DATA_MAP } from '../data/corridorStations';
import { 
  forecastCommuterEgress, 
  calculateLMSI, 
  generateRebalancingPlan, 
  calculateFleetEconomics 
} from '../services/mathModels';

// Only 2 Primary Stakeholder Accounts: Fleet Dispatch Director & Transit Planner
export const ACCOUNTS = {
  fleet: {
    id: 'acc-fleet',
    roleKey: 'fleet',
    name: 'Rohan Mehta',
    title: 'Fleet Dispatch Director',
    organization: 'Mumbai Feeder Syndicate & EV Fleet Alliance',
    initials: 'RM',
    badgeColor: '#10B981',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    description: 'Live dynamic dispatch, station vehicle deficits, driver queue & unit economics',
    viewLabel: 'Fleet Dispatch Director Console',
  },
  planner: {
    id: 'acc-planner',
    roleKey: 'planner',
    name: 'Dr. Anjali Deshmukh',
    title: 'Transit Planner',
    organization: 'MMRDA Infrastructure & Transit Equity Wing',
    initials: 'AD',
    badgeColor: '#06B6D4',
    badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    description: 'Suburban transit equity, bottleneck chokepoints & dedicated feeder lane ROI',
    viewLabel: 'Transit Planner Console',
  },
};

const SimulationContext = createContext(null);

// Pure Web Audio API Synthesizer (Zero external dependencies)
class SoundFx {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  playTone(freq, type = 'sine', duration = 0.15, vol = 0.05) {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  dispatchPing() {
    this.playTone(587.33, 'triangle', 0.1, 0.06); // D5
    setTimeout(() => this.playTone(880.0, 'sine', 0.2, 0.08), 90); // A5
  }

  alertTone() {
    this.playTone(440, 'sawtooth', 0.12, 0.04);
    setTimeout(() => this.playTone(349.23, 'sawtooth', 0.18, 0.04), 100);
  }
}

const soundFx = new SoundFx();

export function SimulationProvider({ children }) {
  // Universal Light/Dark Theme State ('dark' | 'light')
  const [theme, setTheme] = useState('dark');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      if (typeof document !== 'undefined') {
        if (next === 'dark') {
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('light');
        } else {
          document.documentElement.classList.add('light');
          document.documentElement.classList.remove('dark');
        }
      }
      return next;
    });
  }, []);

  // Sync theme class to root HTML
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme]);

  // Account Role: 'fleet' (Fleet Dispatch Director) or 'planner' (Transit Planner)
  const [activeAccountRole, setActiveAccountRole] = useState('fleet');

  // Active Mumbai Transit Corridor Key (Default: Mumbai Metro Line 1)
  const [currentCorridorKey, setCurrentCorridorKey] = useState('mumbai-metro-1');
  const [timeOfDay, setTimeOfDay] = useState(8.75); // 08:45 AM peak
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState(1);

  // Scenario Injections
  const [scenarios, setScenarios] = useState({
    monsoon: false,
    doubleTrain: false,
    evChargingSurge: false,
    megaEvent: false,
  });

  // Selected Station for detailed inspector (default to Andheri Metro)
  const [selectedStationId, setSelectedStationId] = useState('stn-m1-and');
  
  // Real-time train countdowns
  const [trainCountdowns, setTrainCountdowns] = useState({
    'stn-m1-vsv': 210,
    'stn-m1-dnn': 165,
    'stn-m1-azn': 240,
    'stn-m1-and': 145,
    'stn-m1-weh': 190,
    'stn-m1-chk': 260,
    'stn-m1-aln': 130,
    'stn-m1-mrn': 95,
    'stn-m1-skn': 180,
    'stn-m1-asn': 215,
    'stn-m1-jgr': 150,
    'stn-m1-ght': 110,
    'stn-m2a-dhe': 180,
    'stn-m2a-brv': 140,
    'stn-m2a-knd': 220,
    'stn-m2a-mld': 160,
    'stn-m2a-grw': 190,
    'stn-m2a-dnn': 115,
    'stn-m7-dhe': 210,
    'stn-m7-npk': 175,
    'stn-m7-mgt': 190,
    'stn-m7-dnd': 130,
    'stn-m7-gre': 160,
    'stn-m7-gnd': 105,
    'stn-m3-ary': 240,
    'stn-m3-spz': 190,
    'stn-m3-mrn': 120,
    'stn-m3-t2': 85,
    'stn-m3-t1': 140,
    'stn-m3-bkc': 65,
    'stn-wr-ccg': 240,
    'stn-wr-mcl': 200,
    'stn-wr-ddr': 110,
    'stn-wr-bnd': 135,
    'stn-wr-stc': 180,
    'stn-wr-and': 90,
    'stn-wr-grg': 160,
    'stn-wr-brv': 75,
    'stn-cr-csmt': 230,
    'stn-cr-bcl': 190,
    'stn-cr-ddr': 95,
    'stn-cr-krl': 130,
    'stn-cr-ght': 85,
    'stn-cr-vkh': 170,
    'stn-cr-bhn': 195,
    'stn-cr-tna': 110,
    'stn-hr-csmt': 240,
    'stn-hr-vdl': 150,
    'stn-hr-gtb': 190,
    'stn-hr-krl': 120,
    'stn-hr-chm': 165,
    'stn-hr-mnf': 210,
    'stn-hr-vsh': 105,
    'stn-hr-pnv': 240,
  });

  // Persistent Geospatial Map Filters across tab switches
  const [mapFilters, setMapFilters] = useState({
    mapType: 'roadmap',       // 'roadmap' | 'satellite'
    showHeatRings: true,      // Stress Rings
    showStands: true,         // Feeder Stands
    showVehicles: true,       // Active Fleet
    showTransitTrack: true,   // Corridor Line
  });

  const toggleMapFilter = useCallback((key) => {
    setMapFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  const setMapType = useCallback((type) => {
    setMapFilters((prev) => ({
      ...prev,
      mapType: type,
    }));
  }, []);

  // Persistent map viewport center and zoom level across tabs
  const [mapViewBounds, setMapViewBounds] = useState({
    center: null,
    zoom: null,
  });

  // Dynamic dispatch history with Mumbai license plates and 3 pure lifecycle states:
  // 'Dispatched' (initially) -> 'En Route' (after brief transit) -> 'Arrived' (at concourse gate)
  const [dispatchEvents, setDispatchEvents] = useState([
    {
      id: 'disp-001',
      plate: 'MH-02-EV-8829',
      driverName: 'Vinod Ghorpade',
      rating: 4.85,
      batteryPct: 75,
      vehicleType: 'EV Feeder Auto',
      fromStand: 'Ghatkopar Station East Hub',
      toGate: 'Gate 1 (LBS Marg Concourse)',
      stationName: 'Ghatkopar (Interchange with CR Local)',
      timeAgo: 'Just now',
      status: 'Dispatched',
      createdAt: Date.now() - 2000,
      surgeFare: '₹30 flat ONDC',
    },
    {
      id: 'disp-002',
      plate: 'MH-02-EV-1822',
      driverName: 'Arun Jadhav',
      rating: 4.81,
      batteryPct: 76,
      vehicleType: 'EV Feeder Auto',
      fromStand: 'Ghatkopar Station East Hub',
      toGate: 'Gate 2 (Pant Nagar)',
      stationName: 'Ghatkopar (Interchange with CR Local)',
      timeAgo: 'Just now',
      status: 'Dispatched',
      createdAt: Date.now() - 4000,
      surgeFare: '₹30 flat ONDC',
    },
    {
      id: 'disp-003',
      plate: 'MH-02-ER-3421',
      driverName: 'Ramesh Powar',
      rating: 4.88,
      batteryPct: 84,
      vehicleType: 'EV Feeder Auto',
      fromStand: 'Andheri West Syndicate Stand',
      toGate: 'Gate 2 (SV Road West)',
      stationName: 'Andheri (Interchange with WR Local)',
      timeAgo: '1m ago',
      status: 'En Route',
      createdAt: Date.now() - 14000,
      surgeFare: '₹35 flat fixed ONDC',
    },
    {
      id: 'disp-004',
      plate: 'MH-03-EB-9104',
      driverName: 'Ganesh Shinde',
      rating: 4.92,
      batteryPct: 91,
      vehicleType: 'Smart E-Bus Feeder',
      fromStand: 'Ghatkopar Station East Hub',
      toGate: 'Gate 1 (LBS Marg Concourse)',
      stationName: 'Ghatkopar (Interchange with CR Local)',
      timeAgo: '3m ago',
      status: 'Arrived',
      createdAt: Date.now() - 38000,
      surgeFare: '₹20 feeder hop',
    },
    {
      id: 'disp-005',
      plate: 'MH-01-AR-5582',
      driverName: 'Sanjay Jadhav',
      rating: 4.79,
      batteryPct: 76,
      vehicleType: 'CNG Auto Syndicate',
      fromStand: 'D.N. Nagar Metro Bay',
      toGate: 'Gate 1 (Link Road West)',
      stationName: 'D.N. Nagar (Interchange with Line 2A)',
      timeAgo: '5m ago',
      status: 'Arrived',
      createdAt: Date.now() - 65000,
      surgeFare: '₹30 metered',
    },
  ]);

  // Automated dispatch lifecycle ticker:
  // Dispatched -> En Route (after ~8-10s) -> Arrived (after ~22-25s)
  useEffect(() => {
    const lifecycleInterval = setInterval(() => {
      setDispatchEvents((prevEvents) => {
        let hasChanges = false;
        const now = Date.now();
        const updated = prevEvents.map((event) => {
          const createdAt = event.createdAt || now;
          const elapsedSec = (now - createdAt) / 1000;

          if (event.status === 'Dispatched' && elapsedSec >= 9) {
            hasChanges = true;
            return {
              ...event,
              status: 'En Route',
              timeAgo: 'En route to gate',
            };
          } else if (event.status === 'En Route' && elapsedSec >= 24) {
            hasChanges = true;
            return {
              ...event,
              status: 'Arrived',
              timeAgo: 'Arrived at concourse',
            };
          }
          return event;
        });

        return hasChanges ? updated : prevEvents;
      });
    }, 1500);

    return () => clearInterval(lifecycleInterval);
  }, []);

  // Telematics Ping Action: sends gate bay assignment, chirps audio, and progresses status
  const pingConcourseGate = useCallback((driverId) => {
    soundFx.dispatchPing();
    setDispatchEvents((prev) =>
      prev.map((d) => {
        if (d.id === driverId) {
          // If vehicle was Dispatched, pinging accelerates transit to En Route
          const nextStatus = d.status === 'Dispatched' ? 'En Route' : d.status;
          return {
            ...d,
            status: nextStatus,
            timeAgo: nextStatus === 'En Route' ? 'En route to gate' : d.timeAgo,
            createdAt: nextStatus === 'En Route' && d.status === 'Dispatched' ? Date.now() - 10000 : d.createdAt,
            lastPinged: Date.now(),
          };
        }
        return d;
      })
    );
  }, []);

  const [activeToast, setActiveToast] = useState(null);

  // Time ticker effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTrainCountdowns((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((key) => {
          if (updated[key] <= 5) {
            updated[key] = Math.floor(180 + Math.random() * 120);
          } else {
            updated[key] -= 1;
          }
        });
        return updated;
      });

      if (isPlaying) {
        setTimeOfDay((prev) => {
          const next = prev + 0.01 * playSpeed;
          return next >= 24 ? 5 : next;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, playSpeed]);

  const formattedTime = useMemo(() => {
    const h = Math.floor(timeOfDay);
    const m = Math.floor((timeOfDay - h) * 60);
    const period = h >= 12 ? 'PM' : 'AM';
    const displayHour = h % 12 === 0 ? 12 : h % 12;
    const displayMinute = m < 10 ? `0${m}` : m;
    return `${displayHour}:${displayMinute} ${period}`;
  }, [timeOfDay]);

  // Robust corridor metadata merging
  const activeCorridor = useMemo(() => {
    const meta = CORRIDORS[currentCorridorKey] || CORRIDORS['mumbai-metro-1'];
    const geo = CORRIDOR_DATA_MAP[currentCorridorKey] || CORRIDOR_DATA_MAP['mumbai-metro-1'];
    return {
      ...meta,
      ...geo,
      name: meta.name || geo?.name,
      shortName: meta.shortName || meta.name || geo?.name,
      categoryLabel: meta.categoryLabel || (meta.category === 'metro' ? 'Metro Line' : 'Suburban Local Line'),
      color: meta.color || '#10B981',
      stationsCount: geo?.stations?.length || meta.stationsCount || 12,
      lengthKm: meta.lengthKm || 15.0,
      center: geo?.center || meta.mapCenter || [19.1176, 72.8680],
      zoom: geo?.zoom || meta.defaultZoom || 12,
      stations: geo?.stations || [],
    };
  }, [currentCorridorKey]);

  // Active Account Profile
  const currentAccount = useMemo(() => {
    return ACCOUNTS[activeAccountRole] || ACCOUNTS.fleet;
  }, [activeAccountRole]);

  // Ensure selected station belongs to active corridor
  useEffect(() => {
    const exists = activeCorridor.stations?.some((s) => s.id === selectedStationId);
    if (!exists && activeCorridor.stations && activeCorridor.stations.length > 0) {
      setSelectedStationId(activeCorridor.stations[0].id);
    }
  }, [activeCorridor, selectedStationId]);

  // Compute live station telemetry
  const computedStations = useMemo(() => {
    if (!activeCorridor.stations || activeCorridor.stations.length === 0) return [];
    return activeCorridor.stations.map((stn) => {
      const forecast = forecastCommuterEgress({
        station: stn,
        decimalHour: timeOfDay,
        scenarios,
      });

      const gatesList = forecast.gateForecasts || forecast.gates || [];
      const highDeficitGate = gatesList.reduce((worst, g) => {
        return (g.deficit || 0) > (worst.deficit || 0) ? g : worst;
      }, gatesList[0] || { deficit: 0, gateName: 'Gate 1', currentSupply: 5, expectedCommuters: 20, lastMileSeekers: 20, waitTimeMinutes: 4.5 });

      const lmsi = calculateLMSI(
        highDeficitGate.lastMileSeekers || highDeficitGate.expectedCommuters || 25,
        highDeficitGate.currentSupply || 8,
        highDeficitGate.waitTimeMinutes || 5.0
      );

      const rebalancingPlan = generateRebalancingPlan(
        stn,
        highDeficitGate,
        stn.stands || []
      );

      return {
        ...stn,
        forecast,
        highDeficitGate,
        lmsi,
        rebalancingPlan,
        trainCountdown: trainCountdowns[stn.id] || 120,
      };
    });
  }, [activeCorridor, timeOfDay, scenarios, trainCountdowns]);

  // Selected Station Object
  const currentStation = useMemo(() => {
    return (
      computedStations.find((s) => s.id === selectedStationId) ||
      computedStations[0] ||
      null
    );
  }, [computedStations, selectedStationId]);

  // Aggregate Corridor Telemetry
  const corridorTelemetry = useMemo(() => {
    if (computedStations.length === 0) {
      return {
        totalDemand: 0,
        totalDeficit: 0,
        avgWaitTime: 6.4,
        criticalStationsCount: 0,
        utilizationRate: 88.4,
        economics: { dailyRevenueUpliftPerVehicle: 420, fuelCostSavedDaily: 18500, deadKmSavedDaily: 2840, co2SavedKgDaily: 1420 },
      };
    }

    const totalDemand = computedStations.reduce((sum, s) => sum + (s.forecast.baseTrainEgress || s.forecast.totalExits || 0), 0);
    const totalDeficit = computedStations.reduce((sum, s) => sum + Math.max(0, s.highDeficitGate?.deficit || 0), 0);
    const avgWaitTime = computedStations.length > 0
      ? Number((computedStations.reduce((sum, s) => sum + (s.lmsi?.expectedWaitMinutes || s.highDeficitGate?.waitTimeMinutes || 5.0), 0) / computedStations.length).toFixed(1))
      : 6.4;
    const criticalStationsCount = computedStations.filter((s) => s.lmsi?.level === 'CRITICAL').length;
    
    const activeVehicles = 340;
    const utilizationRate = Math.min(96.5, Number((72 + (totalDemand / 60) * 2.2).toFixed(1)));
    const economics = calculateFleetEconomics({
      activeVehicles,
      deadMileageReductionPct: 0.34,
      avgRidesPerDayBaseline: 14,
      avgRidesPerDayOptimized: 16.4,
      farePerKm: 18,
    });

    return {
      totalDemand,
      totalDeficit,
      avgWaitTime,
      criticalStationsCount,
      utilizationRate,
      economics,
    };
  }, [computedStations]);

  // Action: Execute Auto-Dispatch
  const executeAutoDispatch = useCallback((stationId) => {
    const stn = computedStations.find((s) => s.id === (stationId || selectedStationId));
    if (!stn || !stn.highDeficitGate) return;

    soundFx.dispatchPing();

    const dispatchCount = Math.min(stn.highDeficitGate.deficit || 8, 12);
    const randomPlateNum = Math.floor(1000 + Math.random() * 9000);

    const newDispatch = {
      id: `disp-${Date.now()}`,
      plate: `MH-02-EV-${randomPlateNum}`,
      driverName: ['Sachin Kadam', 'Vinod Ghorpade', 'Arun Jadhav', 'Deepak Salvi'][Math.floor(Math.random() * 4)],
      rating: Number((4.75 + Math.random() * 0.24).toFixed(2)),
      batteryPct: Math.floor(65 + Math.random() * 32),
      vehicleType: 'EV Feeder Auto',
      fromStand: stn.rebalancingPlan?.donorStand?.name || 'Nearest Stand',
      toGate: stn.highDeficitGate.gateName,
      stationName: stn.name,
      timeAgo: 'Just now',
      status: 'Dispatched',
      createdAt: Date.now(),
      surgeFare: '₹30 flat ONDC',
    };

    setDispatchEvents((prev) => [newDispatch, ...prev.slice(0, 15)]);

    setActiveToast({
      title: 'Dynamic Rebalance Dispatched',
      message: `Rerouted ${dispatchCount} EV feeder vehicles to ${stn.highDeficitGate.gateName} at ${stn.name}. Expected wait capped under 5 min.`,
      type: 'success',
    });

    setTimeout(() => {
      setActiveToast(null);
    }, 4500);
  }, [computedStations, selectedStationId]);

  const toggleScenario = useCallback((key) => {
    soundFx.alertTone();
    setScenarios((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  return (
    <SimulationContext.Provider
      value={{
        theme,
        toggleTheme,
        activeAccountRole,
        setActiveAccountRole,
        currentAccount,
        ACCOUNTS,
        currentCorridorKey,
        setCurrentCorridorKey,
        activeCorridor,
        timeOfDay,
        setTimeOfDay,
        formattedTime,
        isPlaying,
        setIsPlaying,
        playSpeed,
        setPlaySpeed,
        scenarios,
        toggleScenario,
        computedStations,
        currentStation,
        selectedStationId,
        setSelectedStationId,
        corridorTelemetry,
        dispatchEvents,
        executeAutoDispatch,
        pingConcourseGate,
        mapFilters,
        toggleMapFilter,
        setMapType,
        mapViewBounds,
        setMapViewBounds,
        activeToast,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
}