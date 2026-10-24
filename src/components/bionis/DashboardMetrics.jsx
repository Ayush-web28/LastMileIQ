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
  const { corridorTelemetry } = useSimulation();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      
      {/* Metric 1: Fleet Utilization */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md hover:border-slate-700 transition flex flex-col justify-between space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
            Fleet Utilization
          </span>
          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
            <ArrowUpRight className="w-3 h-3" /> +14.2%
          </span>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
            {corridorTelemetry.utilizationRate}%
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Optimized active vehicle rotation
          </div>
        </div>
      </div>

      {/* Metric 2: Avg Wait Time */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md hover:border-slate-700 transition flex flex-col justify-between space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
            Avg Commuter Wait
          </span>
          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
            <ArrowDownRight className="w-3 h-3" /> -74% Drop
          </span>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-amber-400 tracking-tight">
            {corridorTelemetry.avgWaitTime} min
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Down from 16.4 min uncoordinated baseline
          </div>
        </div>
      </div>

      {/* Metric 3: Dead Mileage Eliminated */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md hover:border-slate-700 transition flex flex-col justify-between space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
            Dead-Mileage Cut
          </span>
          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[10px] font-mono font-bold">
            <ArrowDownRight className="w-3 h-3" /> -34%
          </span>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-400 tracking-tight">
            {corridorTelemetry.economics.deadKmSavedDaily} km
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Non-revenue cruising eliminated daily
          </div>
        </div>
      </div>

      {/* Metric 4: Daily Revenue Uplift */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md hover:border-slate-700 transition flex flex-col justify-between space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
            Revenue Uplift / Veh
          </span>
          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
            <ArrowUpRight className="w-3 h-3" /> +2.4 Trips
          </span>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 tracking-tight">
            +₹{corridorTelemetry.economics.dailyRevenueUpliftPerVehicle}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Net daily gain per driver shift
          </div>
        </div>
      </div>

    </div>
  );
}
