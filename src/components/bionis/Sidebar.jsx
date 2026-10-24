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
  Sparkles,
  Layers
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

  // Corridor category state: 'metro' (default) or 'local'
  const [corridorCategory, setCorridorCategory] = useState(
    activeCorridor?.category === 'local' ? 'local' : 'metro'
  );

  // Sync corridorCategory if activeCorridor changes externally
  useEffect(() => {
    if (activeCorridor?.category) {
      setCorridorCategory(activeCorridor.category);
    }
  }, [activeCorridor?.category]);

  const toggleCorridorCategory = () => {
    setCorridorMenuOpen(false);
    if (corridorCategory === 'metro') {
      setCorridorCategory('local');
      if (activeCorridor?.category !== 'local') {
        const firstLocal = localLines[0]?.[0] || 'mumbai-local-western';
        setCurrentCorridorKey(firstLocal);
      }
    } else {
      setCorridorCategory('metro');
      if (activeCorridor?.category !== 'metro') {
        const firstMetro = metroLines[0]?.[0] || 'mumbai-metro-1';
        setCurrentCorridorKey(firstMetro);
      }
    }
  };

  // Dynamic Navigation Items tailored per stakeholder role
  const navigationItems = activeAccountRole === 'fleet'
    ? [
        { 
          id: 'dispatch', 
          label: 'Live Dispatch', 
          icon: Activity, 
          badge: 'Live',
          description: 'Predictive Concourse Surge & Fleet Rebalancing' 
        },
        { 
          id: 'map', 
          label: 'Geospatial Fleet Map', 
          icon: Map, 
          description: 'Google Maps GIS & Station Stress Halos' 
        },
        { 
          id: 'analytics', 
          label: 'Fleet Analytics', 
          icon: BarChart3, 
          description: 'Unit Economics & Dead Mileage Reduction' 
        },
      ]
    : [
        { 
          id: 'planner', 
          label: 'Municipal Planning', 
          icon: Building2, 
          badge: 'MMRDA',
          description: 'Transit Equity & Station Bottlenecks' 
        },
        { 
          id: 'map', 
          label: 'Catchment GIS Map', 
          icon: Map, 
          description: 'Suburban Coverage & 10-Min Isochrones' 
        },
        { 
          id: 'policy', 
          label: 'Feeder Curb Policy', 
          icon: ShieldCheck, 
          description: 'Dedicated Feeder Bays & Multi-Modal ROI' 
        },
      ];

  return (
    <aside
      className={`fixed lg:sticky top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out border-r flex flex-col justify-between select-none ${
        theme === 'dark'
          ? 'border-[#1E2F5B]/80 bg-[#0B132B]/95 text-slate-100'
          : 'border-slate-200 bg-white/95 text-slate-900 shadow-lg'
      } ${isCollapsed ? 'w-20' : 'w-72'}`}
    >
      {/* Top Section: Brand Header & Selected Corridor Display */}
      <div className={`p-4 space-y-3.5 border-b ${theme === 'dark' ? 'border-[#1E2F5B]/80' : 'border-slate-200'}`}>
        
        {/* Brand Header with Subtle Minimal Light/Dark Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500/25 to-sky-500/20 border border-amber-500/50 shrink-0 shadow-lg shadow-amber-500/10">
              <Zap className="w-4 h-4 text-amber-400" />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            </div>
            {!isCollapsed && (
              <div>
                <div className="flex items-center gap-1.5">
                  <span className={`font-black text-base tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    LastMile<span className="text-amber-400">IQ</span>
                  </span>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-sky-500/15 text-sky-400 border border-sky-500/30">
                    Mumbai
                  </span>
                </div>
                <p className={`text-[9px] font-mono tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  DISPATCH OS v2.5
                </p>
              </div>
            )}
          </div>

          {/* Subtle Minimal Light/Dark Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-1.5 rounded-lg border transition ${
              theme === 'dark'
                ? 'border-[#1E2F5B] hover:border-slate-600 bg-[#111C38]/60 shadow-sm'
                : 'border-slate-200 hover:border-slate-300 bg-slate-50 shadow-sm'
            }`}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <Moon className="w-3.5 h-3.5 text-slate-300 hover:text-white transition-colors" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-amber-500 hover:text-amber-600 transition-colors" />
            )}
          </button>
        </div>

        {/* Network Mode Slider (Metro vs Suburban Local) */}
        {!isCollapsed && (
          <div className="relative space-y-2" ref={corridorRef}>
            {/* Segmented Slider Track (Replaces 'ACTIVE TRANSIT CORRIDOR' text) */}
            <div className={`p-1 rounded-xl border flex items-center relative transition-colors ${
              theme === 'dark' 
                ? 'bg-[#0B132B] border-[#1E2F5B]' 
                : 'bg-slate-200/80 border-slate-300/80'
            }`}>
              <button
                type="button"
                onClick={() => {
                  if (corridorCategory !== 'metro') {
                    setCorridorMenuOpen(false);
                    setCorridorCategory('metro');
                    if (activeCorridor?.category !== 'metro') {
                      const firstMetro = metroLines[0]?.[0] || 'mumbai-metro-1';
                      setCurrentCorridorKey(firstMetro);
                    }
                  }
                }}
                className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-mono font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                  corridorCategory === 'metro'
                    ? theme === 'dark'
                      ? 'bg-[#162347] text-sky-400 border border-sky-500/40 shadow-md'
                      : 'bg-white text-sky-800 border border-slate-300/80 shadow-sm'
                    : theme === 'dark'
                      ? 'text-slate-400 hover:text-slate-200 border border-transparent'
                      : 'text-slate-600 hover:text-slate-900 border border-transparent'
                }`}
                title="Switch to Mumbai Metro Lines"
              >
                <span>🚇</span>
                <span>Metro</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (corridorCategory !== 'local') {
                    setCorridorMenuOpen(false);
                    setCorridorCategory('local');
                    if (activeCorridor?.category !== 'local') {
                      const firstLocal = localLines[0]?.[0] || 'mumbai-local-western';
                      setCurrentCorridorKey(firstLocal);
                    }
                  }
                }}
                className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-mono font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                  corridorCategory === 'local'
                    ? theme === 'dark'
                      ? 'bg-[#162347] text-amber-400 border border-amber-500/40 shadow-md'
                      : 'bg-white text-amber-800 border border-slate-300/80 shadow-sm'
                    : theme === 'dark'
                      ? 'text-slate-400 hover:text-slate-200 border border-transparent'
                      : 'text-slate-600 hover:text-slate-900 border border-transparent'
                }`}
                title="Switch to Mumbai Suburban Local Lines"
              >
                <span>🚆</span>
                <span>Local</span>
              </button>
            </div>

            {/* Clean Line Dropdown Card (Zero Chevron Repetition) */}
            <button
              type="button"
              onClick={() => setCorridorMenuOpen(!corridorMenuOpen)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border transition shadow-md text-left cursor-pointer group ${
                theme === 'dark'
                  ? 'bg-[#111C38] border-[#1E2F5B] hover:border-sky-500/50 hover:bg-[#162347]'
                  : 'bg-slate-50 border-slate-200 hover:border-sky-500/50 hover:bg-slate-100'
              }`}
              title={`Click to choose from ${corridorCategory === 'metro' ? 'Mumbai Metro Lines' : 'Mumbai Suburban Local Lines'}`}
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <span 
                  className="w-3.5 h-3.5 rounded-full shrink-0 shadow-md ring-2 ring-white/20 mt-0.5" 
                  style={{ backgroundColor: activeCorridor.color }} 
                />
                <div className="min-w-0 flex-1">
                  <span className={`text-[9px] font-mono font-bold block uppercase tracking-wide leading-none mb-1 ${
                    corridorCategory === 'metro'
                      ? (theme === 'dark' ? 'text-sky-400' : 'text-sky-700')
                      : (theme === 'dark' ? 'text-amber-400' : 'text-amber-700')
                  }`}>
                    {corridorCategory === 'metro' ? 'Metro Line' : 'Suburban Local'}
                  </span>
                  <span className={`font-black text-xs leading-tight block break-words ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    {activeCorridor.shortName}
                  </span>
                  <span className={`text-[10px] block leading-tight mt-1 ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {activeCorridor.stationsCount} Stations • {activeCorridor.lengthKm} km
                  </span>
                </div>
              </div>

              <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 ml-2 ${
                corridorMenuOpen ? 'rotate-180' : ''
              } ${theme === 'dark' ? 'text-slate-400 group-hover:text-white' : 'text-slate-500 group-hover:text-slate-900'}`} />
            </button>

            {/* Categorized Corridor Dropdown Menu */}
            {corridorMenuOpen && (
              <div className={`absolute left-0 mt-2 w-full rounded-2xl border shadow-2xl p-2.5 z-50 animate-in fade-in zoom-in-95 max-h-[360px] overflow-y-auto ${
                theme === 'dark'
                  ? 'bg-[#111C38] border-[#1E2F5B] text-slate-200 shadow-2xl shadow-black/80'
                  : 'bg-white border-slate-200 text-slate-800'
              }`}>
                {corridorCategory === 'metro' ? (
                  <>
                    {/* 6 Metro Lines Dropdown Header: Full Width, No 'All Lines' */}
                    <div className="px-2.5 py-1.5 mb-1 border-b border-[#1E2F5B]/50">
                      <span className="text-[10px] font-mono text-sky-400 uppercase tracking-wider font-bold block w-full">
                        🚇 Mumbai Metro (6 Lines)
                      </span>
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
                                ? 'bg-sky-500/20 border border-sky-500/50 text-white font-bold'
                                : 'bg-sky-50 border border-sky-500/50 text-sky-950 font-bold'
                              : theme === 'dark'
                                ? 'hover:bg-[#162347] text-slate-300'
                                : 'hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <span className="w-3 h-3 rounded-full mt-0.5 shrink-0 shadow-sm" style={{ backgroundColor: item.color }} />
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-xs break-words">{item.shortName || item.name}</div>
                            <div className={`text-[10px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                              {item.stationsCount} Stations • {item.lengthKm} km
                            </div>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />}
                        </button>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {/* 3 Suburban Local Lines Dropdown Header: Full Width, No 'All Lines' */}
                    <div className="px-2.5 py-1.5 mb-1 border-b border-[#1E2F5B]/50">
                      <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-bold block w-full">
                        🚆 Mumbai Suburban Local (3 Lines)
                      </span>
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
                                ? 'bg-amber-500/20 border border-amber-500/50 text-white font-bold'
                                : 'bg-amber-50 border border-amber-500/50 text-amber-950 font-bold'
                              : theme === 'dark'
                                ? 'hover:bg-[#162347] text-slate-300'
                                : 'hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <span className="w-3 h-3 rounded-full mt-0.5 shrink-0 shadow-md ring-1 ring-white/30" style={{ backgroundColor: item.color }} />
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-xs break-words">{item.shortName || item.name}</div>
                            <div className={`text-[10px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                              {item.stationsCount} Stations • {item.lengthKm} km
                            </div>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />}
                        </button>
                      );
                    })}
                  </>
                )}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Middle Section: Role-Specific Navigation Tabs */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
        {!isCollapsed && (
          <div className="px-2 mb-2 flex items-center justify-between">
            <span className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
              theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
            }`}>
              Navigation Views
            </span>
            <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${
              activeAccountRole === 'fleet' 
                ? 'bg-sky-500/15 text-sky-400 border-sky-500/30' 
                : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
            }`}>
              {activeAccountRole === 'fleet' ? 'Fleet Ops' : 'MMRDA Policy'}
            </span>
          </div>
        )}

        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition text-xs font-semibold ${
                isActive
                  ? activeAccountRole === 'fleet'
                    ? 'bg-sky-500/20 border border-sky-500/50 text-sky-200 shadow-md shadow-sky-950/40'
                    : 'bg-amber-500/20 border border-amber-500/50 text-amber-200 shadow-md shadow-amber-950/40'
                  : theme === 'dark'
                    ? 'text-slate-400 hover:text-slate-100 hover:bg-[#111C38]/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              } ${isCollapsed ? 'justify-center' : ''}`}
              title={item.label}
            >
              <Icon className={`w-4 h-4 shrink-0 ${
                isActive 
                  ? activeAccountRole === 'fleet' ? 'text-sky-400' : 'text-amber-400' 
                  : theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
              }`} />
              {!isCollapsed && (
                <div className="text-left flex-1 truncate flex items-center justify-between">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-black ${
                      activeAccountRole === 'fleet'
                        ? 'bg-sky-500/20 text-sky-300'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Section: 2-Account Persona Switcher */}
      <div className={`p-3 border-t space-y-2.5 ${theme === 'dark' ? 'border-[#1E2F5B]/80' : 'border-slate-200'}`}>
        
        {/* 2-Account System Role Switcher (Fleet Dispatch Director & Transit Planner) */}
        <div className="relative" ref={accountRef}>
          <button
            onClick={() => setAccountMenuOpen(!accountMenuOpen)}
            className={`w-full flex items-center gap-2.5 p-2 rounded-xl border transition text-left text-xs ${
              theme === 'dark'
                ? 'bg-[#111C38] border-[#1E2F5B] hover:border-sky-500/50'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300'
            } ${isCollapsed ? 'justify-center' : 'justify-between'}`}
            title="Switch Stakeholder Persona (Fleet Dispatch Director / Transit Planner)"
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

          {/* Account Profile Switcher Dropdown (2 Roles) */}
          {accountMenuOpen && (
            <div className={`absolute bottom-full left-0 mb-2 w-72 rounded-2xl border shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 ${
              theme === 'dark' ? 'bg-[#111C38] border-[#1E2F5B] text-white shadow-black/80' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <div className={`pb-2.5 mb-2.5 border-b ${theme === 'dark' ? 'border-[#1E2F5B]' : 'border-slate-100'}`}>
                <span className={`text-[10px] font-mono uppercase tracking-wider block font-bold ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Signed-In Persona
                </span>
                <div className="text-xs font-bold mt-0.5 truncate">
                  {currentAccount.organization}
                </div>
              </div>

              <div className={`text-[10px] font-mono uppercase tracking-wider px-1 pb-1 font-semibold ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Switch Stakeholder Role:
              </div>

              <div className="space-y-1.5">
                {Object.values(ACCOUNTS).map((acc) => {
                  const isSelected = activeAccountRole === acc.roleKey;
                  return (
                    <button
                      key={acc.id}
                      onClick={() => {
                        setActiveAccountRole(acc.roleKey);
                        // Auto-switch default tab corresponding to selected persona
                        if (acc.roleKey === 'fleet') setActiveView('dispatch');
                        if (acc.roleKey === 'planner') setActiveView('planner');
                        setAccountMenuOpen(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl border transition flex items-start gap-2.5 ${
                        isSelected
                          ? theme === 'dark'
                            ? 'bg-[#162347] border-sky-500/70 shadow-md ring-1 ring-sky-500/30'
                            : 'bg-sky-50 border-sky-500/70 shadow-sm ring-1 ring-sky-500/30'
                          : theme === 'dark'
                            ? 'bg-[#0B132B]/80 border-[#1E2F5B] hover:border-slate-700'
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
                          {isSelected && <Check className="w-3.5 h-3.5 text-sky-400 shrink-0" />}
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
