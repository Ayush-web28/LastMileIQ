import React, { useState, useMemo } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { calculateFleetEconomics } from '../services/mathModels';

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
    <div className={`p-5 rounded-lg border space-y-4 transition ${
      theme === 'dark'
        ? 'bg-[#11231B] border-[#1E3A2C] text-[#F3F7F4]'
        : 'bg-[#F3F7F4] border-[#D1DDD6] text-[#0B1612]'
    }`}>
      
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b ${
        theme === 'dark' ? 'border-[#1E3A2C]' : 'border-[#D1DDD6]'
      }`}>
        <div>
          <div className="text-xs font-mono text-[#3DB87E] font-bold uppercase">
            MUMBAI FLEET UNIT ECONOMICS
          </div>
          <h3 className={`text-base sm:text-lg font-bold mt-0.5 ${theme === 'dark' ? 'text-[#F3F7F4]' : 'text-[#0B1612]'}`}>
            Dead-Mileage Reduction & Fleet ROI Calculator
          </h3>
        </div>

        <button
          onClick={handleExportCSV}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-mono font-bold transition self-start sm:self-center ${
            theme === 'dark'
              ? 'bg-[#183327] hover:bg-[#1E3A2C] text-[#F3F7F4] border-[#1E3A2C]'
              : 'bg-[#E5EDE8] hover:bg-[#D1DDD6] text-[#0B1612] border-[#D1DDD6]'
          }`}
        >
          Export CSV
        </button>
      </div>

      {/* Main Grid: Interactive Controls vs Projected Returns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Sliders (5 cols) */}
        <div className={`lg:col-span-5 space-y-3.5 p-4 rounded-md border ${
          theme === 'dark' ? 'bg-[#0B1612] border-[#1E3A2C]' : 'bg-[#E5EDE8] border-[#D1DDD6]'
        }`}>
          <div className={`text-xs font-mono uppercase font-bold ${
            theme === 'dark' ? 'text-[#6E8277]' : 'text-[#6E8277]'
          }`}>
            Operational Levers
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className={theme === 'dark' ? 'text-[#A0B0A6]' : 'text-[#2D483A]'}>Active Fleet Size:</span>
              <strong className={theme === 'dark' ? 'text-[#F3F7F4]' : 'text-[#0B1612]'}>{fleetSize} Vehicles</strong>
            </div>
            <input
              type="range"
              min="20"
              max="500"
              step="10"
              value={fleetSize}
              onChange={(e) => setFleetSize(parseInt(e.target.value))}
              className="w-full h-1.5 bg-[#183327] rounded-md appearance-none cursor-pointer accent-[#3DB87E]"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className={theme === 'dark' ? 'text-[#A0B0A6]' : 'text-[#2D483A]'}>Daily Trips / Vehicle:</span>
              <strong className={theme === 'dark' ? 'text-[#F3F7F4]' : 'text-[#0B1612]'}>{dailyTrips} Trips</strong>
            </div>
            <input
              type="range"
              min="6"
              max="24"
              step="1"
              value={dailyTrips}
              onChange={(e) => setDailyTrips(parseInt(e.target.value))}
              className="w-full h-1.5 bg-[#183327] rounded-md appearance-none cursor-pointer accent-[#3DB87E]"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className={theme === 'dark' ? 'text-[#A0B0A6]' : 'text-[#2D483A]'}>Avg Fare (Pooling/Direct):</span>
              <strong className="text-[#C4829E] font-bold">₹{avgFare}</strong>
            </div>
            <input
              type="range"
              min="20"
              max="80"
              step="5"
              value={avgFare}
              onChange={(e) => setAvgFare(parseInt(e.target.value))}
              className="w-full h-1.5 bg-[#183327] rounded-md appearance-none cursor-pointer accent-[#C4829E]"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className={theme === 'dark' ? 'text-[#A0B0A6]' : 'text-[#2D483A]'}>Dead Mileage Cut:</span>
              <strong className="text-[#3DB87E]">{deadKmPercent}%</strong>
            </div>
            <input
              type="range"
              min="15"
              max="50"
              step="1"
              value={deadKmPercent}
              onChange={(e) => setDeadKmPercent(parseInt(e.target.value))}
              className="w-full h-1.5 bg-[#183327] rounded-md appearance-none cursor-pointer accent-[#3DB87E]"
            />
          </div>
        </div>

        {/* Projected Returns (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className={`p-4 rounded-md border ${
              theme === 'dark'
                ? 'bg-[#183327] border-[#3DB87E]/30'
                : 'bg-[#E5EDE8] border-[#3DB87E]/40'
            }`}>
              <div className="text-[10px] font-mono text-[#3DB87E] font-bold uppercase">ANNUAL REVENUE UPLIFT</div>
              <div className={`text-2xl sm:text-3xl font-bold font-mono mt-1 ${
                theme === 'dark' ? 'text-[#F3F7F4]' : 'text-[#0B1612]'
              }`}>
                {formatLakhsCrores(economics.annualFleetRevenueUplift)}
              </div>
              <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-[#A0B0A6]' : 'text-[#6E8277]'}`}>
                Monthly: <strong className="text-[#3DB87E]">{formatLakhsCrores(economics.monthlyFleetRevenueUplift)}</strong>
              </div>
            </div>

            <div className={`p-4 rounded-md border ${
              theme === 'dark'
                ? 'bg-[#183327] border-[#C4829E]/30'
                : 'bg-[#E5EDE8] border-[#C4829E]/40'
            }`}>
              <div className="text-[10px] font-mono text-[#C4829E] font-bold uppercase">DAILY FUEL & POWER SAVINGS</div>
              <div className={`text-2xl sm:text-3xl font-bold font-mono mt-1 ${
                theme === 'dark' ? 'text-[#F3F7F4]' : 'text-[#0B1612]'
              }`}>
                ₹{economics.dailyFuelSavings.toLocaleString('en-IN')}
              </div>
              <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-[#A0B0A6]' : 'text-[#6E8277]'}`}>
                From <strong className="text-[#C4829E]">{economics.deadKmSavedDaily} km</strong> cruising cut daily
              </div>
            </div>
          </div>

          <div className={`p-3.5 rounded-md border text-xs flex justify-between items-center ${
            theme === 'dark' ? 'bg-[#0B1612] border-[#1E3A2C]' : 'bg-[#E5EDE8] border-[#D1DDD6]'
          }`}>
            <span className={`font-mono ${theme === 'dark' ? 'text-[#A0B0A6]' : 'text-[#6E8277]'}`}>
              Per-Vehicle Daily Yield:
            </span>
            <span className="font-mono text-[#3DB87E] font-bold text-sm">
              +₹{economics.dailyRevenueUpliftPerVehicle} / day (+2.4 extra trips)
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
