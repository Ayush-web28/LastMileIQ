import React, { useState, useMemo } from 'react';
import { calculateFleetEconomics } from '../services/mathModels';
import { 
  TrendingUp, 
  DollarSign, 
  Sparkles, 
  Leaf, 
  Fuel, 
  Car, 
  Sliders, 
  Download, 
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

export default function FleetEconomicsCalculator() {
  const [fleetSize, setFleetSize] = useState(150);
  const [dailyTrips, setDailyTrips] = useState(14);
  const [avgFare, setAvgFare] = useState(55);
  const [deadKmPercent, setDeadKmPercent] = useState(34);
  const [evRatio, setEvRatio] = useState(0.70); // 70% EV

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
    link.setAttribute('download', `LastMileIQ_Fleet_ROI_Simulation_${fleetSize}_Vehicles.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800/90 backdrop-blur-xl shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>B2B FLEET TELEMETRY & UNIT ECONOMICS</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Dynamic Dispatch ROI & Dead-Mileage Calculator
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Model exact revenue gains, non-revenue dead-mileage reduction, and emissions abatement for auto syndicates and EV feeder fleets.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 text-xs font-mono font-medium transition self-start sm:self-center"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Business Case (CSV)</span>
        </button>
      </div>

      {/* Main Grid: Interactive Controls (Left) vs Projected Yields (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Sliders (5 cols) */}
        <div className="lg:col-span-5 space-y-5 p-5 rounded-xl bg-slate-950/70 border border-slate-800/80">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>Fleet Operational Parameters</span>
          </div>

          {/* Slider 1: Fleet Size */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Total Fleet Size:</span>
              <strong className="text-white font-bold">{fleetSize} Vehicles</strong>
            </div>
            <input
              type="range"
              min="20"
              max="500"
              step="10"
              value={fleetSize}
              onChange={(e) => setFleetSize(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>20 (Local Syndicate)</span>
              <span>500 (Regional Fleet)</span>
            </div>
          </div>

          {/* Slider 2: Daily Trips per Vehicle */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Daily Trips / Vehicle:</span>
              <strong className="text-white font-bold">{dailyTrips} Trips</strong>
            </div>
            <input
              type="range"
              min="6"
              max="24"
              step="1"
              value={dailyTrips}
              onChange={(e) => setDailyTrips(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>6 trips</span>
              <span>24 trips</span>
            </div>
          </div>

          {/* Slider 3: Average Last-Mile Fare */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Avg Last-Mile Fare:</span>
              <strong className="text-emerald-400 font-bold">₹{avgFare}</strong>
            </div>
            <input
              type="range"
              min="30"
              max="100"
              step="5"
              value={avgFare}
              onChange={(e) => setAvgFare(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>₹30 (Shared / Pooling)</span>
              <span>₹100 (Direct Shuttle)</span>
            </div>
          </div>

          {/* Slider 4: Dead Mileage Reduction */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Dead Mileage Elimination:</span>
              <strong className="text-amber-400 font-bold">{deadKmPercent}%</strong>
            </div>
            <input
              type="range"
              min="15"
              max="55"
              step="1"
              value={deadKmPercent}
              onChange={(e) => setDeadKmPercent(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>15%</span>
              <span>55% (Maximum Sync)</span>
            </div>
          </div>

          {/* Slider 5: EV Ratio */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Electric Vehicle (EV) Share:</span>
              <strong className="text-cyan-400 font-bold">{Math.round(evRatio * 100)}%</strong>
            </div>
            <input
              type="range"
              min="0.2"
              max="1.0"
              step="0.05"
              value={evRatio}
              onChange={(e) => setEvRatio(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>20% (Mixed CNG)</span>
              <span>100% (Pure EV Fleet)</span>
            </div>
          </div>

        </div>

        {/* Right Column: Projected Financial Yields & Environmental Returns (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          
          {/* Top Big Impact KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-950/60 to-slate-950 border border-emerald-500/40 shadow-xl">
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-1">
                <span>ANNUAL FLEET REVENUE UPLIFT</span>
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                {formatLakhsCrores(economics.annualFleetRevenueUplift)}
              </div>
              <div className="text-xs text-slate-300 mt-2">
                Monthly yield: <strong className="text-emerald-400">{formatLakhsCrores(economics.monthlyFleetRevenueUplift)}</strong> via zero-wait dispatch loops.
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-cyan-950/60 to-slate-950 border border-cyan-500/40 shadow-xl">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-1">
                <span>DAILY FUEL & ENERGY SAVINGS</span>
                <Fuel className="w-4 h-4" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                ₹{economics.dailyFuelSavings.toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-slate-300 mt-2">
                Saved from <strong className="text-cyan-400">{economics.deadKmSavedDaily} km</strong> of non-revenue uncoordinated cruising daily.
              </div>
            </div>

          </div>

          {/* Secondary Telemetry Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400">PER-VEHICLE UPLIFT</div>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
                +₹{economics.dailyRevenueUpliftPerVehicle} / day
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">+2.4 extra peak trips</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400">ANNUAL CO2 ABATED</div>
              <div className="text-xl font-bold font-mono text-cyan-400 mt-1">
                {economics.annualCo2Tonnes} Tonnes
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">ESG Audit Certified</div>
            </div>

            <div className="col-span-2 sm:col-span-1 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400">PAYBACK HORIZON</div>
              <div className="text-xl font-bold font-mono text-amber-400 mt-1">
                &lt; 2.5 Months
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Software SaaS ROI</div>
            </div>
          </div>

          {/* Comparative Benchmarking Table */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2.5 font-bold">
              Comparative Impact: Traditional vs LastMileIQ OS
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400">Non-revenue Dead Mileage:</span>
                <span className="font-mono">
                  <span className="text-rose-400 line-through mr-2">42% cruising</span>
                  <strong className="text-emerald-400">8% synchronized</strong>
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400">Commuter Station Wait Time:</span>
                <span className="font-mono">
                  <span className="text-rose-400 line-through mr-2">17.8 mins</span>
                  <strong className="text-emerald-400">5.4 mins avg</strong>
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-400">Driver Idle Standby Time:</span>
                <span className="font-mono">
                  <span className="text-rose-400 line-through mr-2">38 mins/shift</span>
                  <strong className="text-emerald-400">7 mins/shift</strong>
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
