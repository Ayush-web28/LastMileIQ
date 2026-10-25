import React, { useState, useRef, useEffect } from 'react';
import { useSimulation } from '../../context/SimulationContext';

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
      className={`fixed lg:sticky top-0 left-0 z-40 h-screen transition-all duration-200 border-r border-[#CED2DA] bg-[#EBECEF] text-[#0E1015] flex flex-col justify-between select-none ${
        isCollapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Top Section: Brand Header & Selected Corridor Display */}
      <div className="p-4 space-y-3 border-b border-[#CED2DA]">
        
        {/* Brand Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-base tracking-tight text-[#0E1015]">
                  LastMile<span className="text-[#DC2626]">IQ</span>
                </span>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/30">
                  Mumbai
                </span>
              </div>
              <p className="text-[9px] font-mono tracking-wider text-[#6B7280]">
                DISPATCH OS
              </p>
            </div>
          </div>
        </div>

        {/* Network Mode Slider (Metro in Red vs Local in Cobalt Blue) */}
        {!isCollapsed && (
          <div className="relative space-y-2" ref={corridorRef}>
            {/* Segmented Slider Track */}
            <div className="p-1 rounded-md border border-[#CED2DA] bg-[#DFE2E7] flex items-center relative transition-colors">
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
                    ? 'bg-[#DC2626] text-white border border-[#DC2626]'
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
                    ? 'bg-[#DC2626] text-white border border-[#DC2626]'
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
              className="w-full flex items-center justify-between p-2.5 rounded-md border border-[#CED2DA] bg-[#F4F5F7] hover:border-[#475060] transition-colors text-left cursor-pointer"
              title={`Click to choose from ${corridorCategory === 'metro' ? 'Mumbai Metro Lines' : 'Mumbai Suburban Local Lines'}`}
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <span 
                  className="w-3 h-3 rounded-full shrink-0" 
                  style={{ backgroundColor: activeCorridor.color }} 
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[9px] font-mono font-bold block uppercase tracking-wide leading-none mb-1 text-[#DC2626]">
                    {corridorCategory === 'metro' ? 'Metro Line' : 'Suburban Local'}
                  </span>
                  <span className="font-bold text-xs leading-tight block break-words text-[#0E1015]">
                    {activeCorridor.shortName}
                  </span>
                  <span className="text-[10px] block leading-tight mt-0.5 text-[#6B7280]">
                    {activeCorridor.stationsCount} Stations • {activeCorridor.lengthKm} km
                  </span>
                </div>
              </div>

              <span className={`text-[10px] text-[#6B7280] transition-transform ${corridorMenuOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {/* Categorized Corridor Dropdown Menu */}
            {corridorMenuOpen && (
              <div className="absolute left-0 mt-1.5 w-full rounded-md border border-[#CED2DA] bg-[#F4F5F7] text-[#0E1015] p-2 z-50 animate-in fade-in zoom-in-95 max-h-[360px] overflow-y-auto">
                {corridorCategory === 'metro' ? (
                  <>
                    <div className="px-2 py-1 mb-1 border-b border-[#CED2DA]">
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
                              ? 'bg-[#DFE2E7] border border-[#DC2626]/40 text-[#0E1015] font-bold'
                              : 'hover:bg-[#DFE2E7] text-[#475060]'
                          }`}
                        >
                          <span className="w-2.5 h-2.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: item.color }} />
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-xs break-words">{item.shortName || item.name}</div>
                            <div className="text-[10px] text-[#6B7280]">
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
                    <div className="px-2 py-1 mb-1 border-b border-[#CED2DA]">
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
                              ? 'bg-[#DFE2E7] border border-[#2563EB]/40 text-[#0E1015] font-bold'
                              : 'hover:bg-[#DFE2E7] text-[#475060]'
                          }`}
                        >
                          <span className="w-2.5 h-2.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: item.color }} />
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-xs break-words">{item.shortName || item.name}</div>
                            <div className="text-[10px] text-[#6B7280]">
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
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#6B7280]">
              Navigation Views
            </span>
            <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border bg-[#7C3AED]/10 text-[#7C3AED] border-[#7C3AED]/30">
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
                  ? 'bg-[#DFE2E7] border border-[#7C3AED]/50 text-[#0E1015] font-bold'
                  : 'text-[#475060] hover:text-[#0E1015] hover:bg-[#DFE2E7]'
              } ${isCollapsed ? 'justify-center' : ''}`}
              title={item.label}
            >
              <span className="truncate">{item.label}</span>
              {!isCollapsed && item.badge && (
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-[#7C3AED]/15 text-[#7C3AED]">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Section: 2-Account Persona Switcher */}
      <div className="p-3 border-t border-[#CED2DA] space-y-2.5">
        
        {/* 2-Account System Role Switcher */}
        <div className="relative" ref={accountRef}>
          <button
            onClick={() => setAccountMenuOpen(!accountMenuOpen)}
            className="w-full flex items-center gap-2.5 p-2 rounded-md border border-[#CED2DA] bg-[#F4F5F7] hover:border-[#475060] transition-colors text-left text-xs"
            title="Switch Stakeholder Persona (Fleet Dispatch Director / Transit Planner)"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div 
                className="w-7 h-7 rounded-md flex items-center justify-center font-bold text-xs font-mono shrink-0"
                style={{ 
                  backgroundColor: `${currentAccount.badgeColor}15`, 
                  color: currentAccount.badgeColor,
                  border: `1.5px solid ${currentAccount.badgeColor}40` 
                }}
              >
                {currentAccount.initials}
              </div>

              {!isCollapsed && (
                <div className="truncate min-w-0">
                  <div className="font-bold text-xs truncate text-[#0E1015]">
                    {currentAccount.name}
                  </div>
                  <div className="text-[10px] truncate text-[#6B7280]">
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
            <div className="absolute bottom-full left-0 mb-1.5 w-72 rounded-md border border-[#CED2DA] bg-[#F4F5F7] text-[#0E1015] p-3 z-50 animate-in fade-in zoom-in-95">
              <div className="pb-2 mb-2 border-b border-[#CED2DA]">
                <span className="text-[10px] font-mono uppercase tracking-wider block font-bold text-[#6B7280]">
                  Signed-In Persona
                </span>
                <div className="text-xs font-bold mt-0.5 truncate">
                  {currentAccount.organization}
                </div>
              </div>

              <div className="text-[10px] font-mono uppercase tracking-wider px-1 pb-1 font-bold text-[#6B7280]">
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
                          ? 'bg-[#DFE2E7] border-[#475060]'
                          : 'bg-[#EBECEF] border-[#CED2DA] hover:border-[#949AA8]'
                      }`}
                    >
                      <div 
                        className="w-7 h-7 rounded-md flex items-center justify-center font-bold text-[10px] font-mono shrink-0 mt-0.5"
                        style={{ 
                          backgroundColor: `${acc.badgeColor}15`, 
                          color: acc.badgeColor,
                          border: `1px solid ${acc.badgeColor}40` 
                        }}
                      >
                        {acc.initials}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold truncate">{acc.name}</span>
                          {isSelected && <span className="text-[10px] font-mono font-bold text-[#059669]">Active</span>}
                        </div>
                        <div className="text-[10px] font-bold truncate" style={{ color: acc.badgeColor }}>
                          {acc.title}
                        </div>
                        <div className="text-[9px] truncate mt-0.5 text-[#6B7280]">
                          {acc.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-2 pt-2 border-t border-[#CED2DA] text-[10px] font-mono text-[#6B7280] text-center">
                Mumbai Transit Authority SSO
              </div>
            </div>
          )}
        </div>

      </div>
    </aside>
  );
}
