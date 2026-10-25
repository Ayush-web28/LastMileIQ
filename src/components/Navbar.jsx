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
    <header className="sticky top-0 z-50 w-full bg-[#0B1612] border-b border-[#1E3A2C] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-2.5">
          <span className="font-extrabold text-base tracking-tight text-white">
            LastMile<span className="text-[#3DB87E]">IQ</span>
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#3DB87E]/15 text-[#3DB87E] border border-[#3DB87E]/30 font-semibold">
            Mumbai
          </span>
          <span className="text-[10px] text-slate-500 font-mono tracking-wider hidden sm:inline">
            DISPATCH OS
          </span>
        </div>

        {/* Center: Transit Corridor Dropdown (6 Metro Lines + 3 Local Lines with colored dots) */}
        <div className="relative" ref={corridorRef}>
          <button
            onClick={() => setCorridorMenuOpen(!corridorMenuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#11231B] border border-[#1E3A2C] hover:border-[#3DB87E]/50 transition-colors text-xs font-medium text-slate-200"
          >
            <div className="text-left">
              <span className="text-slate-400 block text-[9px] uppercase tracking-wider font-mono">
                {activeCorridorData.categoryLabel}
              </span>
              <span className="font-semibold text-slate-100 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeCorridorData.color }} />
                <span>{activeCorridorData.shortName}</span>
              </span>
            </div>
            <span className={`text-[10px] text-slate-400 transition-transform ${corridorMenuOpen ? 'rotate-180' : ''}`}>▼</span>
          </button>

          {corridorMenuOpen && (
            <div className="absolute left-0 mt-1.5 w-80 rounded-lg bg-[#11231B] border border-[#1E3A2C] p-2 z-50 animate-in fade-in zoom-in-95 max-h-[440px] overflow-y-auto">
              
              {/* Group 1: 6 Metro Lines */}
              <div className="text-[10px] font-mono text-[#3DB87E] px-2 py-1 uppercase tracking-wider font-bold">
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
                      ? 'bg-[#3DB87E]/15 border border-[#3DB87E]/40 text-[#3DB87E]'
                      : 'hover:bg-[#183327] text-slate-300'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: item.color }} />
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-[10px] text-slate-400">
                      {item.stationsCount} Stations • {item.lengthKm} km
                    </div>
                  </div>
                </button>
              ))}

              {/* Group 2: 3 Suburban Local Lines (Distinct dot colors) */}
              <div className="text-[10px] font-mono text-[#C4829E] px-2 pt-3 py-1 uppercase tracking-wider font-bold border-t border-[#1E3A2C] mt-2">
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
                      ? 'bg-[#C4829E]/15 border border-[#C4829E]/40 text-[#C4829E]'
                      : 'hover:bg-[#183327] text-slate-300'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: item.color }} />
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-[10px] text-slate-400">
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
            className="flex items-center gap-2.5 p-1.5 pr-3 rounded-lg bg-[#11231B] border border-[#1E3A2C] hover:border-[#3DB87E]/50 transition-colors text-xs"
          >
            {/* User Avatar Circle */}
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

            {/* User Name & Role Pill */}
            <div className="text-left hidden sm:block">
              <div className="text-white font-bold leading-tight flex items-center gap-1.5">
                <span>{currentAccount.name}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 block leading-tight">
                {currentAccount.title}
              </span>
            </div>

            <span className={`text-[10px] text-slate-400 transition-transform ${accountMenuOpen ? 'rotate-180' : ''}`}>▼</span>
          </button>

          {/* Account Profile Switcher Dropdown */}
          {accountMenuOpen && (
            <div className="absolute right-0 mt-1.5 w-72 rounded-lg bg-[#11231B] border border-[#1E3A2C] p-3 z-50 animate-in fade-in zoom-in-95">
              
              <div className="pb-2 mb-2 border-b border-[#1E3A2C]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">
                  Logged In Account Profile
                </span>
                <div className="text-xs font-bold text-white mt-1">
                  {currentAccount.organization}
                </div>
              </div>

              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider px-1 pb-1 font-semibold">
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
                          ? 'bg-[#183327] border-[#3DB87E]/60'
                          : 'bg-[#0B1612]/60 border-[#1E3A2C] hover:border-[#2C523F]'
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
                          <span className="text-xs font-bold text-white truncate">{acc.name}</span>
                          {isSelected && <span className="text-[10px] font-mono font-bold text-[#3DB87E]">Active</span>}
                        </div>
                        <div className="text-[10px] font-medium" style={{ color: acc.badgeColor }}>
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

              <div className="mt-2 pt-2 border-t border-[#1E3A2C]/80 text-[10px] font-mono text-slate-500 text-center">
                Signed in via Mumbai SSO • Session Active
              </div>

            </div>
          )}
        </div>

      </div>
    </header>
  );
}
        </div>

      </div>
    </header>
  );
}
