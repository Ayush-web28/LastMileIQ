import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { 
  TrendingUp, 
  Clock, 
  Sparkles, 
  Car, 
  ArrowUpRight, 
  ArrowDownRight 
} from 'lucide-react';

export default function DashboardMetrics() {
  const { theme, corridorTelemetry } = useSimulation();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      
      {/* Metric 1: Fleet Utilization */}
      <div className={`p-4 sm:p-5 rounded-2xl border backdrop-blur-md transition flex flex-col justify-between space-y-2 ${
        theme === 'dark'
          ? 'bg-slate-900/70 border-slate-800/80 hover:border-slate-700'
          : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Fleet Utilization
          </span>
          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 text-[10px] font-mono font-bold">
            <ArrowUpRight className="w-3 h-3" /> +14.2%
          </span>
        </div>
        <div>
          <div className={`text-2xl sm:text-3xl font-black font-mono tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            {corridorTelemetry.utilizationRate}%
          </div>
          <div className={`text-[11px] mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            Optimized active vehicle rotation
          </div>
        </div>
      </div>

      {/* Metric 2: Avg Wait Time */}
      <div className={`p-4 sm:p-5 rounded-2xl border backdrop-blur-md transition flex flex-col justify-between space-y-2 ${
        theme === 'dark'
          ? 'bg-slate-900/70 border-slate-800/80 hover:border-slate-700'
          : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Avg Commuter Wait
          </span>
          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 text-[10px] font-mono font-bold">
            <ArrowDownRight className="w-3 h-3" /> -74% Drop
          </span>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-amber-500 tracking-tight">
            {corridorTelemetry.avgWaitTime} min
          </div>
          <div className={`text-[11px] mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            Down from 16.4 min uncoordinated baseline
          </div>
        </div>
      </div>

      {/* Metric 3: Dead Mileage Eliminated */}
      <div className={`p-4 sm:p-5 rounded-2xl border backdrop-blur-md transition flex flex-col justify-between space-y-2 ${
        theme === 'dark'
          ? 'bg-slate-900/70 border-slate-800/80 hover:border-slate-700'
          : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Dead-Mileage Cut
          </span>
          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500 border border-cyan-500/30 text-[10px] font-mono font-bold">
            <ArrowDownRight className="w-3 h-3" /> -34%
          </span>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-500 tracking-tight">
            {corridorTelemetry.economics.deadKmSavedDaily} km
          </div>
          <div className={`text-[11px] mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            Non-revenue cruising eliminated daily
          </div>
        </div>
      </div>

      {/* Metric 4: Daily Revenue Uplift */}
      <div className={`p-4 sm:p-5 rounded-2xl border backdrop-blur-md transition flex flex-col justify-between space-y-2 ${
        theme === 'dark'
          ? 'bg-slate-900/70 border-slate-800/80 hover:border-slate-700'
          : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Revenue Uplift / Veh
          </span>
          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 text-[10px] font-mono font-bold">
            <ArrowUpRight className="w-3 h-3" /> +2.4 Trips
          </span>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-500 tracking-tight">
            +₹{corridorTelemetry.economics.dailyRevenueUpliftPerVehicle}
          </div>
          <div className={`text-[11px] mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            Net daily gain per driver shift
          </div>
        </div>
      </div>

    </div>
  );
}