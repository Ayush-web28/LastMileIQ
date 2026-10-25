import React from 'react';
import { useSimulation } from '../../context/SimulationContext';

export default function DashboardMetrics({ compact = false, className = '' }) {
  const { theme, corridorTelemetry } = useSimulation();

  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 ${className}`}>
      
      {/* Metric 1: Fleet Utilization */}
      <div className={`rounded-md border transition-colors flex flex-col justify-between ${
        compact ? 'p-2.5 sm:p-3 space-y-1' : 'p-3.5 sm:p-4 space-y-2'
      } ${
        theme === 'dark'
          ? 'bg-[#151820] border-[#2A2F3D]'
          : 'bg-[#F4F5F7] border-[#CED2DA]'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
            theme === 'dark' ? 'text-[#949AA8]' : 'text-[#6B7280]'
          }`}>
            Fleet Utilization
          </span>
          <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold border ${
            theme === 'dark'
              ? 'bg-[#2563EB]/15 text-[#60A5FA] border-[#2563EB]/30'
              : 'bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/30'
          }`}>
            +14.2%
          </span>
        </div>
        <div>
          <div className={`${compact ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'} font-bold font-mono tracking-tight ${
            theme === 'dark' ? 'text-[#F4F5F7]' : 'text-[#0E1015]'
          }`}>
            {corridorTelemetry.utilizationRate}%
          </div>
          {!compact && (
            <div className={`text-[11px] mt-1 ${theme === 'dark' ? 'text-[#949AA8]' : 'text-[#475060]'}`}>
              Optimized active vehicle rotation
            </div>
          )}
        </div>
      </div>

      {/* Metric 2: Avg Wait Time */}
      <div className={`rounded-md border transition-colors flex flex-col justify-between ${
        compact ? 'p-2.5 sm:p-3 space-y-1' : 'p-3.5 sm:p-4 space-y-2'
      } ${
        theme === 'dark'
          ? 'bg-[#151820] border-[#2A2F3D]'
          : 'bg-[#F4F5F7] border-[#CED2DA]'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
            theme === 'dark' ? 'text-[#949AA8]' : 'text-[#6B7280]'
          }`}>
            Avg Commuter Wait
          </span>
          <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold border ${
            theme === 'dark'
              ? 'bg-[#DC2626]/15 text-[#DC2626] border-[#DC2626]/30'
              : 'bg-[#DC2626]/10 text-[#DC2626] border-[#DC2626]/30'
          }`}>
            -74% Drop
          </span>
        </div>
        <div>
          <div className={`${compact ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'} font-bold font-mono text-[#DC2626] tracking-tight`}>
            {corridorTelemetry.avgWaitTime} min
          </div>
          {!compact && (
            <div className={`text-[11px] mt-1 ${theme === 'dark' ? 'text-[#949AA8]' : 'text-[#475060]'}`}>
              Down from 16.4 min uncoordinated baseline
            </div>
          )}
        </div>
      </div>

      {/* Metric 3: Dead Mileage Eliminated */}
      <div className={`rounded-md border transition-colors flex flex-col justify-between ${
        compact ? 'p-2.5 sm:p-3 space-y-1' : 'p-3.5 sm:p-4 space-y-2'
      } ${
        theme === 'dark'
          ? 'bg-[#151820] border-[#2A2F3D]'
          : 'bg-[#F4F5F7] border-[#CED2DA]'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
            theme === 'dark' ? 'text-[#949AA8]' : 'text-[#6B7280]'
          }`}>
            Dead-Mileage Cut
          </span>
          <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold border ${
            theme === 'dark'
              ? 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30'
              : 'bg-[#F59E0B]/10 text-[#D97706] border-[#F59E0B]/30'
          }`}>
            -34%
          </span>
        </div>
        <div>
          <div className={`${compact ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'} font-bold font-mono tracking-tight ${
            theme === 'dark' ? 'text-[#F59E0B]' : 'text-[#D97706]'
          }`}>
            {corridorTelemetry.economics.deadKmSavedDaily} km
          </div>
          {!compact && (
            <div className={`text-[11px] mt-1 ${theme === 'dark' ? 'text-[#949AA8]' : 'text-[#475060]'}`}>
              Non-revenue cruising eliminated daily
            </div>
          )}
        </div>
      </div>

      {/* Metric 4: Daily Revenue Uplift */}
      <div className={`rounded-md border transition-colors flex flex-col justify-between ${
        compact ? 'p-2.5 sm:p-3 space-y-1' : 'p-3.5 sm:p-4 space-y-2'
      } ${
        theme === 'dark'
          ? 'bg-[#151820] border-[#2A2F3D]'
          : 'bg-[#F4F5F7] border-[#CED2DA]'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
            theme === 'dark' ? 'text-[#949AA8]' : 'text-[#6B7280]'
          }`}>
            Revenue Uplift / Veh
          </span>
          <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold border ${
            theme === 'dark'
              ? 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30'
              : 'bg-[#10B981]/10 text-[#059669] border-[#10B981]/30'
          }`}>
            +2.4 Trips
          </span>
        </div>
        <div>
          <div className={`${compact ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'} font-bold font-mono tracking-tight ${
            theme === 'dark' ? 'text-[#10B981]' : 'text-[#059669]'
          }`}>
            +₹{corridorTelemetry.economics.dailyRevenueUpliftPerVehicle}
          </div>
          {!compact && (
            <div className={`text-[11px] mt-1 ${theme === 'dark' ? 'text-[#949AA8]' : 'text-[#475060]'}`}>
              Net daily gain per driver shift
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
