import React from 'react';
import { useSimulation } from '../../context/SimulationContext';

export default function DashboardMetrics({ compact = false, className = '' }) {
  const { theme, corridorTelemetry } = useSimulation();

  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 ${className}`}>
      
      {/* Metric 1: Fleet Utilization */}
      <div className={`rounded-lg border transition-colors flex flex-col justify-between ${
        compact ? 'p-2.5 sm:p-3 space-y-1' : 'p-3.5 sm:p-4 space-y-2'
      } ${
        theme === 'dark'
          ? 'bg-[#11231B] border-[#1E3A2C]'
          : 'bg-[#F3F7F4] border-[#D1E0D6]'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Fleet Utilization
          </span>
          <span className="px-1.5 py-0.2 rounded bg-[#3DB87E]/10 text-[#3DB87E] border border-[#3DB87E]/30 text-[9px] font-mono font-bold">
            +14.2%
          </span>
        </div>
        <div>
          <div className={`${compact ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'} font-black font-mono tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            {corridorTelemetry.utilizationRate}%
          </div>
          {!compact && (
            <div className={`text-[11px] mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              Optimized active vehicle rotation
            </div>
          )}
        </div>
      </div>

      {/* Metric 2: Avg Wait Time */}
      <div className={`rounded-lg border transition-colors flex flex-col justify-between ${
        compact ? 'p-2.5 sm:p-3 space-y-1' : 'p-3.5 sm:p-4 space-y-2'
      } ${
        theme === 'dark'
          ? 'bg-[#11231B] border-[#1E3A2C]'
          : 'bg-[#F3F7F4] border-[#D1E0D6]'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Avg Commuter Wait
          </span>
          <span className="px-1.5 py-0.2 rounded bg-[#C4829E]/15 text-[#C4829E] border border-[#C4829E]/30 text-[9px] font-mono font-bold">
            -74% Drop
          </span>
        </div>
        <div>
          <div className={`${compact ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'} font-black font-mono text-[#C4829E] tracking-tight`}>
            {corridorTelemetry.avgWaitTime} min
          </div>
          {!compact && (
            <div className={`text-[11px] mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              Down from 16.4 min uncoordinated baseline
            </div>
          )}
        </div>
      </div>

      {/* Metric 3: Dead Mileage Eliminated */}
      <div className={`rounded-lg border transition-colors flex flex-col justify-between ${
        compact ? 'p-2.5 sm:p-3 space-y-1' : 'p-3.5 sm:p-4 space-y-2'
      } ${
        theme === 'dark'
          ? 'bg-[#11231B] border-[#1E3A2C]'
          : 'bg-[#F3F7F4] border-[#D1E0D6]'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Dead-Mileage Cut
          </span>
          <span className="px-1.5 py-0.2 rounded bg-[#3DB87E]/10 text-[#3DB87E] border border-[#3DB87E]/30 text-[9px] font-mono font-bold">
            -34%
          </span>
        </div>
        <div>
          <div className={`${compact ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'} font-black font-mono text-[#3DB87E] tracking-tight`}>
            {corridorTelemetry.economics.deadKmSavedDaily} km
          </div>
          {!compact && (
            <div className={`text-[11px] mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              Non-revenue cruising eliminated daily
            </div>
          )}
        </div>
      </div>

      {/* Metric 4: Daily Revenue Uplift */}
      <div className={`rounded-lg border transition-colors flex flex-col justify-between ${
        compact ? 'p-2.5 sm:p-3 space-y-1' : 'p-3.5 sm:p-4 space-y-2'
      } ${
        theme === 'dark'
          ? 'bg-[#11231B] border-[#1E3A2C]'
          : 'bg-[#F3F7F4] border-[#D1E0D6]'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Revenue Uplift / Veh
          </span>
          <span className="px-1.5 py-0.2 rounded bg-[#3DB87E]/10 text-[#3DB87E] border border-[#3DB87E]/30 text-[9px] font-mono font-bold">
            +2.4 Trips
          </span>
        </div>
        <div>
          <div className={`${compact ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'} font-black font-mono text-[#3DB87E] tracking-tight`}>
            +₹{corridorTelemetry.economics.dailyRevenueUpliftPerVehicle}
          </div>
          {!compact && (
            <div className={`text-[11px] mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              Net daily gain per driver shift
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
