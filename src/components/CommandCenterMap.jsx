import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useSimulation } from '../context/SimulationContext';
import { 
  RefreshCw,
  Map,
  Satellite,
  ChevronUp,
  Check,
  Eye,
  EyeOff,
  Navigation
} from 'lucide-react';

export default function CommandCenterMap({ className = '' }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const markersLayerRef = useRef(null);
  const routesLayerRef = useRef(null);
  const dispatchVectorsLayerRef = useRef(null);
  const markersMapRef = useRef({});
  const stationMenuRef = useRef(null);

  const {
    theme,
    currentCorridorKey,
    activeCorridor,
    computedStations,
    currentStation,
    selectedStationId,
    setSelectedStationId,
    dispatchEvents,
    executeAutoDispatch,
    mapFilters,
    toggleMapFilter,
    setMapType,
    mapViewBounds,
    setMapViewBounds,
  } = useSimulation();

  // Helper function to guard coordinate validity
  const isValidCoord = (n) => typeof n === 'number' && !isNaN(n);

  // Persistent Layer & Map Type Filters from SimulationContext
  const { 
    mapType = 'roadmap', 
    showHeatRings = true, 
    showStands = true, 
    showVehicles = true, 
    showTransitTrack = true 
  } = mapFilters || {};

  const [stationMenuOpen, setStationMenuOpen] = useState(false);

  // Close station dropup on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (stationMenuRef.current && !stationMenuRef.current.contains(e.target)) {
        setStationMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Initialize Leaflet Map with Google Maps Tiles
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    if (mapContainerRef.current._leaflet_id) {
      delete mapContainerRef.current._leaflet_id;
    }

    const initialCenter = (mapViewBounds?.center && isValidCoord(mapViewBounds.center[0]) && isValidCoord(mapViewBounds.center[1]))
      ? mapViewBounds.center
      : (activeCorridor?.center || [19.1176, 72.8680]);
    const initialZoom = (mapViewBounds?.zoom && isValidCoord(mapViewBounds.zoom))
      ? mapViewBounds.zoom
      : (activeCorridor?.zoom || 13);

    let map;
    try {
      map = L.map(mapContainerRef.current, {
        center: initialCenter,
        zoom: initialZoom,
        zoomControl: false,
        attributionControl: false,
      });
    } catch (e) {
      if (mapContainerRef.current._leaflet_id) {
        delete mapContainerRef.current._leaflet_id;
      }
      try {
        map = L.map(mapContainerRef.current, {
          center: initialCenter,
          zoom: initialZoom,
          zoomControl: false,
          attributionControl: false,
        });
      } catch (err) {
        console.error('Failed to initialize map:', err);
        return;
      }
    }

    // Persist user pan & zoom to context
    map.on('moveend', () => {
      try {
        const center = map.getCenter();
        const zoom = map.getZoom();
        if (center && isValidCoord(center.lat) && isValidCoord(center.lng)) {
          setMapViewBounds({ center: [center.lat, center.lng], zoom });
        }
      } catch {
        // safe fallback
      }
    });

    // Google Maps Tiles
    const googleTilesUrl = mapType === 'satellite'
      ? 'https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'
      : 'https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';

    const baseTiles = L.tileLayer(googleTilesUrl, {
      maxZoom: 20,
      subdomains: ['0', '1', '2', '3'],
      attribution: '&copy; Google Maps',
    }).addTo(map);

    tileLayerRef.current = baseTiles;

    // Zoom control at bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    const routesLayer = L.layerGroup().addTo(map);
    const markersLayer = L.layerGroup().addTo(map);
    const dispatchVectorsLayer = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;
    routesLayerRef.current = routesLayer;
    markersLayerRef.current = markersLayer;
    dispatchVectorsLayerRef.current = dispatchVectorsLayer;

    return () => {
      try {
        if (map) {
          map.remove();
        }
      } catch {
        // ignore
      }
      mapInstanceRef.current = null;
      if (mapContainerRef.current && mapContainerRef.current._leaflet_id) {
        delete mapContainerRef.current._leaflet_id;
      }
    };
  }, []);

  // Switch Tile Layer between Google Roadmap & Google Satellite
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !tileLayerRef.current) return;

    map.removeLayer(tileLayerRef.current);

    const googleTilesUrl = mapType === 'satellite'
      ? 'https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'
      : 'https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';

    const newTiles = L.tileLayer(googleTilesUrl, {
      maxZoom: 20,
      subdomains: ['0', '1', '2', '3'],
      attribution: '&copy; Google Maps',
    }).addTo(map);

    newTiles.bringToBack();
    tileLayerRef.current = newTiles;
  }, [mapType]);

  // Recenter when corridor changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !activeCorridor || !activeCorridor.center) return;
    const [cLat, cLng] = activeCorridor.center;
    if (!isValidCoord(cLat) || !isValidCoord(cLng)) return;

    try {
      map.flyTo([cLat, cLng], activeCorridor.zoom || 13, {
        duration: 0.9,
        easeLinearity: 0.25,
      });
    } catch {
      map.setView([cLat, cLng], activeCorridor.zoom || 13);
    }
  }, [currentCorridorKey]);

  // Synchronize Map with selectedStationId: flyTo station and open its telemetry popup
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !currentStation) return;
    const { lat, lng, id } = currentStation;
    if (!isValidCoord(lat) || !isValidCoord(lng)) return;

    let currentZoom = 13;
    try {
      const z = map.getZoom();
      if (isValidCoord(z)) currentZoom = z;
    } catch {
      currentZoom = 13;
    }
    const targetZoom = Math.max(currentZoom, 14);

    try {
      map.flyTo([lat, lng], targetZoom, {
        animate: true,
        duration: 0.7,
      });
    } catch {
      map.setView([lat, lng], targetZoom);
    }

    const marker = markersMapRef.current[id];
    if (marker) {
      setTimeout(() => {
        try {
          marker.openPopup();
        } catch {
          // popup safe fallback
        }
      }, 350);
    }
  }, [currentStation?.id]);

  // Render Map Features (Station Highlights, Transit Tracks, Feeder Stands, LMSI Heat Rings)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !markersLayerRef.current || !routesLayerRef.current) return;

    const markersLayer = markersLayerRef.current;
    const routesLayer = routesLayerRef.current;
    const vectorsLayer = dispatchVectorsLayerRef.current;

    markersLayer.clearLayers();
    routesLayer.clearLayers();
    if (vectorsLayer) vectorsLayer.clearLayers();
    markersMapRef.current = {};

    const isMetro = activeCorridor.category === 'metro';
    const corridorColor = activeCorridor.color || (isMetro ? '#0284C7' : '#EF4444');

    // 1. Draw High-Visibility Transit Track Polylines
    const validStations = computedStations.filter(
      (s) => isValidCoord(s.lat) && isValidCoord(s.lng)
    );

    if (showTransitTrack && validStations.length > 1) {
      const latlngs = validStations.map((s) => [s.lat, s.lng]);

      // Outer Glow Polyline
      L.polyline(latlngs, {
        color: corridorColor,
        weight: 9,
        opacity: 0.35,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(routesLayer);

      // Inner Sharp Polyline
      L.polyline(latlngs, {
        color: corridorColor,
        weight: 4.5,
        opacity: 0.95,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(routesLayer);

      // Accent Dashed Core
      L.polyline(latlngs, {
        color: '#FFFFFF',
        weight: 2,
        opacity: 0.85,
        dashArray: '8, 8',
      }).addTo(routesLayer);
    }

    // 2. Plot Stations with Prominent Highlighting & LMSI Stress Rings
    computedStations.forEach((stn) => {
      if (!isValidCoord(stn.lat) || !isValidCoord(stn.lng)) return;
      const isSelected = currentStation?.id === stn.id;
      const lmsiColor = stn.lmsi?.color || '#10B981';

      // LMSI Heat/Coverage Radial Ring
      if (showHeatRings) {
        const radiusMeters = stn.lmsi?.level === 'CRITICAL' ? 1000 : stn.lmsi?.level === 'WARNING' ? 750 : 550;
        const ring = L.circle([stn.lat, stn.lng], {
          radius: radiusMeters,
          color: lmsiColor,
          fillColor: lmsiColor,
          fillOpacity: stn.lmsi?.level === 'CRITICAL' ? 0.28 : 0.16,
          weight: isSelected ? 2.5 : 1.2,
          dashArray: isSelected ? '4, 4' : null,
        }).addTo(markersLayer);

        ring.on('click', () => setSelectedStationId(stn.id));
      }

      // High-Contrast Station Pin Icon
      const iconGlyph = isMetro ? '🚇' : '🚆';
      const cleanStationName = stn.name.split(' (')[0];

      const stationIcon = L.divIcon({
        className: 'custom-station-pin',
        html: `
          <div class="relative flex flex-col items-center justify-center cursor-pointer group select-none">
            ${
              isSelected
                ? `<div class="absolute -inset-2.5 rounded-full animate-ping opacity-60 pointer-events-none" style="background-color: ${lmsiColor}"></div>`
                : ''
            }
            <!-- Station Icon Node -->
            <div class="relative flex items-center justify-center w-8 h-8 rounded-xl font-mono font-black text-xs text-white shadow-2xl transition-all duration-200 transform group-hover:scale-115 ${
              isSelected ? 'scale-110 ring-4 ring-white/90 shadow-[#3DB87E]/50' : 'hover:scale-105'
            }"
                 style="background: linear-gradient(135deg, #0B1612 0%, #11231B 100%); border: 2.5px solid ${lmsiColor}; box-shadow: 0 4px 14px ${lmsiColor}80, 0 2px 6px rgba(0,0,0,0.8);">
              <span class="text-[12px]">${stn.code}</span>
              <span class="absolute -top-1.5 -right-1.5 text-[10px] leading-none">${iconGlyph}</span>
            </div>

            <!-- Prominent Station Name Label Pill -->
            <div class="mt-1 px-2 py-0.5 rounded-md text-[10px] font-sans font-bold whitespace-nowrap shadow-xl border pointer-events-none transition-all ${
              isSelected 
                ? 'bg-[#0B1612] text-white border-[#3DB87E] ring-1 ring-[#3DB87E]/40 scale-105' 
                : 'bg-[#11231B]/95 text-[#F2F7F4] border-[#1E3A2C]'
            }">
              ${cleanStationName}
            </div>
          </div>
        `,
        iconSize: [44, 48],
        iconAnchor: [22, 20],
      });

      const stnMarker = L.marker([stn.lat, stn.lng], { icon: stationIcon }).addTo(markersLayer);
      markersMapRef.current[stn.id] = stnMarker;
      
      // Popup with Station Telemetry & Quick Dispatch Trigger
      const popupContent = `
        <div style="font-family: Inter, sans-serif; min-width: 200px; color: #0F172A; padding: 4px;">
          <div style="font-weight: 800; font-size: 13px; margin-bottom: 2px;">
            ${stn.name}
          </div>
          <div style="font-size: 11px; font-family: monospace; color: ${corridorColor}; font-weight: bold; margin-bottom: 6px;">
            ${activeCorridor.shortName} • ${stn.code}
          </div>
          <div style="background: #F1F5F9; border-radius: 8px; padding: 6px 8px; font-size: 11px; margin-bottom: 6px; line-height: 1.4;">
            <div><strong>Deficit Gate:</strong> ${stn.highDeficitGate?.gateName || 'Main Gate'}</div>
            <div><strong>Exit Commuters:</strong> ${stn.highDeficitGate?.expectedCommuters || stn.highDeficitGate?.lastMileSeekers || 0} pax</div>
            <div><strong>Vehicle Shortage:</strong> <span style="color: ${lmsiColor}; font-weight: bold;">${stn.highDeficitGate?.deficit || 0} vehicles</span></div>
            <div><strong>Wait Time:</strong> ${stn.lmsi?.expectedWaitMinutes || '0'} min (${stn.lmsi?.level || 'NOMINAL'})</div>
          </div>
          <div style="font-size: 10px; color: #64748B;">
            Station synchronized with bottom control dropdown
          </div>
        </div>
      `;

      stnMarker.bindPopup(popupContent);
      stnMarker.on('click', () => {
        setSelectedStationId(stn.id);
      });

      // 3. Feeder Auto & EV Stands
      if (showStands && stn.stands && Array.isArray(stn.stands)) {
        stn.stands.forEach((stand) => {
          if (!stand || !isValidCoord(stand.lat) || !isValidCoord(stand.lng)) return;
          const isEv = stand.type === 'EV_STAND';
          const standIcon = L.divIcon({
            className: 'custom-stand-pin',
            html: `
              <div class="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-mono font-black shadow-md cursor-pointer border border-white"
                   style="background-color: ${isEv ? '#3DB87E' : '#C4829E'}; color: #0B1612;"
                   title="${stand.name}: ${stand.currentVehicles} available vehicles">
                ${stand.currentVehicles}
              </div>
            `,
            iconSize: [20, 20],
            iconAnchor: [10, 10],
          });

          L.marker([stand.lat, stand.lng], { icon: standIcon }).addTo(markersLayer);

          // Connector line between station and stand
          L.polyline([[stn.lat, stn.lng], [stand.lat, stand.lng]], {
            color: isEv ? '#3DB87E' : '#C4829E',
            weight: 2,
            opacity: 0.55,
            dashArray: '3, 4',
          }).addTo(markersLayer);
        });
      }
    });

    // 4. Moving Feeder Vehicles
    if (showVehicles && dispatchEvents.length > 0 && vectorsLayer) {
      dispatchEvents.slice(0, 5).forEach((disp, idx) => {
        const stn = computedStations.find((s) => s.name === disp.stationName || s.name.startsWith(disp.stationName?.split(' ')[0])) || currentStation;
        if (!stn || !isValidCoord(stn.lat) || !isValidCoord(stn.lng)) return;

        const angle = (idx * 72 * Math.PI) / 180;
        const dist = 0.0035 + (idx % 2) * 0.002;
        const vLat = stn.lat + Math.sin(angle) * dist;
        const vLng = stn.lng + Math.cos(angle) * dist;

        if (!isValidCoord(vLat) || !isValidCoord(vLng)) return;

        const vehicleIcon = L.divIcon({
          className: 'custom-vehicle-pin',
          html: `
            <div class="px-2 py-0.5 rounded-md bg-[#3DB87E] text-[#0B1612] font-mono text-[9px] font-black shadow-lg flex items-center gap-1 border border-white animate-pulse">
              <span>⚡</span>
              <span>${disp.plate ? disp.plate.slice(-4) : 'FEED'}</span>
            </div>
          `,
          iconSize: [40, 20],
          iconAnchor: [20, 10],
        });

        L.marker([vLat, vLng], { icon: vehicleIcon }).addTo(vectorsLayer);
      });
    }

  }, [
    computedStations,
    currentStation,
    showHeatRings,
    showStands,
    showVehicles,
    showTransitTrack,
    dispatchEvents,
    activeCorridor,
    mapType,
  ]);

  // Invalidate map size on view or dimension updates
  useEffect(() => {
    const timer = setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [activeCorridor, mapType]);

  return (
    <div className={`w-full flex-1 flex flex-col min-h-0 ${className}`}>
      {/* Map Canvas Frame */}
      <div className={`relative w-full flex-1 min-h-[420px] rounded-2xl overflow-hidden border shadow-xl ${
        theme === 'dark' ? 'border-[#1E3A2C] bg-[#0B1612]' : 'border-[#D1E0D6] bg-white'
      }`}>
        {/* Leaflet Map Canvas */}
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* ONLY Recenter Floating Icon Button (Top Left) */}
        <div className="absolute top-3 left-3 z-10">
          <button
            onClick={() => {
              const map = mapInstanceRef.current;
              if (!map || !activeCorridor || !activeCorridor.center) return;
              const [cLat, cLng] = activeCorridor.center;
              if (!isValidCoord(cLat) || !isValidCoord(cLng)) return;
              try {
                map.flyTo([cLat, cLng], activeCorridor.zoom || 13, { duration: 0.8 });
              } catch {
                map.setView([cLat, cLng], activeCorridor.zoom || 13);
              }
            }}
            className={`p-2.5 rounded-xl border backdrop-blur-md shadow-lg transition active:scale-95 ${
              theme === 'dark'
                ? 'bg-[#11231B]/90 border-[#1E3A2C] text-slate-200 hover:text-white hover:border-[#3DB87E]/60'
                : 'bg-white/95 border-[#D1E0D6] text-slate-700 hover:text-black hover:border-[#3DB87E]/60'
            }`}
            title="Recenter Map on Corridor"
          >
            <RefreshCw className="w-4 h-4 text-[#3DB87E]" />
          </button>
        </div>
      </div>

      {/* Control Bar Below the Map Border */}
      <div className={`mt-2.5 px-3.5 py-2 rounded-xl border flex flex-wrap items-center justify-between gap-3 text-xs font-mono transition ${
        theme === 'dark'
          ? 'bg-[#11231B]/95 border-[#1E3A2C] text-slate-300'
          : 'bg-white border-[#D1E0D6] text-[#132A1C] shadow-sm'
      }`}>
        {/* Left: Map Mode Toggle (Icons Only), Station Dropdown (Expands Upwards) & Legend */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 flex-wrap">
          {/* Roadmap vs Satellite Toggle (Icon Buttons) */}
          <div className={`flex items-center p-0.5 rounded-lg border ${
            theme === 'dark' ? 'bg-[#0B1612] border-[#1E3A2C]' : 'bg-[#EBF2EE] border-[#D1E0D6]'
          }`}>
            <button
              onClick={() => setMapType('roadmap')}
              className={`p-1.5 rounded-md transition ${
                mapType === 'roadmap'
                  ? 'bg-[#3DB87E] text-white shadow-sm'
                  : theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-black'
              }`}
              title="Roadmap Layer"
            >
              <Map className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMapType('satellite')}
              className={`p-1.5 rounded-md transition ${
                mapType === 'satellite'
                  ? 'bg-[#C4829E] text-white shadow-sm font-bold'
                  : theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-black'
              }`}
              title="Satellite Hybrid Layer"
            >
              <Satellite className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Station Dropdown Menu (Expands Upwards, Synchronized with Map) */}
          <div className="relative" ref={stationMenuRef}>
            <button
              onClick={() => setStationMenuOpen(!stationMenuOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition ${
                theme === 'dark'
                  ? 'bg-[#0B1612] border-[#1E3A2C] text-slate-200 hover:border-[#3DB87E]/50 hover:bg-[#183327]'
                  : 'bg-[#EBF2EE] border-[#D1E0D6] text-[#132A1C] hover:border-slate-300 hover:bg-slate-200'
              }`}
              title="Click to select station on map"
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: currentStation?.lmsi?.color || '#3DB87E' }}
              />
              <span className="truncate max-w-[140px] sm:max-w-[190px]">
                {currentStation ? currentStation.name.split(' (')[0] : 'Select Station'}
              </span>
              {currentStation && (
                <span className={`text-[10px] shrink-0 font-bold ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  ({currentStation.code})
                </span>
              )}
              <ChevronUp className={`w-3.5 h-3.5 transition-transform duration-200 ${
                stationMenuOpen ? 'rotate-180 text-[#3DB87E]' : 'text-slate-400'
              }`} />
            </button>

            {/* Dropup List (Expands Upwards) */}
            {stationMenuOpen && (
              <div className={`absolute bottom-full left-0 mb-2 w-72 max-h-64 overflow-y-auto rounded-xl border shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 scrollbar-thin ${
                theme === 'dark'
                  ? 'bg-[#11231B] border-[#1E3A2C] text-slate-200 shadow-2xl shadow-black/80'
                  : 'bg-white border-[#D1E0D6] text-slate-800'
              }`}>
                <div className={`text-[9px] font-mono uppercase tracking-wider px-2 py-1 font-bold ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {activeCorridor.shortName} Stations ({computedStations.length})
                </div>

                <div className="space-y-0.5 mt-1">
                  {computedStations.map((stn) => {
                    const isSelected = currentStation?.id === stn.id;
                    return (
                      <button
                        key={stn.id}
                        onClick={() => {
                          setSelectedStationId(stn.id);
                          setStationMenuOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between text-xs font-mono transition ${
                          isSelected
                            ? theme === 'dark'
                              ? 'bg-[#3DB87E]/20 text-[#3DB87E] font-bold border border-[#3DB87E]/40'
                              : 'bg-[#3DB87E]/10 text-[#132A1C] font-bold border border-[#3DB87E]/40'
                            : theme === 'dark'
                              ? 'hover:bg-[#183327] text-slate-300'
                              : 'hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                            style={{ backgroundColor: stn.lmsi?.color || '#3DB87E' }}
                          />
                          <span className="truncate">{stn.name.split(' (')[0]}</span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          <span className={`text-[10px] font-bold ${
                            isSelected ? 'text-[#3DB87E]' : 'text-slate-400'
                          }`}>
                            {stn.code}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#3DB87E]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Stress Halos Legend */}
          <div className={`hidden sm:flex items-center gap-2.5 text-[10px] pl-2 border-l ${
            theme === 'dark' ? 'border-[#1E3A2C]' : 'border-[#D1E0D6]'
          }`}>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#3DB87E]" />
              <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}>&lt;5m wait</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#C4829E]" />
              <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}>5-12m</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}>&gt;15m</span>
            </div>
          </div>
        </div>

        {/* Right: Layer Visibility Toggles */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] uppercase font-bold text-slate-500 mr-1 hidden md:inline">
            Layers:
          </span>
          <button
            onClick={() => toggleMapFilter('showHeatRings')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition border ${
              showHeatRings
                ? 'bg-[#3DB87E]/20 text-[#3DB87E] border-[#3DB87E]/40 font-bold'
                : theme === 'dark'
                  ? 'bg-[#0B1612] border-[#1E3A2C] text-slate-500'
                  : 'bg-[#EBF2EE] border-[#D1E0D6] text-slate-500'
            }`}
          >
            Stress Rings
          </button>
          <button
            onClick={() => toggleMapFilter('showStands')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition border ${
              showStands
                ? 'bg-[#3DB87E]/20 text-[#3DB87E] border-[#3DB87E]/40 font-bold'
                : theme === 'dark'
                  ? 'bg-[#0B1612] border-[#1E3A2C] text-slate-500'
                  : 'bg-[#EBF2EE] border-[#D1E0D6] text-slate-500'
            }`}
          >
            Feeder Stands
          </button>
          <button
            onClick={() => toggleMapFilter('showVehicles')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition border ${
              showVehicles
                ? 'bg-[#C4829E]/20 text-[#C4829E] border-[#C4829E]/40 font-bold'
                : theme === 'dark'
                  ? 'bg-[#0B1612] border-[#1E3A2C] text-slate-500'
                  : 'bg-[#EBF2EE] border-[#D1E0D6] text-slate-500'
            }`}
          >
            Active Fleet
          </button>
        </div>
      </div>
    </div>
  );
}
