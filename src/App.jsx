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
        ? 'bg-[#0B1612] text-[#F2F7F4] selection:bg-[#3DB87E]/30 selection:text-[#E8F8F0]' 
        : 'bg-[#F3F7F4] text-[#132A1C] selection:bg-[#3DB87E]/20 selection:text-[#132A1C]'
    }`}>
      
      {/* Toast Alert Feedback */}
      {activeToast && (
        <div className={`fixed bottom-6 right-6 z-50 max-w-sm p-3.5 rounded-2xl border shadow-2xl animate-in slide-in-from-bottom-5 ${
          theme === 'dark' 
            ? 'bg-[#11231B]/95 border-[#3DB87E]/50 text-white shadow-[#0B1612]/60' 
            : 'bg-white border-[#3DB87E]/50 text-slate-900 shadow-slate-300/40'
        }`}>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#3DB87E] shrink-0 mt-0.5" />
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
        
        {/* Main Tab Canvas (Filters and state persisted in SimulationContext across tab switches) */}
        <main className="flex-1 overflow-hidden flex flex-col min-h-0">
          
          {/* Tab: Live Dispatch (Fleet Operator - Scrollable, full-width spacious layout) */}
          {activeView === 'dispatch' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 scrollbar-thin animate-fade-in">
              <PredictiveDispatchPanel />
              <DriverDispatchQueue />
            </div>
          )}

          {/* Tab: Geospatial Map (Full-height Google Maps Command Center - Rendered with verified DOM dimensions) */}
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
