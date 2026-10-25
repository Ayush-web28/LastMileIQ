import React, { useState, useMemo } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { calculateFleetEconomics } from '../services/mathModels';

export default function FleetEconomicsCalculator() {
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
    <div className="p-5 rounded-md border border-[#CED2DA] bg-[#F4F5F7] text-[#0E1015] space-y-4 transition">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#CED2DA]">
        <div>
          <div className="text-xs font-mono text-[#2563EB] font-bold uppercase">
            MUMBAI FLEET UNIT ECONOMICS
          </div>
          <h3 className="text-base sm:text-lg font-bold mt-0.5 text-[#0E1015]">
            Dead-Mileage Reduction & Fleet ROI Calculator
          </h3>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#CED2DA] bg-[#DFE2E7] hover:bg-[#CED2DA] text-[#0E1015] text-xs font-mono font-bold transition self-start sm:self-center cursor-pointer"
        >
          Export CSV
        </button>
      </div>

      {/* Main Grid: Interactive Controls vs Projected Returns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Sliders (5 cols) */}
        <div className="lg:col-span-5 space-y-3.5 p-4 rounded-md border border-[#CED2DA] bg-[#EBECEF]">
          <div className="text-xs font-mono uppercase font-bold text-[#6B7280]">
            Operational Levers
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#475060]">Active Fleet Size:</span>
              <strong className="text-[#0E1015]">{fleetSize} Vehicles</strong>
            </div>
            <input
              type="range"
              min="20"
              max="500"
              step="10"
              value={fleetSize}
              onChange={(e) => setFleetSize(parseInt(e.target.value))}
              className="w-full h-1.5 bg-[#CED2DA] rounded-md appearance-none cursor-pointer accent-[#2563EB]"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#475060]">Daily Trips / Vehicle:</span>
              <strong className="text-[#0E1015]">{dailyTrips} Trips</strong>
            </div>
            <input
              type="range"
              min="6"
              max="24"
              step="1"
              value={dailyTrips}
              onChange={(e) => setDailyTrips(parseInt(e.target.value))}
              className="w-full h-1.5 bg-[#CED2DA] rounded-md appearance-none cursor-pointer accent-[#2563EB]"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#475060]">Avg Fare (Pooling/Direct):</span>
              <strong className="text-[#0E1015] font-bold">₹{avgFare}</strong>
            </div>
            <input
              type="range"
              min="20"
              max="80"
              step="5"
              value={avgFare}
              onChange={(e) => setAvgFare(parseInt(e.target.value))}
              className="w-full h-1.5 bg-[#CED2DA] rounded-md appearance-none cursor-pointer accent-[#2563EB]"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#475060]">Dead Mileage Cut:</span>
              <strong className="text-[#059669] font-bold">{deadKmPercent}%</strong>
            </div>
            <input
              type="range"
              min="15"
              max="50"
              step="1"
              value={deadKmPercent}
              onChange={(e) => setDeadKmPercent(parseInt(e.target.value))}
              className="w-full h-1.5 bg-[#CED2DA] rounded-md appearance-none cursor-pointer accent-[#2563EB]"
            />
          </div>
        </div>

        {/* Projected Returns (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-md border border-[#059669]/40 bg-[#EBECEF]">
              <div className="text-[10px] font-mono text-[#059669] font-bold uppercase">ANNUAL REVENUE UPLIFT</div>
              <div className="text-2xl sm:text-3xl font-bold font-mono mt-1 text-[#0E1015]">
                {formatLakhsCrores(economics.annualFleetRevenueUplift)}
              </div>
              <div className="text-xs mt-1 text-[#475060]">
                Monthly: <strong className="text-[#059669] font-bold">{formatLakhsCrores(economics.monthlyFleetRevenueUplift)}</strong>
              </div>
            </div>

            <div className="p-4 rounded-md border border-[#2563EB]/40 bg-[#EBECEF]">
              <div className="text-[10px] font-mono text-[#2563EB] font-bold uppercase">DAILY FUEL & POWER SAVINGS</div>
              <div className="text-2xl sm:text-3xl font-bold font-mono mt-1 text-[#0E1015]">
                ₹{economics.dailyFuelSavings.toLocaleString('en-IN')}
              </div>
              <div className="text-xs mt-1 text-[#475060]">
                From <strong className="text-[#2563EB]">{economics.deadKmSavedDaily} km</strong> cruising cut daily
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-md border border-[#CED2DA] bg-[#EBECEF] text-xs flex justify-between items-center">
            <span className="font-mono text-[#475060]">
              Per-Vehicle Daily Yield:
            </span>
            <span className="font-mono font-bold text-sm text-[#059669]">
              +₹{economics.dailyRevenueUpliftPerVehicle} / day (+2.4 extra trips)
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
