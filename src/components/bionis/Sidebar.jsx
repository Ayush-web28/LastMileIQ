import React, { useState, useRef, useEffect } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { 
  Zap, 
  ChevronDown, 
  Activity, 
  Map, 
  BarChart3, 
  Building2, 
  Check, 
  Sun,
  Moon,
  ShieldCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function Sidebar({ activeView, setActiveView, isCollapsed, setIsCollapsed, corridors }) {
  const { 
    theme,
    toggleTheme,
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

  // Navigation Items (Dedicated to Fleet Dispatch Director & Transit Planner)
  const navigationItems = [
    { 
      id: 'dispatch', 
      label: 'Live Dispatch', 
      icon: Activity, 
      badge: 'Live',
      description: 'Predictive Concourse Surge & Fleet Rebalancing' 
    },
    { 
      id: 'map', 
      label: 'Geospatial Map', 
      icon: Map, 
      description: 'Google Maps GIS & Station Stress Halos' 
    },
    { 
      id: 'analytics', 
      label: 'Fleet Analytics', 
      icon: BarChart3, 
      description: 'Unit Economics & Dead Mileage Reduction' 
    },
    { 
      id: 'planner', 
      label: 'City Planning', 
      icon: Building2, 
      description: 'MMRDA Transit Equity & Feeder Lane ROI' 
    },
  ];

  return (
    <aside
      className={`fixed lg:sticky top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out border-r flex flex-col justify-between select-none ${
        theme === 'dark'
          ? 'border-slate-800/80 bg-[#0B0F19]/95 text-slate-100'
          : 'border-slate-200 bg-white/95 text-slate-900 shadow-lg'
      } ${isCollapsed ? 'w-20' : 'w-72'}`}
    >
      {/* Top Section: Brand Header & Selected Corridor Display */}
      <div className={`p-4 space-y-3.5 border-b ${theme === 'dark' ? 'border-slate-800/80' : 'border-slate-200'}`}>
        
        {/* Brand Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/40 shrink-0 shadow-lg shadow-emerald-500/10">
              <Zap className="w-5 h-5 text-emerald-400" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            {!isCollapsed && (
              <div>
                <div className="flex items-center gap-1.5">
                  <span className={`font-black text-base tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    LastMile<span className="text-emerald-500">IQ</span>
                  </span>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                    Mumbai
                  </span>
                </div>
                <p className={`text-[9px] font-mono tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  DISPATCH OS v2.5
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Selected Line Display (Here and here only - Image 2) */}
        {!isCollapsed && (
          <div className="relative" ref={corridorRef}>
            <div className={`text-[10px] font-mono uppercase tracking-wider mb-1 font-bold ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Active Transit Corridor:
            </div>

            <button
              onClick={() => setCorridorMenuOpen(!corridorMenuOpen)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border transition text-left text-xs shadow-md ${
                theme === 'dark'
                  ? 'bg-slate-900/90 border-slate-700/80 hover:border-emerald-500/60 hover:bg-slate-800/80'
                  : 'bg-slate-50 border-slate-200 hover:border-emerald-500/60 hover:bg-slate-100'
              }`}
              title="Click to switch Mumbai Transit Corridor"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span 
                  className="w-3.5 h-3.5 rounded-full shrink-0 shadow-md ring-2 ring-white/20" 
                  style={{ backgroundColor: activeCorridor.color }} 
                />
                <div className="truncate">
                  <span className={`text-[9px] font-mono font-bold block uppercase tracking-wide ${
                    theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
                  }`}>
                    {activeCorridor.categoryLabel || (activeCorridor.category === 'metro' ? 'Metro Line' : 'Suburban Local')}
                  </span>
                  <span className={`font-black text-xs truncate block ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    {activeCorridor.shortName}
                  </span>
                  <span className={`text-[10px] block ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {activeCorridor.stationsCount} Stations • {activeCorridor.lengthKm} km
                  </span>
                </div>
              </div>

              <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                corridorMenuOpen ? 'rotate-180' : ''
              } ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`} />
            </button>

            {/* Mumbai Corridor Dropdown Menu */}
            {corridorMenuOpen && (
              <div className={`absolute left-0 mt-2 w-80 rounded-2xl border shadow-2xl p-2.5 z-50 animate-in fade-in zoom-in-95 max-h-[440px] overflow-y-auto ${
                theme === 'dark'
                  ? 'bg-[#0F172A] border-slate-700 text-slate-200'
                  : 'bg-white border-slate-200 text-slate-800'
              }`}>
                {/* 6 Metro Lines */}
                <div className="text-[10px] font-mono text-cyan-500 px-2.5 py-1 uppercase tracking-wider font-bold">
                  🚇 Mumbai Metro (6 Lines)
                </div>
                {metroLines.map(([key, item]) => {
                  const isSelected = currentCorridorKey === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setCurrentCorridorKey(key);
                        setCorridorMenuOpen(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl flex items-start gap-2.5 transition text-xs mb-1 ${
                        isSelected
                          ? theme === 'dark'
                            ? 'bg-emerald-500/20 border border-emerald-500/50 text-white font-bold'
                            : 'bg-emerald-50 border border-emerald-500/50 text-emerald-950 font-bold'
                          : theme === 'dark'
                            ? 'hover:bg-slate-800/80 text-slate-300'
                            : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full mt-0.5 shrink-0 shadow-sm" style={{ backgroundColor: item.color }} />
                      <div className="min-w-0 flex-1">
                        <div className="font-bold truncate">{item.shortName || item.name}</div>
                        <div className={`text-[10px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                          {item.stationsCount} Stations • {item.lengthKm} km
                        </div>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />}
                    </button>
                  );
                })}

                {/* 3 Suburban Local Lines */}
                <div className="text-[10px] font-mono text-amber-500 px-2.5 pt-3 py-1 uppercase tracking-wider font-bold border-t mt-2">
                  🚆 Mumbai Suburban Local (3 Lines)
                </div>
                {localLines.map(([key, item]) => {
                  const isSelected = currentCorridorKey === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setCurrentCorridorKey(key);
                        setCorridorMenuOpen(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl flex items-start gap-2.5 transition text-xs mb-1 ${
                        isSelected
                          ? theme === 'dark'
                            ? 'bg-emerald-500/20 border border-emerald-500/50 text-white font-bold'
                            : 'bg-emerald-50 border border-emerald-500/50 text-emerald-950 font-bold'
                          : theme === 'dark'
                            ? 'hover:bg-slate-800/80 text-slate-300'
                            : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full mt-0.5 shrink-0 shadow-md ring-1 ring-white/30" style={{ backgroundColor: item.color }} />
                      <div className="min-w-0 flex-1">
                        <div className="font-bold truncate">{item.shortName || item.name}</div>
                        <div className={`text-[10px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                          {item.stationsCount} Stations • {item.lengthKm} km
                        </div>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Middle Section: Navigation Items */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className={`px-2 mb-2 text-[10px] font-mono uppercase tracking-wider font-bold ${
          isCollapsed ? 'hidden' : 'block'
        } ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
          Navigation Views
        </div>

        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition text-xs font-semibold ${
                isActive
                  ? theme === 'dark'
                    ? 'bg-slate-800 text-white border border-slate-700 shadow-md'
                    : 'bg-slate-100 text-slate-900 border border-slate-300 shadow-sm'
                  : theme === 'dark'
                    ? 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              } ${isCollapsed ? 'justify-center' : ''}`}
              title={item.label}
            >
              <Icon className={`w-4 h-4 shrink-0 ${
                isActive ? 'text-emerald-500' : theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
              }`} />
              {!isCollapsed && (
                <div className="text-left flex-1 truncate flex items-center justify-between">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-400">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Section: Light/Dark Toggle & 2-Account Switcher */}
      <div className={`p-3 border-t space-y-2.5 ${theme === 'dark' ? 'border-slate-800/80' : 'border-slate-200'}`}>
        
        {/* Light / Dark Mode Toggle Button */}
        <button
          onClick={toggleTheme}
          className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition text-xs font-semibold ${
            theme === 'dark'
              ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300'
          } ${isCollapsed ? 'justify-center' : ''}`}
          title="Toggle Light / Dark Mode"
        >
          <div className="flex items-center gap-2">
            {theme === 'dark' ? (
              <Moon className="w-4 h-4 text-cyan-400 shrink-0" />
            ) : (
              <Sun className="w-4 h-4 text-amber-500 shrink-0" />
            )}
            {!isCollapsed && (
              <span>{theme === 'dark' ? 'Dark Command View' : 'Light Precision View'}</span>
            )}
          </div>
          {!isCollapsed && (
            <span className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded ${
              theme === 'dark' ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600'
            }`}>
              {theme}
            </span>
          )}
        </button>

        {/* 2-Account System Role Switcher (Fleet Dispatch Director & Transit Planner only) */}
        <div className="relative" ref={accountRef}>
          <button
            onClick={() => setAccountMenuOpen(!accountMenuOpen)}
            className={`w-full flex items-center gap-2.5 p-2 rounded-xl border transition text-left text-xs ${
              theme === 'dark'
                ? 'bg-slate-900 border-slate-800 hover:border-slate-700'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300'
            } ${isCollapsed ? 'justify-center' : 'justify-between'}`}
            title="Switch User Role (Fleet Dispatch Director / Transit Planner)"
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
                  <div className={`font-bold text-xs truncate ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {currentAccount.name}
                  </div>
                  <div className={`text-[10px] truncate ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    {currentAccount.title}
                  </div>
                </div>
              )}
            </div>

            {!isCollapsed && (
              <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform ${accountMenuOpen ? 'rotate-180' : ''} ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`} />
            )}
          </button>

          {/* Account Profile Switcher Dropdown (Only 2 Roles) */}
          {accountMenuOpen && (
            <div className={`absolute bottom-full left-0 mb-2 w-72 rounded-2xl border shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 ${
              theme === 'dark' ? 'bg-[#0F172A] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <div className={`pb-2.5 mb-2.5 border-b ${theme === 'dark' ? 'border-slate-800' : 'border-slate-100'}`}>
                <span className={`text-[10px] font-mono uppercase tracking-wider block font-bold ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Signed-In Account
                </span>
                <div className="text-xs font-bold mt-0.5 truncate">
                  {currentAccount.organization}
                </div>
              </div>

              <div className={`text-[10px] font-mono uppercase tracking-wider px-1 pb-1 font-semibold ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Switch Account Role:
              </div>

              <div className="space-y-1.5">
                {Object.values(ACCOUNTS).map((acc) => {
                  const isSelected = activeAccountRole === acc.roleKey;
                  return (
                    <button
                      key={acc.id}
                      onClick={() => {
                        setActiveAccountRole(acc.roleKey);
                        // Auto-switch view corresponding to selected persona
                        if (acc.roleKey === 'fleet') setActiveView('dispatch');
                        if (acc.roleKey === 'planner') setActiveView('planner');
                        setAccountMenuOpen(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl border transition flex items-start gap-2.5 ${
                        isSelected
                          ? theme === 'dark'
                            ? 'bg-slate-800 border-emerald-500/70 shadow-md ring-1 ring-emerald-500/30'
                            : 'bg-emerald-50 border-emerald-500/70 shadow-sm ring-1 ring-emerald-500/30'
                          : theme === 'dark'
                            ? 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                            : 'bg-slate-50 border-slate-200 hover:border-slate-300'
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
                          <span className="text-xs font-bold truncate">{acc.name}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                        </div>
                        <div className="text-[10px] font-semibold truncate" style={{ color: acc.badgeColor }}>
                          {acc.title}
                        </div>
                        <div className={`text-[9px] truncate mt-0.5 ${
                          theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                        }`}>
                          {acc.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className={`mt-2.5 pt-2 border-t text-[10px] font-mono text-center ${
                theme === 'dark' ? 'border-slate-800/80 text-slate-500' : 'border-slate-100 text-slate-400'
              }`}>
                Mumbai Transit Authority SSO
              </div>
            </div>
          )}
        </div>

      </div>
    </aside>
  );
}