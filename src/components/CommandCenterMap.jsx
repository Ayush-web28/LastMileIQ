import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useSimulation } from '../context/SimulationContext';

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

  // Render Map Features
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
    const corridorColor = activeCorridor.color || (isMetro ? '#DC2626' : '#2563EB');

    // 1. Draw High-Visibility Transit Track Polylines
    const validStations = computedStations.filter(
      (s) => isValidCoord(s.lat) && isValidCoord(s.lng)
    );

    if (showTransitTrack && validStations.length > 1) {
      const latlngs = validStations.map((s) => [s.lat, s.lng]);

      // Outer Polyline
      L.polyline(latlngs, {
        color: corridorColor,
        weight: 6,
        opacity: 0.35,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(routesLayer);

      // Inner Sharp Polyline
      L.polyline(latlngs, {
        color: corridorColor,
        weight: 3.5,
        opacity: 0.95,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(routesLayer);

      // Accent Dashed Core
      L.polyline(latlngs, {
        color: '#F4F5F7',
        weight: 1.5,
        opacity: 0.85,
        dashArray: '6, 6',
      }).addTo(routesLayer);
    }

    // 2. Plot Stations with Prominent Highlighting & LMSI Stress Rings
    computedStations.forEach((stn) => {
      if (!isValidCoord(stn.lat) || !isValidCoord(stn.lng)) return;
      const isSelected = currentStation?.id === stn.id;
      const lmsiColor = stn.lmsi?.color || '#10B981';

      // LMSI Coverage Radial Ring
      if (showHeatRings) {
        const radiusMeters = stn.lmsi?.level === 'CRITICAL' ? 1000 : stn.lmsi?.level === 'WARNING' ? 750 : 550;
        const ring = L.circle([stn.lat, stn.lng], {
          radius: radiusMeters,
          color: lmsiColor,
          fillColor: lmsiColor,
          fillOpacity: stn.lmsi?.level === 'CRITICAL' ? 0.22 : 0.12,
          weight: isSelected ? 2 : 1,
          dashArray: isSelected ? '4, 4' : null,
        }).addTo(markersLayer);

        ring.on('click', () => setSelectedStationId(stn.id));
      }

      // High-Contrast Station Pin
      const cleanStationName = stn.name.split(' (')[0];

      const stationIcon = L.divIcon({
        className: 'custom-station-pin',
        html: `
          <div class="relative flex flex-col items-center justify-center cursor-pointer select-none">
            <!-- Station Icon Node -->
            <div class="relative flex items-center justify-center w-7 h-7 rounded-md font-mono font-bold text-xs text-white ${
              isSelected ? 'ring-2 ring-[#DC2626]' : ''
            }"
                 style="background: #0E1015; border: 2px solid ${lmsiColor};">
              <span class="text-[11px]">${stn.code}</span>
            </div>

            <!-- Prominent Station Name Label Pill -->
            <div class="mt-1 px-1.5 py-0.5 rounded text-[10px] font-sans font-bold whitespace-nowrap border pointer-events-none ${
              isSelected 
                ? 'bg-[#0E1015] text-[#F4F5F7] border-[#DC2626]' 
                : 'bg-[#151820] text-[#949AA8] border-[#2A2F3D]'
            }">
              ${cleanStationName}
            </div>
          </div>
        `,
        iconSize: [44, 46],
        iconAnchor: [22, 18],
      });

      const stnMarker = L.marker([stn.lat, stn.lng], { icon: stationIcon }).addTo(markersLayer);
      markersMapRef.current[stn.id] = stnMarker;
      
      // Popup with Station Telemetry
      const popupContent = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; min-width: 200px; color: #0E1015; padding: 4px;">
          <div style="font-weight: 700; font-size: 13px; margin-bottom: 2px;">
            ${stn.name}
          </div>
          <div style="font-size: 11px; font-family: monospace; color: ${corridorColor}; font-weight: bold; margin-bottom: 6px;">
            ${activeCorridor.shortName} | ${stn.code}
          </div>
          <div style="background: #EBECEF; border: 1px solid #CED2DA; border-radius: 4px; padding: 6px 8px; font-size: 11px; margin-bottom: 6px; line-height: 1.4;">
            <div><strong>Deficit Gate:</strong> ${stn.highDeficitGate?.gateName || 'Main Gate'}</div>
            <div><strong>Exit Commuters:</strong> ${stn.highDeficitGate?.expectedCommuters || stn.highDeficitGate?.lastMileSeekers || 0} pax</div>
            <div><strong>Vehicle Shortage:</strong> <span style="color: ${lmsiColor}; font-weight: bold;">${stn.highDeficitGate?.deficit || 0} vehicles</span></div>
            <div><strong>Wait Time:</strong> ${stn.lmsi?.expectedWaitMinutes || '0'} min (${stn.lmsi?.level || 'NOMINAL'})</div>
          </div>
          <div style="font-size: 10px; color: #6B7280;">
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
              <div class="w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-mono font-bold cursor-pointer border border-[#0E1015]"
                   style="background-color: ${isEv ? '#DC2626' : '#D97706'}; color: #FFFFFF;"
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
            color: isEv ? '#DC2626' : '#D97706',
            weight: 1.5,
            opacity: 0.5,
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
            <div class="px-1.5 py-0.5 rounded bg-[#DC2626] text-white font-mono text-[9px] font-bold flex items-center gap-1 border border-[#0E1015]">
              <span>EV</span>
              <span>${disp.plate ? disp.plate.slice(-4) : 'FEED'}</span>
            </div>
          `,
          iconSize: [40, 18],
          iconAnchor: [20, 9],
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
      <div className={`relative w-full flex-1 min-h-[420px] rounded-md overflow-hidden border ${
        theme === 'dark' ? 'border-[#2A2F3D] bg-[#0E1015]' : 'border-[#CED2DA] bg-[#EBECEF]'
      }`}>
        {/* Leaflet Map Canvas */}
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Recenter Button (Top Left) */}
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
            className={`px-3 py-1.5 rounded-md border text-xs font-mono font-bold transition ${
              theme === 'dark'
                ? 'bg-[#151820] border-[#2A2F3D] text-[#DC2626] hover:bg-[#1D212C]'
                : 'bg-[#F4F5F7] border-[#CED2DA] text-[#DC2626] hover:bg-[#DFE2E7]'
            }`}
            title="Recenter Map on Corridor"
          >
            Recenter
          </button>
        </div>
      </div>

      {/* Control Bar Below the Map Border */}
      <div className={`mt-2.5 px-3 py-2 rounded-md border flex flex-wrap items-center justify-between gap-3 text-xs font-mono ${
        theme === 'dark'
          ? 'bg-[#151820] border-[#2A2F3D] text-[#949AA8]'
          : 'bg-[#F4F5F7] border-[#CED2DA] text-[#0E1015]'
      }`}>
        {/* Left: Map Mode Toggle, Station Dropdown (Expands Upwards) & Legend */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          {/* Roadmap vs Satellite Toggle (Text Buttons) */}
          <div className={`flex items-center p-0.5 rounded-md border ${
            theme === 'dark' ? 'bg-[#0E1015] border-[#2A2F3D]' : 'bg-[#DFE2E7] border-[#CED2DA]'
          }`}>
            <button
              onClick={() => setMapType('roadmap')}
              className={`px-2 py-1 rounded text-[11px] font-bold transition ${
                mapType === 'roadmap'
                  ? 'bg-[#DC2626] text-white'
                  : theme === 'dark' ? 'text-[#949AA8] hover:text-[#F4F5F7]' : 'text-[#475060] hover:text-[#0E1015]'
              }`}
            >
              Road
            </button>
            <button
              onClick={() => setMapType('satellite')}
              className={`px-2 py-1 rounded text-[11px] font-bold transition ${
                mapType === 'satellite'
                  ? 'bg-[#DC2626] text-white'
                  : theme === 'dark' ? 'text-[#949AA8] hover:text-[#F4F5F7]' : 'text-[#475060] hover:text-[#0E1015]'
              }`}
            >
              Satellite
            </button>
          </div>

          {/* Interactive Station Dropdown Menu (Expands Upwards, Synchronized with Map) */}
          <div className="relative" ref={stationMenuRef}>
            <button
              onClick={() => setStationMenuOpen(!stationMenuOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-mono font-bold transition ${
                theme === 'dark'
                  ? 'bg-[#0E1015] border-[#2A2F3D] text-[#F4F5F7] hover:bg-[#1D212C]'
                  : 'bg-[#DFE2E7] border-[#CED2DA] text-[#0E1015] hover:bg-[#CED2DA]'
              }`}
              title="Click to select station on map"
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: currentStation?.lmsi?.color || '#10B981' }}
              />
              <span className="truncate max-w-[140px] sm:max-w-[190px]">
                {currentStation ? currentStation.name.split(' (')[0] : 'Select Station'}
              </span>
              {currentStation && (
                <span className={`text-[10px] shrink-0 font-bold ${
                  theme === 'dark' ? 'text-[#6B7280]' : 'text-[#6B7280]'
                }`}>
                  ({currentStation.code})
                </span>
              )}
              <span className="text-[9px] text-[#6B7280] ml-1">
                {stationMenuOpen ? '▲' : '▼'}
              </span>
            </button>

            {/* Dropup List (Expands Upwards) */}
            {stationMenuOpen && (
              <div className={`absolute bottom-full left-0 mb-2 w-72 max-h-64 overflow-y-auto rounded-md border p-1.5 z-50 ${
                theme === 'dark'
                  ? 'bg-[#151820] border-[#2A2F3D] text-[#F4F5F7]'
                  : 'bg-[#F4F5F7] border-[#CED2DA] text-[#0E1015]'
              }`}>
                <div className={`text-[9px] font-mono uppercase tracking-wider px-2 py-1 font-bold ${
                  theme === 'dark' ? 'text-[#6B7280]' : 'text-[#6B7280]'
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
                        className={`w-full text-left px-2.5 py-1.5 rounded-md flex items-center justify-between text-xs font-mono transition ${
                          isSelected
                            ? theme === 'dark'
                              ? 'bg-[#1D212C] text-[#DC2626] font-bold border border-[#DC2626]/40'
                              : 'bg-[#DFE2E7] text-[#DC2626] font-bold border border-[#DC2626]/40'
                            : theme === 'dark'
                              ? 'hover:bg-[#1D212C] text-[#949AA8]'
                              : 'hover:bg-[#DFE2E7] text-[#475060]'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: stn.lmsi?.color || '#10B981' }}
                          />
                          <span className="truncate">{stn.name.split(' (')[0]}</span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          <span className={`text-[10px] font-bold ${
                            isSelected ? 'text-[#DC2626]' : 'text-[#6B7280]'
                          }`}>
                            {stn.code}
                          </span>
                          {isSelected && <span className="text-[10px] text-[#DC2626] font-bold">Active</span>}
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
            theme === 'dark' ? 'border-[#2A2F3D]' : 'border-[#CED2DA]'
          }`}>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span className={theme === 'dark' ? 'text-[#949AA8]' : 'text-[#6B7280]'}>&lt;5m wait</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
              <span className={theme === 'dark' ? 'text-[#949AA8]' : 'text-[#6B7280]'}>5-12m</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
              <span className={theme === 'dark' ? 'text-[#949AA8]' : 'text-[#6B7280]'}>&gt;15m</span>
            </div>
          </div>
        </div>

        {/* Right: Layer Visibility Toggles */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] uppercase font-bold text-[#6B7280] mr-1 hidden md:inline">
            Layers:
          </span>
          <button
            onClick={() => toggleMapFilter('showHeatRings')}
            className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition border ${
              showHeatRings
                ? theme === 'dark'
                  ? 'bg-[#1D212C] text-[#DC2626] border-[#DC2626]/40 font-bold'
                  : 'bg-[#DFE2E7] text-[#DC2626] border-[#DC2626]/40 font-bold'
                : theme === 'dark'
                  ? 'bg-[#0E1015] border-[#2A2F3D] text-[#6B7280]'
                  : 'bg-[#DFE2E7] border-[#CED2DA] text-[#6B7280]'
            }`}
          >
            Stress Rings
          </button>
          <button
            onClick={() => toggleMapFilter('showStands')}
            className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition border ${
              showStands
                ? theme === 'dark'
                  ? 'bg-[#1D212C] text-[#F59E0B] border-[#F59E0B]/40 font-bold'
                  : 'bg-[#DFE2E7] text-[#D97706] border-[#F59E0B]/40 font-bold'
                : theme === 'dark'
                  ? 'bg-[#0E1015] border-[#2A2F3D] text-[#6B7280]'
                  : 'bg-[#DFE2E7] border-[#CED2DA] text-[#6B7280]'
            }`}
          >
            Feeder Stands
          </button>
          <button
            onClick={() => toggleMapFilter('showVehicles')}
            className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition border ${
              showVehicles
                ? theme === 'dark'
                  ? 'bg-[#1D212C] text-[#2563EB] border-[#2563EB]/40 font-bold'
                  : 'bg-[#DFE2E7] text-[#2563EB] border-[#2563EB]/40 font-bold'
                : theme === 'dark'
                  ? 'bg-[#0E1015] border-[#2A2F3D] text-[#6B7280]'
                  : 'bg-[#DFE2E7] border-[#CED2DA] text-[#6B7280]'
            }`}
          >
            Active Fleet
          </button>
        </div>
      </div>
    </div>
  );
}
