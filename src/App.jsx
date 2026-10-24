import React, { useState } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Sidebar from './components/bionis/Sidebar';
import DashboardMetrics from './components/bionis/DashboardMetrics';
import CommandCenterMap from './components/CommandCenterMap';
import PredictiveDispatchPanel from './components/PredictiveDispatchPanel';
import DriverDispatchQueue from './components/DriverDispatchQueue';
import FleetEconomicsCalculator from './components/FleetEconomicsCalculator';
import CityPlannerView from './components/CityPlannerView';
import { SimulationProvider, useSimulation } from './context/SimulationContext';
import { CORRIDORS } from './data/corridors';
import { CheckCircle2 } from 'lucide-react';

function DashboardLayout() {
  const { 
    theme,
    activeAccountRole, 
    activeToast,
  } = useSimulation();

  // Tab View Switcher (Controlled exclusively via Sidebar Navigation)
  const [activeView, setActiveView] = useState('dispatch'); // 'dispatch' | 'map' | 'analytics' | 'planner'
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`h-screen flex font-sans overflow-hidden select-none transition-colors duration-200 ${
      theme === 'dark' 
        ? 'bg-[#080C14] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-300' 
        : 'bg-slate-100 text-slate-900 selection:bg-emerald-500/20 selection:text-emerald-700'
    }`}>
      
      {/* Toast Alert Feedback */}
      {activeToast && (
        <div className={`fixed bottom-6 right-6 z-50 max-w-sm p-3.5 rounded-2xl border shadow-2xl animate-in slide-in-from-bottom-5 ${
          theme === 'dark' 
            ? 'bg-slate-900/95 border-emerald-500/60 text-white' 
            : 'bg-white border-emerald-500/60 text-slate-900 shadow-emerald-500/10'
        }`}>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-black">{activeToast.title}</div>
              <div className={`text-[11px] mt-0.5 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                {activeToast.message}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bionis-style Clean Sidebar (Primary Navigation, Active Line Selector, 2 Accounts) */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        corridors={CORRIDORS}
      />

      {/* Main Viewport Container (Zero redundant top bars) */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden">
        
        {/* Main Tab Canvas */}
        <main className="flex-1 overflow-hidden flex flex-col min-h-0">
          
          {/* Tab 1: Live Dispatch (Scrollable, full-width spacious layout) */}
          {activeView === 'dispatch' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 scrollbar-thin animate-fade-in">
              {/* Actionable Predictive Dispatch Panel */}
              <PredictiveDispatchPanel />

              {/* Active Driver Dispatch Queue (Full-width multi-column grid) */}
              <DriverDispatchQueue />
            </div>
          )}

          {/* Tab 2: Geospatial Map (Full-height Google Maps Command Center) */}
          {activeView === 'map' && (
            <div className="flex-1 flex flex-col min-h-0 p-3 sm:p-4 animate-fade-in overflow-hidden">
              <CommandCenterMap className="flex-1 h-full min-h-0" />
            </div>
          )}

          {/* Tab 3: Fleet Analytics (Includes Executive KPIs + ROI Calculator) */}
          {activeView === 'analytics' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 scrollbar-thin animate-fade-in">
              {/* Executive KPI Metric Cards (Moved here from dispatch per request) */}
              <DashboardMetrics />

              {/* Fleet ROI & Unit Economics Calculator */}
              <FleetEconomicsCalculator />
            </div>
          )}

          {/* Tab 4: City Planning (MMRDA / BMC Transit Equity & Chokepoints) */}
          {activeView === 'planner' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 scrollbar-thin animate-fade-in">
              <CityPlannerView />
            </div>
          )}

        </main>

        {/* Minimal Clean Single-Line Footer */}
        <footer className={`border-t py-2 px-6 text-[11px] font-mono shrink-0 flex flex-col sm:flex-row items-center justify-between gap-1.5 transition-colors ${
          theme === 'dark' 
            ? 'border-slate-800/80 bg-[#0B0F19] text-slate-500' 
            : 'border-slate-200 bg-white text-slate-600'
        }`}>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className={`font-bold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-800'}`}>
              LastMileIQ Mumbai Transit Dispatch OS
            </span>
            <span className="text-slate-600">|</span>
            <span>6 Metro Lines + 3 Suburban Local Lines</span>
          </div>
          <div className="text-emerald-500 font-bold">
            Google Maps Engine • Zero API Key Required
          </div>
        </footer>

      </div>

    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <SimulationProvider>
        <DashboardLayout />
      </SimulationProvider>
    </ErrorBoundary>
  );
}
