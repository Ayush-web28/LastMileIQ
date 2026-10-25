import React, { useState, useEffect } from 'react';
import { SimulationProvider, useSimulation } from './context/SimulationContext';
import CommandCenterMap from './components/CommandCenterMap';
import PredictiveDispatchPanel from './components/PredictiveDispatchPanel';
import DriverDispatchQueue from './components/DriverDispatchQueue';
import DashboardMetrics from './components/bionis/DashboardMetrics';
import FleetEconomicsCalculator from './components/FleetEconomicsCalculator';
import CityPlannerView from './components/CityPlannerView';
import TransitPolicyView from './components/TransitPolicyView';
import Sidebar from './components/bionis/Sidebar';
import ErrorBoundary from './components/ErrorBoundary';
import { CORRIDORS } from './data/corridors';

function DashboardLayout() {
  const { 
    theme, 
    activeToast,
    activeAccountRole,
  } = useSimulation();

  // Tab View Switcher (Controlled exclusively via Sidebar Navigation)
  // Default based on active persona role
  const [activeView, setActiveView] = useState(
    activeAccountRole === 'planner' ? 'planner' : 'dispatch'
  );
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
        ? 'bg-[#0E1015] text-[#F4F5F7] selection:bg-[#E11D48]/30 selection:text-white' 
        : 'bg-[#F4F5F7] text-[#0E1015] selection:bg-[#DC2626]/20 selection:text-[#0E1015]'
    }`}>
      
      {/* Toast Alert Feedback */}
      {activeToast && (
        <div className={`fixed bottom-6 right-6 z-50 max-w-sm p-3.5 rounded-md border animate-in slide-in-from-bottom-5 ${
          theme === 'dark' 
            ? 'bg-[#151820] border-[#E11D48]/50 text-[#F4F5F7]' 
            : 'bg-[#EBECEF] border-[#DC2626]/50 text-[#0E1015]'
        }`}>
          <div className="flex items-start gap-2.5">
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 mt-0.5 ${
              theme === 'dark' 
                ? 'bg-[#E11D48]/20 text-[#E11D48] border border-[#E11D48]/40' 
                : 'bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/40'
            }`}>
              OK
            </span>
            <div>
              <div className="text-xs font-bold">{activeToast.title}</div>
              <div className={`text-[11px] mt-0.5 ${theme === 'dark' ? 'text-[#949AA8]' : 'text-[#475060]'}`}>
                {activeToast.message}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Swiss Rail Industrial Sidebar */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        corridors={CORRIDORS}
      />

      {/* Main Viewport Container */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden">
        
        {/* Main Tab Canvas */}
        <main className="flex-1 overflow-hidden flex flex-col min-h-0">
          
          {/* Tab: Live Dispatch (Fleet Operator) */}
          {activeView === 'dispatch' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 scrollbar-thin animate-fade-in">
              <PredictiveDispatchPanel />
              <DriverDispatchQueue />
            </div>
          )}

          {/* Tab: Geospatial Map */}
          {activeView === 'map' && (
            <div className="flex-1 flex flex-col min-h-0 p-3 sm:p-4 animate-fade-in overflow-hidden">
              <CommandCenterMap className="flex-1 h-full min-h-0" />
            </div>
          )}

          {/* Tab: Fleet Analytics (Fleet Operator) */}
          {activeView === 'analytics' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 scrollbar-thin animate-fade-in">
              <DashboardMetrics />
              <FleetEconomicsCalculator />
            </div>
          )}

          {/* Tab: Municipal Planning (Transit Planner) */}
          {activeView === 'planner' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 scrollbar-thin animate-fade-in">
              <CityPlannerView />
            </div>
          )}

          {/* Tab: Feeder Curb Policy (Transit Planner) */}
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
