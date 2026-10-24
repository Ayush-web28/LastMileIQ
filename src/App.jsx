import React, { useState, useEffect } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Sidebar from './components/bionis/Sidebar';
import DashboardMetrics from './components/bionis/DashboardMetrics';
import CommandCenterMap from './components/CommandCenterMap';
import PredictiveDispatchPanel from './components/PredictiveDispatchPanel';
import DriverDispatchQueue from './components/DriverDispatchQueue';
import FleetEconomicsCalculator from './components/FleetEconomicsCalculator';
import CityPlannerView from './components/CityPlannerView';
import TransitPolicyView from './components/TransitPolicyView';
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
  // Default based on account role: 'dispatch' for fleet, 'planner' for planner
  const [activeView, setActiveView] = useState('dispatch');
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Auto-sync view when account role changes
  useEffect(() => {
    if (activeAccountRole === 'fleet') {
      if (activeView === 'planner' || activeView === 'policy') {
        setActiveView('dispatch');
      }
    } else if (activeAccountRole === 'planner') {
      if (activeView === 'dispatch' || activeView === 'analytics') {
        setActiveView('planner');
      }
    }
  }, [activeAccountRole]);

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

      {/* Bionis-style Clean Sidebar (Role-Tailored Navigation, Corridor Selector, Accounts) */}
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
          
          {/* Tab: Live Dispatch (Fleet Operator - Scrollable, full-width spacious layout) */}
          {activeView === 'dispatch' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 scrollbar-thin animate-fade-in">
              <PredictiveDispatchPanel />
              <DriverDispatchQueue />
            </div>
          )}

          {/* Tab: Geospatial Map (Full-height Google Maps Command Center) */}
          {activeView === 'map' && (
            <div className="flex-1 flex flex-col min-h-0 p-3 sm:p-4 animate-fade-in overflow-hidden">
              <CommandCenterMap className="flex-1 h-full min-h-0" />
            </div>
          )}

          {/* Tab: Fleet Analytics (Fleet Operator - Includes Executive KPIs + ROI Calculator) */}
          {activeView === 'analytics' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 scrollbar-thin animate-fade-in">
              <DashboardMetrics />
              <FleetEconomicsCalculator />
            </div>
          )}

          {/* Tab: Municipal Planning (Transit Planner - MMRDA / BMC Transit Equity & Bottlenecks) */}
          {activeView === 'planner' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 scrollbar-thin animate-fade-in">
              <CityPlannerView />
            </div>
          )}

          {/* Tab: Feeder Curb Policy (Transit Planner - MMRDA Feeder Bay Allocation & Briefs) */}
          {activeView === 'policy' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 scrollbar-thin animate-fade-in">
              <TransitPolicyView />
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
