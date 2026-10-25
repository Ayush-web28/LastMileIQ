import React, { useState, useRef, useEffect } from 'react';
import { useSimulation } from '../../context/SimulationContext';

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

  // Dynamic Navigation Items tailored per stakeholder role
  const navigationItems = activeAccountRole === 'fleet'
    ? [
        { 
          id: 'dispatch', 
          label: 'Live Dispatch', 
          badge: 'Live',
          description: 'Predictive Concourse Surge & Fleet Rebalancing' 
        },
        { 
          id: 'map', 
          label: 'Geospatial Fleet Map', 
          description: 'Google Maps GIS & Station Stress Halos' 
        },
        { 
          id: 'analytics', 
          label: 'Fleet Analytics', 
          description: 'Unit Economics & Dead Mileage Reduction' 
        },
      ]
    : [
        { 
          id: 'planner', 
          label: 'Municipal Planning', 
          badge: 'MMRDA',
          description: 'Transit Equity & Station Bottlenecks' 
        },
        { 
          id: 'map', 
          label: 'Catchment GIS Map', 
          description: 'Suburban Coverage & 10-Min Isochrones' 
        },
        { 
          id: 'policy', 
          label: 'Feeder Curb Policy', 
          description: 'Dedicated Feeder Bays & Multi-Modal ROI' 
        },
      ];

  return (
    <aside
      className={`fixed lg:sticky top-0 left-0 z-40 h-screen transition-all duration-200 border-r flex flex-col justify-between select-none ${
        theme === 'dark'
          ? 'border-[#2A2F3D] bg-[#0E1015] text-[#F4F5F7]'
          : 'border-[#CED2DA] bg-[#EBECEF] text-[#0E1015]'
      } ${isCollapsed ? 'w-20' : 'w-72'}`}
    >
      {/* Top Section: Brand Header & Selected Corridor Display */}
      <div className={`p-4 space-y-3 border-b ${theme === 'dark' ? 'border-[#2A2F3D]' : 'border-[#CED2DA]'}`}>
        
        {/* Brand Header with Minimal Light/Dark Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <div>
              <div className="flex items-center gap-1.5">
                <span className={`font-black text-base tracking-tight ${theme === 'dark' ? 'text-[#F4F5F7]' : 'text-[#0E1015]'}`}>
                  LastMile<span className="text-[#DC2626]">IQ</span>
                </span>
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${
                  theme === 'dark' 
                    ? 'bg-[#DC2626]/15 text-[#DC2626] border-[#DC2626]/30' 
                    : 'bg-[#DC2626]/10 text-[#DC2626] border-[#DC2626]/40'
                }`}>
                  Mumbai
                </span>
              </div>
              <p className={`text-[9px] font-mono tracking-wider ${theme === 'dark' ? 'text-[#949AA8]' : 'text-[#6B7280]'}`}>
                DISPATCH OS
              </p>
            </div>
          </div>

          {/* Minimal Light/Dark Toggle (Yellow Sun in light mode, Silver Moon in dark mode) */}
          <button
            onClick={toggleTheme}
            className={`p-1.5 rounded-md border transition-colors ${
              theme === 'dark'
                ? 'border-[#2A2F3D] hover:border-[#3B4254] bg-[#151820]'
                : 'border-[#CED2DA] hover:border-[#949AA8] bg-[#DFE2E7]'
            }`}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <svg className="w-3.5 h-3.5 text-[#94A3B8]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5 text-[#FBBF24]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="5" fill="currentColor"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            )}
          </button>
        </div>

        {/* Network Mode Slider (Metro vs Suburban Local) */}
        {!isCollapsed && (
          <div className="relative space-y-2" ref={corridorRef}>
            {/* Segmented Slider Track */}
            <div className={`p-1 rounded-md border flex items-center relative transition-colors ${
              theme === 'dark' 
                ? 'bg-[#151820] border-[#2A2F3D]' 
                : 'bg-[#DFE2E7] border-[#CED2DA]'
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
                className={`flex-1 py-1.5 px-2 rounded text-[11px] font-mono font-bold transition-colors text-center cursor-pointer ${
                  corridorCategory === 'metro'
                    ? theme === 'dark'
                      ? 'bg-[#2A2F3D] text-white border border-[#DC2626]/60'
                      : 'bg-[#F4F5F7] text-[#DC2626] border border-[#CED2DA]'
                    : theme === 'dark'
                      ? 'text-[#949AA8] hover:text-white border border-transparent'
                      : 'text-[#475060] hover:text-[#0E1015] border border-transparent'
                }`}
                title="Switch to Mumbai Metro Lines"
              >
                Metro
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
                className={`flex-1 py-1.5 px-2 rounded text-[11px] font-mono font-bold transition-colors text-center cursor-pointer ${
                  corridorCategory === 'local'
                    ? theme === 'dark'
                      ? 'bg-[#2A2F3D] text-white border border-[#2563EB]/60'
                      : 'bg-[#F4F5F7] text-[#2563EB] border border-[#CED2DA]'
                    : theme === 'dark'
                      ? 'text-[#949AA8] hover:text-white border border-transparent'
                      : 'text-[#475060] hover:text-[#0E1015] border border-transparent'
                }`}
                title="Switch to Mumbai Suburban Local Lines"
              >
                Local
              </button>
            </div>

            {/* Clean Line Dropdown Card */}
            <button
              type="button"
              onClick={() => setCorridorMenuOpen(!corridorMenuOpen)}
              className={`w-full flex items-center justify-between p-2.5 rounded-md border transition-colors text-left cursor-pointer ${
                theme === 'dark'
                  ? 'bg-[#151820] border-[#2A2F3D] hover:border-[#DC2626]/50 hover:bg-[#1D212C]'
                  : 'bg-[#F4F5F7] border-[#CED2DA] hover:border-[#DC2626]/50'
              }`}
              title={`Click to choose from ${corridorCategory === 'metro' ? 'Mumbai Metro Lines' : 'Mumbai Suburban Local Lines'}`}
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <span 
                  className="w-3 h-3 rounded-full shrink-0" 
                  style={{ backgroundColor: activeCorridor.color }} 
                />
                <div className="min-w-0 flex-1">
                  <span className={`text-[9px] font-mono font-bold block uppercase tracking-wide leading-none mb-1 ${
                    corridorCategory === 'metro'
                      ? (theme === 'dark' ? 'text-[#DC2626]' : 'text-[#DC2626]')
                      : (theme === 'dark' ? 'text-[#60A5FA]' : 'text-[#2563EB]')
                  }`}>
                    {corridorCategory === 'metro' ? 'Metro Line' : 'Suburban Local'}
                  </span>
                  <span className={`font-bold text-xs leading-tight block break-words ${
                    theme === 'dark' ? 'text-[#F4F5F7]' : 'text-[#0E1015]'
                  }`}>
                    {activeCorridor.shortName}
                  </span>
                  <span className={`text-[10px] block leading-tight mt-0.5 ${
                    theme === 'dark' ? 'text-[#949AA8]' : 'text-[#6B7280]'
                  }`}>
                    {activeCorridor.stationsCount} Stations • {activeCorridor.lengthKm} km
                  </span>
                </div>
              </div>

              <span className={`text-[10px] text-[#6B7280] transition-transform ${corridorMenuOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {/* Categorized Corridor Dropdown Menu */}
            {corridorMenuOpen && (
              <div className={`absolute left-0 mt-1.5 w-full rounded-md border p-2 z-50 animate-in fade-in zoom-in-95 max-h-[360px] overflow-y-auto ${
                theme === 'dark'
                  ? 'bg-[#151820] border-[#2A2F3D] text-[#F4F5F7]'
                  : 'bg-[#F4F5F7] border-[#CED2DA] text-[#0E1015]'
              }`}>
                {corridorCategory === 'metro' ? (
                  <>
                    <div className={`px-2 py-1 mb-1 border-b ${theme === 'dark' ? 'border-[#2A2F3D]' : 'border-[#CED2DA]'}`}>
                      <span className="text-[10px] font-mono text-[#DC2626] uppercase tracking-wider font-bold block w-full">
                        Mumbai Metro (6 Lines)
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
                          className={`w-full text-left p-2 rounded-md flex items-start gap-2.5 transition text-xs mb-1 ${
                            isSelected
                              ? theme === 'dark'
                                ? 'bg-[#2A2F3D] border border-[#DC2626]/50 text-white font-bold'
                                : 'bg-[#DFE2E7] border border-[#DC2626]/40 text-[#0E1015] font-bold'
                              : theme === 'dark'
                                ? 'hover:bg-[#1D212C] text-[#949AA8]'
                                : 'hover:bg-[#DFE2E7] text-[#475060]'
                          }`}
                        >
                          <span className="w-2.5 h-2.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: item.color }} />
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-xs break-words">{item.shortName || item.name}</div>
                            <div className={`text-[10px] ${theme === 'dark' ? 'text-[#949AA8]' : 'text-[#6B7280]'}`}>
                              {item.stationsCount} Stations • {item.lengthKm} km
                            </div>
                          </div>
                          {isSelected && <span className="text-[10px] text-[#DC2626] font-mono font-bold shrink-0">Active</span>}
                        </button>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <div className={`px-2 py-1 mb-1 border-b ${theme === 'dark' ? 'border-[#2A2F3D]' : 'border-[#CED2DA]'}`}>
                      <span className="text-[10px] font-mono text-[#2563EB] uppercase tracking-wider font-bold block w-full">
                        Mumbai Suburban Local (3 Lines)
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
                          className={`w-full text-left p-2 rounded-md flex items-start gap-2.5 transition text-xs mb-1 ${
                            isSelected
                              ? theme === 'dark'
                                ? 'bg-[#2A2F3D] border border-[#2563EB]/50 text-white font-bold'
                                : 'bg-[#DFE2E7] border border-[#2563EB]/40 text-[#0E1015] font-bold'
                              : theme === 'dark'
                                ? 'hover:bg-[#1D212C] text-[#949AA8]'
                                : 'hover:bg-[#DFE2E7] text-[#475060]'
                          }`}
                        >
                          <span className="w-2.5 h-2.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: item.color }} />
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-xs break-words">{item.shortName || item.name}</div>
                            <div className={`text-[10px] ${theme === 'dark' ? 'text-[#949AA8]' : 'text-[#6B7280]'}`}>
                              {item.stationsCount} Stations • {item.lengthKm} km
                            </div>
                          </div>
                          {isSelected && <span className="text-[10px] text-[#2563EB] font-mono font-bold shrink-0">Active</span>}
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
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {!isCollapsed && (
          <div className="px-2 mb-2 flex items-center justify-between">
            <span className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
              theme === 'dark' ? 'text-[#6B7280]' : 'text-[#6B7280]'
            }`}>
              Navigation Views
            </span>
            <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${
              activeAccountRole === 'fleet' 
                ? 'bg-[#DC2626]/15 text-[#DC2626] border-[#DC2626]/30' 
                : 'bg-[#2563EB]/15 text-[#2563EB] border-[#2563EB]/30'
            }`}>
              {activeAccountRole === 'fleet' ? 'Fleet Ops' : 'MMRDA Policy'}
            </span>
          </div>
        )}

        {navigationItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors text-xs font-semibold ${
                isActive
                  ? activeAccountRole === 'fleet'
                    ? theme === 'dark' ? 'bg-[#1D212C] border border-[#DC2626]/50 text-white font-bold' : 'bg-[#DFE2E7] border border-[#DC2626]/50 text-[#0E1015] font-bold'
                    : theme === 'dark' ? 'bg-[#1D212C] border border-[#2563EB]/50 text-white font-bold' : 'bg-[#DFE2E7] border border-[#2563EB]/50 text-[#0E1015] font-bold'
                  : theme === 'dark'
                    ? 'text-[#949AA8] hover:text-white hover:bg-[#151820]'
                    : 'text-[#475060] hover:text-[#0E1015] hover:bg-[#DFE2E7]'
              } ${isCollapsed ? 'justify-center' : ''}`}
              title={item.label}
            >
              <span className="truncate">{item.label}</span>
              {!isCollapsed && item.badge && (
                <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold ${
                  activeAccountRole === 'fleet'
                    ? 'bg-[#DC2626]/20 text-[#DC2626]'
                    : 'bg-[#2563EB]/20 text-[#2563EB]'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Section: 2-Account Persona Switcher */}
      <div className={`p-3 border-t space-y-2.5 ${theme === 'dark' ? 'border-[#2A2F3D]' : 'border-[#CED2DA]'}`}>
        
        {/* 2-Account System Role Switcher */}
        <div className="relative" ref={accountRef}>
          <button
            onClick={() => setAccountMenuOpen(!accountMenuOpen)}
            className={`w-full flex items-center gap-2.5 p-2 rounded-md border transition-colors text-left text-xs ${
              theme === 'dark'
                ? 'bg-[#151820] border-[#2A2F3D] hover:border-[#DC2626]/50'
                : 'bg-[#F4F5F7] border-[#CED2DA] hover:border-[#DC2626]/50'
            } ${isCollapsed ? 'justify-center' : 'justify-between'}`}
            title="Switch Stakeholder Persona (Fleet Dispatch Director / Transit Planner)"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div 
                className="w-7 h-7 rounded-md flex items-center justify-center font-bold text-xs font-mono shrink-0"
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
                  <div className={`font-bold text-xs truncate ${theme === 'dark' ? 'text-[#F4F5F7]' : 'text-[#0E1015]'}`}>
                    {currentAccount.name}
                  </div>
                  <div className={`text-[10px] truncate ${theme === 'dark' ? 'text-[#949AA8]' : 'text-[#6B7280]'}`}>
                    {currentAccount.title}
                  </div>
                </div>
              )}
            </div>

            {!isCollapsed && (
              <span className={`text-[10px] text-[#6B7280] transition-transform ${accountMenuOpen ? 'rotate-180' : ''}`}>▼</span>
            )}
          </button>

          {/* Account Profile Switcher Dropdown (2 Roles) */}
          {accountMenuOpen && (
            <div className={`absolute bottom-full left-0 mb-1.5 w-72 rounded-md border p-3 z-50 animate-in fade-in zoom-in-95 ${
              theme === 'dark' ? 'bg-[#151820] border-[#2A2F3D] text-[#F4F5F7]' : 'bg-[#F4F5F7] border-[#CED2DA] text-[#0E1015]'
            }`}>
              <div className={`pb-2 mb-2 border-b ${theme === 'dark' ? 'border-[#2A2F3D]' : 'border-[#CED2DA]'}`}>
                <span className={`text-[10px] font-mono uppercase tracking-wider block font-bold ${
                  theme === 'dark' ? 'text-[#949AA8]' : 'text-[#6B7280]'
                }`}>
                  Signed-In Persona
                </span>
                <div className="text-xs font-bold mt-0.5 truncate">
                  {currentAccount.organization}
                </div>
              </div>

              <div className={`text-[10px] font-mono uppercase tracking-wider px-1 pb-1 font-bold ${
                theme === 'dark' ? 'text-[#949AA8]' : 'text-[#6B7280]'
              }`}>
                Switch Stakeholder Role:
              </div>

              <div className="space-y-1">
                {Object.values(ACCOUNTS).map((acc) => {
                  const isSelected = activeAccountRole === acc.roleKey;
                  return (
                    <button
                      key={acc.id}
                      onClick={() => {
                        setActiveAccountRole(acc.roleKey);
                        if (acc.roleKey === 'fleet') setActiveView('dispatch');
                        if (acc.roleKey === 'planner') setActiveView('planner');
                        setAccountMenuOpen(false);
                      }}
                      className={`w-full text-left p-2 rounded-md border transition flex items-start gap-2.5 ${
                        isSelected
                          ? theme === 'dark'
                            ? 'bg-[#1D212C] border-[#DC2626]/70'
                            : 'bg-[#DFE2E7] border-[#DC2626]/70'
                          : theme === 'dark'
                            ? 'bg-[#0E1015] border-[#2A2F3D] hover:border-[#3B4254]'
                            : 'bg-[#EBECEF] border-[#CED2DA] hover:border-[#949AA8]'
                      }`}
                    >
                      <div 
                        className="w-7 h-7 rounded-md flex items-center justify-center font-bold text-[10px] font-mono shrink-0 mt-0.5"
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
                          {isSelected && <span className="text-[10px] font-mono font-bold text-[#DC2626]">Active</span>}
                        </div>
                        <div className="text-[10px] font-bold truncate" style={{ color: acc.badgeColor }}>
                          {acc.title}
                        </div>
                        <div className={`text-[9px] truncate mt-0.5 ${
                          theme === 'dark' ? 'text-[#949AA8]' : 'text-[#6B7280]'
                        }`}>
                          {acc.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className={`mt-2 pt-2 border-t text-[10px] font-mono text-center ${
                theme === 'dark' ? 'border-[#2A2F3D] text-[#6B7280]' : 'border-[#CED2DA] text-[#6B7280]'
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
