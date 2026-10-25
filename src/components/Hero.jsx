import React from 'react';
import HeroCanvas from './HeroCanvas';

export default function Hero({ onLaunchDashboard }) {
  return (
    <div className="relative min-h-[65vh] flex flex-col justify-center items-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-8 pb-12 bg-[#F4F5F7]">
      {/* Dynamic Transit Flow Canvas Background */}
      <HeroCanvas />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* Top Intelligence Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DFE2E7] border border-[#CED2DA] text-[#0E1015] text-xs font-mono tracking-wide mb-6">
          <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
          <span className="font-bold">MUMBAI PUBLIC TRANSIT OS</span>
          <span className="text-[#CED2DA]">•</span>
          <span className="text-[#475060]">6 METRO LINES & 3 LOCAL LINES</span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0E1015] max-w-3xl leading-[1.15]">
          Dynamic Last-Mile Dispatch for{' '}
          <span className="text-[#DC2626]">
            Mumbai Transit
          </span>
        </h1>

        {/* Concise Subtitle */}
        <p className="mt-4 text-base sm:text-lg text-[#475060] max-w-2xl font-normal leading-relaxed">
          Predicting commuter exit surges from Mumbai Metro and Western/Central/Harbour suburban local stations. Auto-dispatching EV rickshaws and BEST feeder minibuses to eliminate commuter wait times.
        </p>

        {/* Unified Telemetry Status Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-stretch justify-between border border-[#CED2DA] rounded-md bg-[#F4F5F7] divide-y sm:divide-y-0 sm:divide-x divide-[#CED2DA] w-full max-w-2xl text-left">
          <div className="p-3.5 flex-1">
            <div className="text-[10px] font-mono text-[#6B7280] uppercase">ACTIVE FLEETS</div>
            <div className="text-xl sm:text-2xl font-bold text-[#0E1015] mt-0.5">142 Fleets</div>
            <div className="text-[10px] text-[#2563EB] mt-0.5 font-mono">EV + BEST Minibuses</div>
          </div>

          <div className="p-3.5 flex-1">
            <div className="text-[10px] font-mono text-[#6B7280] uppercase">WAIT-TIME CUT</div>
            <div className="text-xl sm:text-2xl font-bold text-[#059669] mt-0.5">42%</div>
            <div className="text-[10px] text-[#475060] mt-0.5 font-mono">16.4m to 4.8m avg</div>
          </div>

          <div className="p-3.5 flex-1">
            <div className="text-[10px] font-mono text-[#6B7280] uppercase">DEAD-MILEAGE</div>
            <div className="text-xl sm:text-2xl font-bold text-[#D97706] mt-0.5">-34%</div>
            <div className="text-[10px] text-[#059669] mt-0.5 font-mono">+₹420 daily revenue</div>
          </div>
        </div>

        {/* Single Primary Action Button */}
        <div className="mt-8">
          <button
            onClick={onLaunchDashboard}
            className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-sm tracking-wide transition-colors cursor-pointer"
          >
            Launch Live Dispatch Console
          </button>
        </div>

      </div>
    </div>
  );
}
