import React, { useState, useRef, useEffect } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { 
  Zap, 
  MapPin, 
  ChevronDown, 
  Activity, 
  Map, 
  BarChart3, 
  Building2, 
  Smartphone, 
  Check, 
  Layers,
  ChevronRight,
  ShieldCheck,
  Radio
} from 'lucide-react';

export default function Sidebar({ activeView, setActiveView, isCollapsed, setIsCollapsed, corridors }) {
  const { 
    currentCorridorKey, 
    setCurrentCorridorKey, 
    activeCorridor, 
    activeAccountRole, 
    setActiveAccountRole, 
    currentAccount, 
    ACCOUNTS 
  } = useSimulation();

  const [corridorMenuOpen, setCorridorMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const corridorRef = useRef(null);
  const accountRef = useRef(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (corridorRef.current && !corridorRef.current.contains(e.target)) {
        setCorridorMenuOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const metroLines = Object.entries(corridors).filter(([_, item]) => item.category === 'metro');
  const localLines = Object.entries(corridors).filter(([_, item]) => item.category === 'local');

  const navigationItems = [
    { id: 'dispatch', label: 'Live Dispatch', icon: Activity, description: 'Command Center & Feeder Rerouting' },
    { id: 'map', label: 'Geospatial Map', icon: Map, description: 'Corridor GIS & Coverage Rings' },
    { id: 'analytics', label: 'Fleet Analytics', icon: BarChart3, description: 'Unit Economics & Fuel Savings' },
    { id: 'planner', label: 'City Planning', icon: Building2, description: 'MMRDA Transit Equity & Chokepoints' },
    { id: 'commuter', label: 'Commuter ONDC', icon: Smartphone, description: 'Mobile Concourse & OTP Booking' },
  ];

  return (
    <aside
      className={`fixed lg:sticky top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out border-r border-slate-800/80 bg-[#0B0F19]/95 backdrop-blur-xl flex flex-col justify-between select-none ${
        isCollapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Top: Logo & Transit Network Selector */}
      <div className="p-4 space-y-4 border-b border-slate-800/80">
        
        {/* Brand Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/40 shrink-0 shadow-lg shadow-emerald-500/10">
              <Zap className="w-5 h-5 text-emerald-400" />
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            {!isCollapsed && (
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base tracking-tight text-white">
                    LastMile<span className="text-emerald-400">IQ</span>
                  </span>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Mumbai
                  </span>
                </div>
                <p className="text-[9px] text-slate-400 font-mono tracking-wider">
                  DISPATCH OS v2.5
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Mumbai Corridor Dropdown (Bionis-styled) */}
        {!isCollapsed && (
          <div className="relative" ref={corridorRef}>
            <button
              onClick={() => setCorridorMenuOpen(!corridorMenuOpen)}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition text-left text-xs shadow-sm"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: activeCorridor.color }} />
                <div className="truncate">
                  <span className="text-[9px] font-mono text-slate-400 block uppercase">
                    {activeCorridor.categoryLabel}
                  </span>
                  <span className="font-semibold text-slate-100 truncate block">
                    {activeCorridor.shortName}
                  </span>
                </div>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${corridorMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {corridorMenuOpen && (
              <div className="absolute left-0 mt-2 w-80 rounded-2xl bg-[#0F172A] border border-slate-700 shadow-2xl p-2.5 z-50 animate-in fade-in zoom-in-95 max-h-[420px] overflow-y-auto">
                <div className="text-[10px] font-mono text-cyan-400 px-2 py-1 uppercase tracking-wider font-bold">
                  🚇 Mumbai Metro (6 Lines)
                </div>
                {metroLines.map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setCurrentCorridorKey(key);
                      setCorridorMenuOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-xl flex items-start gap-2.5 transition text-xs mb-0.5 ${
                      currentCorridorKey === key
                        ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300'
                        : 'hover:bg-slate-800/70 text-slate-300'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: item.color }} />
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{item.name}</div>
                      <div className="text-[10px] text-slate-400">
                        {item.stationsCount} Stations • {item.lengthKm} km
                      </div>
                    </div>
                  </button>
                ))}

                <div className="text-[10px] font-mono text-emerald-400 px-2 pt-3 py-1 uppercase tracking-wider font-bold border-t border-slate-800 mt-2">
                  🚆 Mumbai Suburban Local (3 Lines)
                </div>
                {localLines.map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setCurrentCorridorKey(key);
                      setCorridorMenuOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-xl flex items-start gap-2.5 transition text-xs mb-0.5 ${
                      currentCorridorKey === key
                        ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300'
                        : 'hover:bg-slate-800/70 text-slate-300'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full mt-1 shrink-0 shadow-sm" style={{ backgroundColor: item.color }} />
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{item.name}</div>
                      <div className="text-[10px] text-slate-400">
                        {item.stationsCount} Stations • {item.lengthKm} km
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Middle: Navigation Items */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className={`px-2 mb-2 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold ${isCollapsed ? 'hidden' : 'block'}`}>
          Navigation
        </div>

        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition text-xs font-medium ${
                isActive
                  ? 'bg-slate-800 text-white font-bold border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              } ${isCollapsed ? 'justify-center' : ''}`}
              title={item.label}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
              {!isCollapsed && (
                <div className="text-left flex-1 truncate">
                  <div className="truncate">{item.label}</div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom: Network Status & Account Role Profile Switcher */}
      <div className="p-3 border-t border-slate-800/80 space-y-2">
        
        {/* Network Online Pill */}
        {!isCollapsed && (
          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[10px] font-mono text-slate-400 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Mumbai Network Active</span>
            </div>
            <span className="text-emerald-400 font-bold">9 Lines</span>
          </div>
        )}

        {/* Account System Role Switcher Card */}
        <div className="relative" ref={accountRef}>
          <button
            onClick={() => setAccountMenuOpen(!accountMenuOpen)}
            className={`w-full flex items-center gap-2.5 p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition text-left text-xs ${
              isCollapsed ? 'justify-center' : 'justify-between'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs font-mono shrink-0 shadow-sm"
                style={{ 
                  backgroundColor: `${currentAccount.badgeColor}20`, 
                  color: currentAccount.badgeColor,
                  border: `1.5px solid ${currentAccount.badgeColor}50` 
                }}
              >
                {currentAccount.initials}
              </div>

              {!isCollapsed && (
                <div className="truncate min-w-0">
                  <div className="font-bold text-white text-xs truncate">
                    {currentAccount.name}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {currentAccount.title}
                  </div>
                </div>
              )}
            </div>

            {!isCollapsed && (
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${accountMenuOpen ? 'rotate-180' : ''}`} />
            )}
          </button>

          {/* Account Profile Switcher Dropdown */}
          {accountMenuOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-72 rounded-2xl bg-[#0F172A] border border-slate-700 shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95">
              <div className="pb-2.5 mb-2.5 border-b border-slate-800">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">
                  Active User Account
                </span>
                <div className="text-xs font-bold text-white mt-0.5">
                  {currentAccount.organization}
                </div>
              </div>

              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider px-1 pb-1 font-semibold">
                Switch Role / Persona:
              </div>

              <div className="space-y-1.5">
                {Object.values(ACCOUNTS).map((acc) => {
                  const isSelected = activeAccountRole === acc.roleKey;
                  return (
                    <button
                      key={acc.id}
                      onClick={() => {
                        setActiveAccountRole(acc.roleKey);
                        // Also automatically update view based on role
                        if (acc.roleKey === 'fleet') setActiveView('dispatch');
                        if (acc.roleKey === 'planner') setActiveView('planner');
                        if (acc.roleKey === 'commuter') setActiveView('commuter');
                        setAccountMenuOpen(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl border transition flex items-start gap-2.5 ${
                        isSelected
                          ? 'bg-slate-800 border-emerald-500/60 shadow-md ring-1 ring-emerald-500/20'
                          : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div 
                        className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[10px] font-mono shrink-0 mt-0.5"
                        style={{ 
                          backgroundColor: `${acc.badgeColor}20`, 
                          color: acc.badgeColor,
                          border: `1px solid ${acc.badgeColor}50` 
                        }}
                      >
                        {acc.initials}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white truncate">{acc.name}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                        </div>
                        <div className="text-[10px] font-medium truncate" style={{ color: acc.badgeColor }}>
                          {acc.title}
                        </div>
                        <div className="text-[9px] text-slate-400 truncate mt-0.5">
                          {acc.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-500 text-center">
                Signed in via Mumbai Transit SSO
              </div>
            </div>
          )}
        </div>

      </div>
    </aside>
  );
}
