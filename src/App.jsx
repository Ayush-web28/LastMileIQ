import React, { useState } from 'react';
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
    activeToast 
  } = useSimulation();

  // Active navigation view (default synced with account role)
  const [activeView, setActiveView] = useState('dispatch'); // 'dispatch' | 'map' | 'analytics' | 'planner'
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`min-h-screen flex font-sans transition-colors duration-200 ${
      theme === 'dark' 
        ? 'bg-[#080C14] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-300' 
        : 'bg-slate-50 text-slate-900 selection:bg-emerald-500/20 selection:text-emerald-700'
    }`}>
      
      {/* Toast Alert Feedback */}
      {activeToast && (
        <div className={`fixed bottom-6 right-6 z-50 max-w-sm p-4 rounded-2xl border shadow-2xl animate-in slide-in-from-bottom-5 ${
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

      {/* Bionis-style Clean Sidebar (Contains Corridor Selector, Light/Dark Toggle & 2 Accounts) */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        corridors={CORRIDORS}
      />

      {/* Main Viewport Container (No Topbar - direct immersive command canvas) */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Scrollable Dashboard Canvas */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          
          {/* Executive KPI Metric Cards (Bionis template pattern) */}
          <DashboardMetrics />

          {/* View 1: Live Dispatch Command Center (Fleet Dispatch Director Default) */}
          {activeView === 'dispatch' && (
            <div className="space-y-6 animate-fade-in">
              {/* Google Maps GIS Command Center with highlighted stations */}
              <CommandCenterMap />

              {/* Actionable Predictive Dispatch Panel with surge stress buttons */}
              <PredictiveDispatchPanel />

              {/* Live Driver Telemetry Queue */}
              <DriverDispatchQueue />
            </div>
          )}

          {/* View 2: Pure Map Inspector */}
          {activeView === 'map' && (
            <div className="space-y-6 animate-fade-in">
              <CommandCenterMap />
              <PredictiveDispatchPanel />
            </div>
          )}

          {/* View 3: Fleet ROI & Unit Economics */}
          {activeView === 'analytics' && (
            <div className="space-y-6 animate-fade-in">
              <FleetEconomicsCalculator />
              <CommandCenterMap />
            </div>
          )}

          {/* View 4: City Planning & Transit Equity (Transit Planner Default) */}
          {activeView === 'planner' && (
            <div className="space-y-6 animate-fade-in">
              <CityPlannerView />
              <CommandCenterMap />
            </div>
          )}

        </main>

        {/* Minimal Clean Footer */}
        <footer className={`border-t py-3.5 px-6 text-xs font-mono flex flex-col sm:flex-row items-center justify-between gap-2 transition-colors ${
          theme === 'dark' 
            ? 'border-slate-800/80 bg-[#0B0F19] text-slate-500' 
            : 'border-slate-200 bg-white text-slate-600'
        }`}>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className={`font-bold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-800'}`}>
              LastMileIQ Mumbai Transit Dispatch OS
            </span>
            <span className="text-slate-500">|</span>
            <span>6 Metro Lines + 3 Suburban Local Lines</span>
          </div>
          <div className="text-emerald-500 font-semibold">
            Google Maps Engine • Zero External API Key Required
          </div>
        </footer>

      </div>

    </div>
  );
}

export default function App() {
  return (
    <SimulationProvider>
      <DashboardLayout />
    </SimulationProvider>
  );
}