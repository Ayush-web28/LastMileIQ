import React, { useState, useRef, useEffect } from 'react';
import { useSimulation } from '../context/SimulationContext';

export default function Navbar({ 
  currentCorridor, 
  setCorridor, 
  corridors
}) {
  const { activeAccountRole, setActiveAccountRole, currentAccount, ACCOUNTS } = useSimulation();
  
  const [corridorMenuOpen, setCorridorMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const corridorRef = useRef(null);
  const accountRef = useRef(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (corridorRef.current && !corridorRef.current.contains(event.target)) {
        setCorridorMenuOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeCorridorData = corridors[currentCorridor] || corridors['mumbai-metro-1'];

  // Categorize Mumbai Corridors
  const metroLines = Object.entries(corridors).filter(([_, item]) => item.category === 'metro');
  const localLines = Object.entries(corridors).filter(([_, item]) => item.category === 'local');

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0E1015] border-b border-[#2A2F3D] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-2.5">
          <span className="font-extrabold text-base tracking-tight text-[#F4F5F7]">
            LastMile<span className="text-[#DC2626]">IQ</span>
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#DC2626]/15 text-[#DC2626] border border-[#DC2626]/30 font-bold">
            Mumbai
          </span>
          <span className="text-[10px] text-[#6B7280] font-mono tracking-wider hidden sm:inline">
            DISPATCH OS
          </span>
        </div>

        {/* Center: Transit Corridor Dropdown */}
        <div className="relative" ref={corridorRef}>
          <button
            onClick={() => setCorridorMenuOpen(!corridorMenuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#151820] border border-[#2A2F3D] hover:border-[#DC2626]/50 transition-colors text-xs font-medium text-[#F4F5F7]"
          >
            <div className="text-left">
              <span className="text-[#6B7280] block text-[9px] uppercase tracking-wider font-mono">
                {activeCorridorData.categoryLabel}
              </span>
              <span className="font-bold text-[#F4F5F7] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeCorridorData.color }} />
                <span>{activeCorridorData.shortName}</span>
              </span>
            </div>
            <span className={`text-[10px] text-[#6B7280] transition-transform ${corridorMenuOpen ? 'rotate-180' : ''}`}>▼</span>
          </button>

          {corridorMenuOpen && (
            <div className="absolute left-0 mt-1.5 w-80 rounded-md bg-[#151820] border border-[#2A2F3D] p-2 z-50 animate-in fade-in zoom-in-95 max-h-[440px] overflow-y-auto">
              
              {/* Group 1: 6 Metro Lines */}
              <div className="text-[10px] font-mono text-[#DC2626] px-2 py-1 uppercase tracking-wider font-bold">
                Mumbai Metro (6 Lines)
              </div>
              {metroLines.map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => {
                    setCorridor(key);
                    setCorridorMenuOpen(false);
                  }}
                  className={`w-full text-left p-2 rounded-md flex items-start gap-2.5 transition text-xs mb-0.5 ${
                    currentCorridor === key
                      ? 'bg-[#1D212C] border border-[#DC2626]/40 text-[#DC2626] font-bold'
                      : 'hover:bg-[#1D212C] text-[#949AA8]'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: item.color }} />
                  <div>
                    <div className="font-bold text-xs">{item.name}</div>
                    <div className="text-[10px] text-[#6B7280]">
                      {item.stationsCount} Stations • {item.lengthKm} km
                    </div>
                  </div>
                </button>
              ))}

              {/* Group 2: 3 Suburban Local Lines */}
              <div className="text-[10px] font-mono text-[#2563EB] px-2 pt-3 py-1 uppercase tracking-wider font-bold border-t border-[#2A2F3D] mt-2">
                Mumbai Suburban Local (3 Lines)
              </div>
              {localLines.map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => {
                    setCorridor(key);
                    setCorridorMenuOpen(false);
                  }}
                  className={`w-full text-left p-2 rounded-md flex items-start gap-2.5 transition text-xs mb-0.5 ${
                    currentCorridor === key
                      ? 'bg-[#1D212C] border border-[#2563EB]/40 text-[#2563EB] font-bold'
                      : 'hover:bg-[#1D212C] text-[#949AA8]'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: item.color }} />
                  <div>
                    <div className="font-bold text-xs">{item.name}</div>
                    <div className="text-[10px] text-[#6B7280]">
                      {item.stationsCount} Stations • {item.lengthKm} km
                    </div>
                  </div>
                </button>
              ))}

            </div>
          )}
        </div>

        {/* Right: Account System Role Switcher */}
        <div className="relative" ref={accountRef}>
          <button
            onClick={() => setAccountMenuOpen(!accountMenuOpen)}
            className="flex items-center gap-2.5 p-1.5 pr-3 rounded-md bg-[#151820] border border-[#2A2F3D] hover:border-[#DC2626]/50 transition-colors text-xs"
          >
            {/* User Avatar */}
            <div 
              className="w-7 h-7 rounded-md flex items-center justify-center font-bold text-[11px] font-mono"
              style={{ 
                backgroundColor: `${currentAccount.badgeColor}20`, 
                color: currentAccount.badgeColor,
                border: `1.5px solid ${currentAccount.badgeColor}50` 
              }}
            >
              {currentAccount.initials}
            </div>

            {/* User Name & Role */}
            <div className="text-left hidden sm:block">
              <div className="text-[#F4F5F7] font-bold leading-tight flex items-center gap-1.5">
                <span>{currentAccount.name}</span>
              </div>
              <span className="text-[10px] font-mono text-[#949AA8] block leading-tight">
                {currentAccount.title}
              </span>
            </div>

            <span className={`text-[10px] text-[#6B7280] transition-transform ${accountMenuOpen ? 'rotate-180' : ''}`}>▼</span>
          </button>

          {/* Account Profile Switcher Dropdown */}
          {accountMenuOpen && (
            <div className="absolute right-0 mt-1.5 w-72 rounded-md bg-[#151820] border border-[#2A2F3D] p-3 z-50 animate-in fade-in zoom-in-95">
              
              <div className="pb-2 mb-2 border-b border-[#2A2F3D]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280] block font-bold">
                  Logged In Account Profile
                </span>
                <div className="text-xs font-bold text-[#F4F5F7] mt-1">
                  {currentAccount.organization}
                </div>
              </div>

              <div className="text-[10px] font-mono text-[#6B7280] uppercase tracking-wider px-1 pb-1 font-bold">
                Switch Role / Persona:
              </div>

              <div className="space-y-1">
                {Object.values(ACCOUNTS).map((acc) => {
                  const isSelected = activeAccountRole === acc.roleKey;
                  return (
                    <button
                      key={acc.id}
                      onClick={() => {
                        setActiveAccountRole(acc.roleKey);
                        setAccountMenuOpen(false);
                      }}
                      className={`w-full text-left p-2 rounded-md border transition flex items-start gap-2.5 ${
                        isSelected
                          ? 'bg-[#1D212C] border-[#DC2626]/60'
                          : 'bg-[#0E1015] border-[#2A2F3D] hover:border-[#3B4254]'
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
                          <span className="text-xs font-bold text-[#F4F5F7] truncate">{acc.name}</span>
                          {isSelected && <span className="text-[10px] font-mono font-bold text-[#DC2626]">Active</span>}
                        </div>
                        <div className="text-[10px] font-bold" style={{ color: acc.badgeColor }}>
                          {acc.title}
                        </div>
                        <div className="text-[9px] text-[#949AA8] truncate mt-0.5">
                          {acc.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-2 pt-2 border-t border-[#2A2F3D] text-[10px] font-mono text-[#6B7280] text-center">
                Signed in via Mumbai SSO • Session Active
              </div>

            </div>
          )}
        </div>

      </div>
    </header>
  );
}
