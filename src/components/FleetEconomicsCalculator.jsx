import React, { useState, useMemo } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { calculateFleetEconomics } from '../services/mathModels';
import { 
  TrendingUp, 
  Fuel, 
  Sliders, 
  Download, 
  Sparkles
} from 'lucide-react';

export default function FleetEconomicsCalculator() {
  const { theme } = useSimulation();
  const [fleetSize, setFleetSize] = useState(120);
  const [dailyTrips, setDailyTrips] = useState(16);
  const [avgFare, setAvgFare] = useState(40); // Mumbai shared auto / feeder fare
  const [deadKmPercent, setDeadKmPercent] = useState(36);
  const [evRatio, setEvRatio] = useState(0.75); // 75% EV

  const economics = useMemo(() => {
    return calculateFleetEconomics({
      fleetSize,
      dailyTrips,
      avgFare,
      deadKmSavedPercent: deadKmPercent,
      evRatio,
    });
  }, [fleetSize, dailyTrips, avgFare, deadKmPercent, evRatio]);

  const formatLakhsCrores = (val) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(val / 100000).toFixed(2)} L`;
  };

  const handleExportCSV = () => {
    const csvContent = `data:text/csv;charset=utf-8,Parameter,Value\nFleet Size,${fleetSize} Vehicles\nDaily Trips/Vehicle,${dailyTrips}\nAverage Fare (INR),₹${avgFare}\nDead Mileage Reduction,${deadKmPercent}%\nEV Fleet Ratio,${Math.round(evRatio * 100)}%\nDaily Fuel Savings,₹${economics.dailyFuelSavings}\nDaily Revenue Uplift/Vehicle,+₹${economics.dailyRevenueUpliftPerVehicle}\nMonthly Fleet Revenue Uplift,${formatLakhsCrores(economics.monthlyFleetRevenueUplift)}\nAnnual Fleet Revenue Uplift,${formatLakhsCrores(economics.annualFleetRevenueUplift)}\nDaily Dead Mileage Saved,${economics.deadKmSavedDaily} km\nAnnual CO2 Abated,${economics.annualCo2Tonnes} Tonnes\n`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `LastMileIQ_Mumbai_Fleet_ROI_${fleetSize}_Vehicles.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`p-5 rounded-2xl border backdrop-blur-xl shadow-xl space-y-4 transition ${
      theme === 'dark'
        ? 'bg-[#111C38]/95 border-[#1E2F5B] text-slate-100 shadow-xl shadow-black/40'
        : 'bg-white border-slate-200 text-slate-900 shadow-md'
    }`}>
      
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b ${
        theme === 'dark' ? 'border-[#1E2F5B]' : 'border-slate-200'
      }`}>
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 font-bold uppercase">
            <Sparkles className="w-4 h-4" />
            <span>MUMBAI FLEET UNIT ECONOMICS</span>
          </div>
          <h3 className={`text-base sm:text-lg font-black mt-0.5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Dead-Mileage Reduction & Fleet ROI Calculator
          </h3>
        </div>

        <button
          onClick={handleExportCSV}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono font-semibold transition self-start sm:self-center ${
            theme === 'dark'
              ? 'bg-[#162347] hover:bg-[#1E2F5B] text-slate-200 border-[#1E2F5B]'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
          }`}
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Summary (CSV)</span>
        </button>
      </div>

      {/* Main Grid: Interactive Controls vs Projected Returns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Sliders (5 cols) */}
        <div className={`lg:col-span-5 space-y-3.5 p-4 rounded-xl border ${
          theme === 'dark' ? 'bg-[#0B132B]/80 border-[#1E2F5B]' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className={`text-xs font-mono uppercase font-bold flex items-center gap-1.5 ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}>
            <Sliders className="w-3.5 h-3.5 text-cyan-500" />
            <span>Operational Levers</span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>Active Fleet Size:</span>
              <strong className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>{fleetSize} Vehicles</strong>
            </div>
            <input
              type="range"
              min="20"
              max="500"
              step="10"
              value={fleetSize}
              onChange={(e) => setFleetSize(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>Daily Trips / Vehicle:</span>
              <strong className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>{dailyTrips} Trips</strong>
            </div>
            <input
              type="range"
              min="6"
              max="24"
              step="1"
              value={dailyTrips}
              onChange={(e) => setDailyTrips(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>Avg Fare (Pooling/Direct):</span>
              <strong className="text-amber-400 font-bold">₹{avgFare}</strong>
            </div>
            <input
              type="range"
              min="20"
              max="80"
              step="5"
              value={avgFare}
              onChange={(e) => setAvgFare(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>Dead Mileage Cut:</span>
              <strong className="text-amber-500">{deadKmPercent}%</strong>
            </div>
            <input
              type="range"
              min="15"
              max="50"
              step="1"
              value={deadKmPercent}
              onChange={(e) => setDeadKmPercent(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>
        </div>

        {/* Projected Returns (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className={`p-4 rounded-xl border ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-[#162347] to-[#0B132B] border-amber-500/40 shadow-lg'
                : 'bg-amber-50/70 border-amber-500/40 shadow-sm'
            }`}>
              <div className="text-[10px] font-mono text-amber-400 font-bold uppercase">ANNUAL REVENUE UPLIFT</div>
              <div className={`text-2xl sm:text-3xl font-black font-mono mt-1 ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                {formatLakhsCrores(economics.annualFleetRevenueUplift)}
              </div>
              <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                Monthly: <strong className="text-amber-400">{formatLakhsCrores(economics.monthlyFleetRevenueUplift)}</strong>
              </div>
            </div>

            <div className={`p-4 rounded-xl border ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-cyan-950/40 to-[#0B132B] border-cyan-500/40'
                : 'bg-cyan-50/70 border-cyan-500/40 shadow-sm'
            }`}>
              <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase">DAILY FUEL & POWER SAVINGS</div>
              <div className={`text-2xl sm:text-3xl font-black font-mono mt-1 ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                ₹{economics.dailyFuelSavings.toLocaleString('en-IN')}
              </div>
              <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                From <strong className="text-cyan-400">{economics.deadKmSavedDaily} km</strong> cruising cut daily
              </div>
            </div>
          </div>

          <div className={`p-3.5 rounded-xl border text-xs flex justify-between items-center ${
            theme === 'dark' ? 'bg-[#0B132B]/90 border-[#1E2F5B]' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className={`font-mono ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Per-Vehicle Daily Yield:
            </span>
            <span className="font-mono text-amber-400 font-black text-sm">
              +₹{economics.dailyRevenueUpliftPerVehicle} / day (+2.4 extra trips)
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}