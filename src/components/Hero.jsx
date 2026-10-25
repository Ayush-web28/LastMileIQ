import React from 'react';
import HeroCanvas from './HeroCanvas';
import { 
  Zap, 
  ArrowRight, 
  Sparkles
} from 'lucide-react';

export default function Hero({ onLaunchDashboard }) {
  return (
    <div className="relative min-h-[65vh] flex flex-col justify-center items-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-8 pb-12">
      {/* Dynamic Transit Flow Canvas Background */}
      <HeroCanvas />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* Top Intelligence Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#11231B] border border-[#1E3A2C] text-[#3DB87E] text-xs font-mono tracking-wide mb-6 backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-[#3DB87E] animate-ping" />
          <span>MUMBAI PUBLIC TRANSIT OS</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-300">6 METRO LINES & 3 LOCAL LINES</span>
        </div>

        {/* Primary Cinematic Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-3xl leading-[1.15]">
          Dynamic Last-Mile Dispatch for{' '}
          <span className="bg-gradient-to-r from-[#3DB87E] via-[#4EBA86] to-[#C4829E] bg-clip-text text-transparent">
            Mumbai Transit
          </span>
        </h1>

        {/* Concise Subtitle */}
        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
          Predicting commuter exit surges from Mumbai Metro and Western/Central/Harbour suburban local stations. Auto-dispatching EV rickshaws and BEST feeder minibuses to eliminate commuter wait times.
        </p>

        {/* 3 Core Pulse Stats */}
        <div className="mt-8 grid grid-cols-3 gap-3 w-full max-w-2xl">
          <div className="p-3.5 rounded-xl bg-[#11231B] border border-[#1E3A2C] backdrop-blur-md text-left">
            <div className="text-[10px] font-mono text-slate-400 uppercase">ACTIVE FLEETS</div>
            <div className="text-xl sm:text-2xl font-black text-white mt-0.5">142 Fleets</div>
            <div className="text-[10px] text-[#3DB87E] mt-0.5 font-mono">EV + BEST Minibuses</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#11231B] border border-[#1E3A2C] backdrop-blur-md text-left">
            <div className="text-[10px] font-mono text-slate-400 uppercase">WAIT-TIME CUT</div>
            <div className="text-xl sm:text-2xl font-black text-[#C4829E] mt-0.5">42%</div>
            <div className="text-[10px] text-slate-400 mt-0.5 font-mono">16.4m &rarr; 4.8m avg</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#11231B] border border-[#1E3A2C] backdrop-blur-md text-left">
            <div className="text-[10px] font-mono text-slate-400 uppercase">DEAD-MILEAGE</div>
            <div className="text-xl sm:text-2xl font-black text-[#3DB87E] mt-0.5">-34%</div>
            <div className="text-[10px] text-[#3DB87E] mt-0.5 font-mono">+₹420 daily revenue</div>
          </div>
        </div>

        {/* Single Primary Action Button */}
        <div className="mt-8">
          <button
            onClick={onLaunchDashboard}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#3DB87E] to-[#34A074] hover:from-[#4EBA86] hover:to-[#3DB87E] text-[#0B1612] font-black text-sm tracking-wide shadow-lg shadow-[#3DB87E]/25 transition active:scale-95 cursor-pointer"
          >
            <Zap className="w-4 h-4 fill-[#0B1612]" />
            <span>Launch Live Dispatch Console</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
