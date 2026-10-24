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
import { 
  CheckCircle2, 
  Activity, 
  Map, 
  BarChart3, 
  Building2,
  Clock,
  Radio
} from 'lucide-react';

function DashboardLayout() {
  const { 
    theme,
    activeAccountRole, 
    activeToast,
    activeCorridor,
    formattedTime,
  } = useSimulation();

  // Tab View Switcher (Single Webpage, zero page scroll)
  const [activeView, setActiveView] = useState('dispatch'); // 'dispatch' | 'map' | 'analytics' | 'planner'
  const [isCollapsed, setIsCollapsed] = useState(false);

  const tabs = [
    { id: 'dispatch', label: 'Live Dispatch', icon: Activity, badge: 'Live' },
    { id: 'map', label: 'Geospatial Map', icon: Map },
    { id: 'analytics', label: 'Fleet Analytics', icon: BarChart3 },
    { id: 'planner', label: 'City Planning', icon: Building2 },
  ];

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

      {/* Bionis-style Clean Sidebar */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        corridors={CORRIDORS}
      />

      {/* Main Single-Page Viewport Container (Zero page scroll) */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden">
        
        {/* Navigation Tabs Bar */}
        <header className={`px-4 sm:px-6 py-2.5 border-b shrink-0 flex items-center justify-between gap-3 transition-colors ${
          theme === 'dark' ? 'border-slate-800/80 bg-[#0B0F19]' : 'border-slate-200 bg-white shadow-sm'
        }`}>
          {/* Horizontal Navigation Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeView === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : theme === 'dark'
                        ? 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                        : 'bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-emerald-500'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-black ${
                      isActive ? 'bg-slate-950 text-emerald-400' : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Status Indicator */}
          <div className="hidden sm:flex items-center gap-3 text-xs font-mono shrink-0">
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border ${
              theme === 'dark' ? 'bg-slate-900/80 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span className="text-[11px] font-bold">Mumbai Grid</span>
            </div>
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border ${
              theme === 'dark' ? 'bg-slate-900/80 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <Clock className="w-3 h-3 text-cyan-400" />
              <span className="text-[11px] font-bold">{formattedTime}</span>
            </div>
          </div>
        </header>

        {/* Tab Canvas: ONLY the respective component, fitting cleanly without scrolling */}
        <main className="flex-1 overflow-hidden p-3.5 sm:p-4 flex flex-col min-h-0">
          
          {/* Tab 1: Live Dispatch */}
          {activeView === 'dispatch' && (
            <div className="flex-1 flex flex-col gap-3 min-h-0 animate-fade-in overflow-hidden">
              {/* Executive KPI Metric Cards */}
              <DashboardMetrics compact={true} className="shrink-0" />

              {/* Side-by-side Dispatch Command & Driver Queue */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-0 overflow-hidden">
                {/* Predictive Dispatch Panel (7 cols) */}
                <div className="lg:col-span-7 flex flex-col min-h-0 overflow-y-auto pr-0.5 scrollbar-thin">
                  <PredictiveDispatchPanel />
                </div>

                {/* Driver Dispatch Queue (5 cols) */}
                <div className="lg:col-span-5 flex flex-col min-h-0 overflow-y-auto pr-0.5 scrollbar-thin">
                  <DriverDispatchQueue />
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Geospatial Map (ONLY Google Maps Command Center) */}
          {activeView === 'map' && (
            <div className="flex-1 flex flex-col min-h-0 animate-fade-in overflow-hidden">
              <CommandCenterMap className="flex-1 h-full min-h-0" />
            </div>
          )}

          {/* Tab 3: Fleet Analytics (ONLY Fleet ROI & Unit Economics) */}
          {activeView === 'analytics' && (
            <div className="flex-1 flex flex-col min-h-0 animate-fade-in overflow-y-auto scrollbar-thin">
              <FleetEconomicsCalculator />
            </div>
          )}

          {/* Tab 4: City Planning (ONLY Municipal Transit Equity & Bottlenecks) */}
          {activeView === 'planner' && (
            <div className="flex-1 flex flex-col min-h-0 animate-fade-in overflow-y-auto scrollbar-thin">
              <CityPlannerView />
            </div>
          )}

        </main>

        {/* Minimal Clean Single-Line Footer */}
        <footer className={`border-t py-2 px-5 text-[11px] font-mono shrink-0 flex flex-col sm:flex-row items-center justify-between gap-1.5 transition-colors ${
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
