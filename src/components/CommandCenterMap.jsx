import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useSimulation } from '../context/SimulationContext';
import { 
  Layers, 
  MapPin, 
  RefreshCw,
  Eye,
  EyeOff,
  CheckCircle2,
  Navigation,
  Compass
} from 'lucide-react';

export default function CommandCenterMap() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const markersLayerRef = useRef(null);
  const routesLayerRef = useRef(null);
  const dispatchVectorsLayerRef = useRef(null);

  const {
    theme,
    currentCorridorKey,
    activeCorridor,
    computedStations,
    currentStation,
    setSelectedStationId,
    dispatchEvents,
    executeAutoDispatch,
  } = useSimulation();

  // Layer Visibility Toggles
  const [showHeatRings, setShowHeatRings] = useState(true);
  const [showStands, setShowStands] = useState(true);
  const [showVehicles, setShowVehicles] = useState(true);
  const [showTransitTrack, setShowTransitTrack] = useState(true);
  const [mapType, setMapType] = useState('roadmap'); // 'roadmap' | 'satellite'

  // Initialize Leaflet Map with Google Maps Tiles
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    if (mapContainerRef.current._leaflet_id) {
      delete mapContainerRef.current._leaflet_id;
    }

    const initialCenter = activeCorridor?.center || [19.1176, 72.8680];
    const initialZoom = activeCorridor?.zoom || 13;

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

    // Actual Google Maps Roadmap tiles (100% Free, zero API key needed, zero watermark)
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

    // Keep base tiles below features
    newTiles.bringToBack();
    tileLayerRef.current = newTiles;
  }, [mapType]);

  // Recenter when corridor changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !activeCorridor) return;
    map.flyTo(activeCorridor.center, activeCorridor.zoom, {
      duration: 1.0,
      easeLinearity: 0.25,
    });
  }, [currentCorridorKey, activeCorridor]);

  // Pan smoothly when currentStation changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !currentStation) return;
    map.panTo([currentStation.lat, currentStation.lng], {
      animate: true,
      duration: 0.6,
    });
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

    const isMetro = activeCorridor.category === 'metro';
    const corridorColor = activeCorridor.color || (isMetro ? '#0284C7' : '#EF4444');

    // 1. Draw High-Visibility Transit Track Polylines
    if (showTransitTrack && computedStations.length > 1) {
      const latlngs = computedStations.map((s) => [s.lat, s.lng]);

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
      const isSelected = currentStation?.id === stn.id;
      const lmsiColor = stn.lmsi.color;

      // LMSI Heat/Coverage Radial Ring
      if (showHeatRings) {
        const radiusMeters = stn.lmsi.level === 'CRITICAL' ? 1000 : stn.lmsi.level === 'WARNING' ? 750 : 550;
        const ring = L.circle([stn.lat, stn.lng], {
          radius: radiusMeters,
          color: lmsiColor,
          fillColor: lmsiColor,
          fillOpacity: stn.lmsi.level === 'CRITICAL' ? 0.28 : 0.16,
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
              isSelected ? 'scale-110 ring-4 ring-white/90 shadow-emerald-500/50' : 'hover:scale-105'
            }"
                 style="background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); border: 2.5px solid ${lmsiColor}; box-shadow: 0 4px 14px ${lmsiColor}80, 0 2px 6px rgba(0,0,0,0.8);">
              <span class="text-[12px]">${stn.code}</span>
              <span class="absolute -top-1.5 -right-1.5 text-[10px] leading-none">${iconGlyph}</span>
            </div>

            <!-- Prominent Station Name Label Pill -->
            <div class="mt-1 px-2 py-0.5 rounded-md text-[10px] font-sans font-bold whitespace-nowrap shadow-xl border pointer-events-none transition-all ${
              isSelected 
                ? 'bg-slate-950 text-white border-emerald-400 ring-1 ring-emerald-400/40 scale-105' 
                : 'bg-slate-900/95 text-slate-200 border-slate-700/90'
            }">
              ${cleanStationName}
            </div>
          </div>
        `,
        iconSize: [44, 48],
        iconAnchor: [22, 20],
      });

      const stnMarker = L.marker([stn.lat, stn.lng], { icon: stationIcon }).addTo(markersLayer);
      
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
            <div><strong>Deficit Gate:</strong> ${stn.highDeficitGate.gateName}</div>
            <div><strong>Exit Commuters:</strong> ${stn.highDeficitGate.expectedCommuters} pax</div>
            <div><strong>Vehicle Shortage:</strong> <span style="color: ${lmsiColor}; font-weight: bold;">${stn.highDeficitGate.deficit} vehicles</span></div>
            <div><strong>Wait Time:</strong> ${stn.lmsi.expectedWaitMinutes} min (${stn.lmsi.level})</div>
          </div>
          <div style="font-size: 10px; color: #64748B;">
            Click to inspect concourse gates & dispatch rerouting
          </div>
        </div>
      `;

      stnMarker.bindPopup(popupContent);
      stnMarker.on('click', () => {
        setSelectedStationId(stn.id);
      });

      // 3. Feeder Auto & EV Stands
      if (showStands && stn.stands) {
        stn.stands.forEach((stand) => {
          const isEv = stand.type === 'EV_STAND';
          const standIcon = L.divIcon({
            className: 'custom-stand-pin',
            html: `
              <div class="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-mono font-black shadow-md cursor-pointer border border-white"
                   style="background-color: ${isEv ? '#06B6D4' : '#F59E0B'}; color: #080C14;"
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
            color: isEv ? '#06B6D4' : '#F59E0B',
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
        const stn = computedStations.find((s) => s.name === disp.stationName) || currentStation;
        if (!stn) return;

        const angle = (idx * 72 * Math.PI) / 180;
        const dist = 0.0035 + (idx % 2) * 0.002;
        const vLat = stn.lat + Math.sin(angle) * dist;
        const vLng = stn.lng + Math.cos(angle) * dist;

        const vehicleIcon = L.divIcon({
          className: 'custom-vehicle-pin',
          html: `
            <div class="px-2 py-0.5 rounded-md bg-emerald-500 text-slate-950 font-mono text-[9px] font-black shadow-lg flex items-center gap-1 border border-white animate-pulse">
              <span>⚡</span>
              <span>${disp.plate.slice(-4)}</span>
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

  return (
    <div className="relative w-full h-[470px] rounded-2xl overflow-hidden border border-slate-800 bg-[#080C14] shadow-2xl">
      {/* Map DOM Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating HUD (Top Left): Map Navigation & Google Layer Type (NO corridor label here to avoid duplicate) */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
        {/* Recenter Button */}
        <button
          onClick={() => {
            const map = mapInstanceRef.current;
            if (map && activeCorridor) {
              map.flyTo(activeCorridor.center, activeCorridor.zoom, { duration: 0.8 });
            }
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/95 border border-slate-700/90 hover:border-emerald-500/60 text-slate-200 transition text-xs font-mono backdrop-blur-md shadow-lg"
          title="Recenter Map on Corridor"
        >
          <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-semibold">Recenter</span>
        </button>

        {/* Google Map Mode Toggle: Roadmap vs Satellite */}
        <div className="flex items-center p-0.5 rounded-xl bg-slate-900/95 border border-slate-700/90 backdrop-blur-md shadow-lg text-xs font-mono">
          <button
            onClick={() => setMapType('roadmap')}
            className={`px-2.5 py-1 rounded-lg text-[10px] transition font-bold ${
              mapType === 'roadmap'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🗺️ Roadmap
          </button>
          <button
            onClick={() => setMapType('satellite')}
            className={`px-2.5 py-1 rounded-lg text-[10px] transition font-bold ${
              mapType === 'satellite'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🛰️ Satellite
          </button>
        </div>

        {/* Active Station Count Pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md shadow-lg text-xs font-mono text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{computedStations.length} Stations Highlighted</span>
        </div>
      </div>

      {/* Layer Visibility Toggles (Top Right) */}
      <div className="absolute top-3 right-3 z-10 hidden sm:flex items-center gap-1 p-1 rounded-xl bg-slate-900/95 border border-slate-700/90 backdrop-blur-md shadow-lg text-xs">
        <button
          onClick={() => setShowHeatRings(!showHeatRings)}
          className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition ${
            showHeatRings ? 'bg-slate-800 text-emerald-400 font-bold border border-emerald-500/30' : 'text-slate-500'
          }`}
        >
          Stress Rings
        </button>
        <button
          onClick={() => setShowStands(!showStands)}
          className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition ${
            showStands ? 'bg-slate-800 text-cyan-400 font-bold border border-cyan-500/30' : 'text-slate-500'
          }`}
        >
          Feeder Stands
        </button>
        <button
          onClick={() => setShowVehicles(!showVehicles)}
          className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition ${
            showVehicles ? 'bg-slate-800 text-emerald-400 font-bold border border-emerald-500/30' : 'text-slate-500'
          }`}
        >
          Active Fleet
        </button>
      </div>

      {/* Compact Bottom Legend & Google Maps Engine Verification */}
      <div className="absolute bottom-3 left-3 z-10 p-2 sm:px-3 rounded-xl bg-slate-950/95 border border-slate-800/90 backdrop-blur-md shadow-2xl text-[10px] font-mono flex items-center gap-3">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-slate-300">&lt;5m wait</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span className="text-slate-300">5-12m</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-slate-300">&gt;15m</span>
        </div>
        <div className="flex items-center gap-1 pl-2 border-l border-slate-800 text-emerald-400 font-semibold">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span>Google Maps Engine (Zero API Key Required)</span>
        </div>
      </div>
    </div>
  );
}