import React from 'react';
import HeroCanvas from './HeroCanvas';
import { 
  Zap, 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  Sparkles,
  MapPin, 
  Building2,
  Smartphone
} from 'lucide-react';

export default function Hero({ 
  onLaunchDashboard, 
  currentCorridor, 
  setCorridor, 
  corridors,
  onSelectMode 
}) {
  const metroLines = Object.entries(corridors).filter(([_, item]) => item.category === 'metro');
  const localLines = Object.entries(corridors).filter(([_, item]) => item.category === 'local');

  return (
    <div className="relative min-h-[78vh] flex flex-col justify-center items-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-8 pb-14">
      {/* Dynamic Transit Flow Canvas Background */}
      <HeroCanvas />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Top Intelligence Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-wide mb-6 backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span>MUMBAI PUBLIC TRANSIT ACTIVE</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-300">6 METRO LINES & 3 SUBURBAN LOCAL LINES</span>
        </div>

        {/* Primary Cinematic Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.15]">
          Dynamic Last-Mile Dispatch for{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Mumbai Transit
          </span>
        </h1>

        {/* Concise Subtitle */}
        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
          Predicting commuter exit surges from Mumbai Metro and Western/Central/Harbour suburban local stations. Auto-dispatching EV rickshaws and BEST feeder minibuses to eliminate commuter wait times.
        </p>

        {/* 3 Core Pulse Stats */}
        <div className="mt-8 grid grid-cols-3 gap-3 w-full max-w-2xl">
          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md text-left">
            <div className="text-[10px] font-mono text-slate-400 uppercase">ACTIVE FLEETS</div>
            <div className="text-xl sm:text-2xl font-black text-white mt-0.5">142 Fleets</div>
            <div className="text-[10px] text-emerald-400 mt-0.5 font-mono">EV + BEST Minibuses</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md text-left">
            <div className="text-[10px] font-mono text-slate-400 uppercase">WAIT-TIME CUT</div>
            <div className="text-xl sm:text-2xl font-black text-amber-400 mt-0.5">42%</div>
            <div className="text-[10px] text-slate-400 mt-0.5 font-mono">16.4m &rarr; 4.8m avg</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md text-left">
            <div className="text-[10px] font-mono text-slate-400 uppercase">DEAD-MILEAGE</div>
            <div className="text-xl sm:text-2xl font-black text-cyan-400 mt-0.5">-34%</div>
            <div className="text-[10px] text-emerald-400 mt-0.5 font-mono">+₹420 daily revenue</div>
          </div>
        </div>

        {/* Quick Mumbai Corridor Selector Chips */}
        <div className="mt-8 w-full max-w-3xl space-y-3">
          
          {/* Metro Lines */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase mr-1">
              🚇 Metro:
            </span>
            {metroLines.map(([key, item]) => {
              const isActive = currentCorridor === key;
              return (
                <button
                  key={key}
                  onClick={() => setCorridor(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    isActive
                      ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-300 font-semibold shadow-sm'
                      : 'bg-slate-900/70 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {item.lineCode}: {item.shortName.replace(/Metro \w+: /, '')}
                </button>
              );
            })}
          </div>

          {/* Suburban Local Lines */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase mr-1">
              🚆 Local:
            </span>
            {localLines.map(([key, item]) => {
              const isActive = currentCorridor === key;
              return (
                <button
                  key={key}
                  onClick={() => setCorridor(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    isActive
                      ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-300 font-semibold shadow-sm'
                      : 'bg-slate-900/70 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {item.name.split(':')[0]}
                </button>
              );
            })}
          </div>

        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onLaunchDashboard}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-emerald-500/20 transition active:scale-95"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>Launch Live Dispatch Console</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              onSelectMode('planner');
              onLaunchDashboard();
            }}
            className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-slate-300 text-xs font-semibold transition"
          >
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>City Planner Heatmaps</span>
          </button>

          <button
            onClick={() => {
              onSelectMode('commuter');
              onLaunchDashboard();
            }}
            className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-500/50 text-slate-300 text-xs font-semibold transition"
          >
            <Smartphone className="w-3.5 h-3.5 text-amber-400" />
            <span>Commuter ONDC View</span>
          </button>
        </div>

      </div>
    </div>
  );
}
