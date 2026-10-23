import React from 'react';
import HeroCanvas from './HeroCanvas';
import { 
  Zap, 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Compass, 
  MapPin, 
  Cpu, 
  CheckCircle2, 
  Sparkles,
  BarChart2,
  Car,
  Layers
} from 'lucide-react';

export default function Hero({ 
  onLaunchDashboard, 
  currentCorridor, 
  setCorridor, 
  corridors,
  onSelectMode 
}) {
  const activeCorridor = corridors[currentCorridor] || corridors['bengaluru-purple'];

  return (
    <div className="relative min-h-[92vh] flex flex-col justify-center items-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-12 pb-20">
      {/* Dynamic Transit Flow Canvas Background */}
      <HeroCanvas />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto text-center flex flex-col items-center">
        
        {/* Top Intelligence Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/40 text-emerald-400 text-xs font-mono tracking-wide shadow-lg shadow-emerald-500/10 mb-8 backdrop-blur-md animate-fade-in">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span>REAL-TIME CORRIDOR TELEMETRY ACTIVE</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">BENGALURU PURPLE LINE & HYDERABAD HITEC BLUE LINE</span>
        </div>

        {/* Primary Cinematic Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl leading-[1.1] sm:leading-[1.1]">
          The Operating System for{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            India's Last-Mile
          </span>{' '}
          Mobility.
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed font-normal">
          Tackling the 1–5 km transit crisis in Indian metro corridors. LastMileIQ syncs private auto syndicates, EV feeder fleets, and municipal minibuses with incoming commuter exit surges — eliminating vehicle idle time and non-revenue dead mileage.
        </p>

        {/* Real-time Pulse Stats Strip */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-md text-left transition hover:border-emerald-500/30">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
              <span>ACTIVE FLEETS</span>
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">142</div>
            <div className="text-[11px] text-emerald-400 mt-0.5 flex items-center gap-1 font-mono">
              <CheckCircle2 className="w-3 h-3" /> Auto + EV + Minibuses
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-md text-left transition hover:border-cyan-500/30">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
              <span>PREDICTED COMMUTERS</span>
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">3.2M</div>
            <div className="text-[11px] text-cyan-400 mt-0.5 font-mono">
              Spatio-Temporal Egress
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-md text-left transition hover:border-amber-500/30">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
              <span>WAIT-TIME REDUCTION</span>
              <Clock className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">42%</div>
            <div className="text-[11px] text-amber-400 mt-0.5 font-mono">
              17.8m &rarr; 6.4m avg
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-md text-left transition hover:border-emerald-500/30">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
              <span>DEAD-MILEAGE CUT</span>
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">-34%</div>
            <div className="text-[11px] text-emerald-400 mt-0.5 font-mono">
              +₹420 daily revenue/vehicle
            </div>
          </div>
        </div>

        {/* Quick Corridor Selector Pills */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Select Live Corridor:
          </span>
          <div className="flex flex-wrap gap-2 justify-center">
            {Object.entries(corridors).map(([key, item]) => {
              const isActive = currentCorridor === key;
              return (
                <button
                  key={key}
                  onClick={() => setCorridor(key)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/10'
                      : 'bg-slate-900/70 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <MapPin className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <span>{item.name}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={onLaunchDashboard}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 text-slate-950 font-extrabold text-sm sm:text-base transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Zap className="w-5 h-5 text-slate-950 fill-slate-950" />
            <span>Launch Live Dispatch Command Center</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => {
              onSelectMode('planner');
              onLaunchDashboard();
            }}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/80 border border-slate-700/80 hover:border-cyan-500/50 hover:bg-slate-800/80 text-slate-200 font-semibold text-sm transition-all duration-200"
          >
            <BarChart2 className="w-4 h-4 text-cyan-400" />
            <span>View City Planner Heatmaps</span>
          </button>

          <button
            onClick={() => {
              onSelectMode('commuter');
              onLaunchDashboard();
            }}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/80 border border-slate-700/80 hover:border-amber-500/50 hover:bg-slate-800/80 text-slate-200 font-semibold text-sm transition-all duration-200"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span>ONDC Commuter View</span>
          </button>
        </div>

        {/* Value Proposition Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left w-full">
          
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950/90 border border-slate-800/80 backdrop-blur-xl hover:border-emerald-500/30 transition group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Spatio-Temporal Egress Forecast
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Predicts passenger exit volume per station gate 4–8 minutes before train arrival using Poisson arrival rate modeling, passenger train telemetry, and office-cluster shifts.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800/60 flex items-center text-xs font-mono text-emerald-400">
              <span>96.4% PREDICTION ACCURACY</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950/90 border border-slate-800/80 backdrop-blur-xl hover:border-amber-500/30 transition group">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Dynamic Feeder Rebalancing
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Detects vehicle deficits at metro exit gates in real-time and executes dynamic rebalancing orders to reposition idle EV rickshaws and campus feeder shuttles with minimal dead-km.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800/60 flex items-center text-xs font-mono text-amber-400">
              <span>&lt; 90 SEC REBALANCE DISPATCH</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950/90 border border-slate-800/80 backdrop-blur-xl hover:border-cyan-500/30 transition group">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              LMSI & Multi-Stakeholder Sync
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Calculates the Last-Mile Stress Index (LMSI) across all gates, syncing operational intelligence with ONDC commuter discovery, fleet telemetry, and B2G infrastructure planning.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800/60 flex items-center text-xs font-mono text-cyan-400">
              <span>OPEN MOBILITY COMPATIBLE</span>
            </div>
          </div>

        </div>

        {/* Live Operational Ticker */}
        <div className="mt-12 w-full max-w-4xl p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center gap-3 overflow-hidden text-xs font-mono">
          <div className="flex items-center gap-1.5 text-emerald-400 shrink-0 font-bold px-2 py-0.5 rounded bg-emerald-500/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            LIVE DISPATCH FEED
          </div>
          <div className="text-slate-400 truncate text-left">
            <span className="text-white font-semibold">Hoodi Gate 2:</span> Train arriving in 2m 15s • Deficit: 14 EVs • Rebalancing 8 Mahindra Treos from ITPL Stand • Wait time capping at 5.2m
          </div>
        </div>

      </div>
    </div>
  );
}
