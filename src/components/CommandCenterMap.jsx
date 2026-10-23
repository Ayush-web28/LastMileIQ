import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useSimulation } from '../context/SimulationContext';
import { 
  Layers, 
  Navigation, 
  Zap, 
  MapPin, 
  Filter, 
  ShieldCheck, 
  Maximize2,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';

export default function CommandCenterMap() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const routesLayerRef = useRef(null);
  const dispatchVectorsLayerRef = useRef(null);

  const {
    currentCorridorKey,
    activeCorridor,
    computedStations,
    currentStation,
    setSelectedStationId,
    dispatchEvents,
  } = useSimulation();

  // Layer Visibility Toggles
  const [showHeatRings, setShowHeatRings] = useState(true);
  const [showStands, setShowStands] = useState(true);
  const [showVehicles, setShowVehicles] = useState(true);
  const [showTransitTrack, setShowTransitTrack] = useState(true);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // already initialized

    const initialCenter = activeCorridor.center || [12.9868, 77.7289];
    const initialZoom = activeCorridor.zoom || 13;

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      zoomControl: false,
      attributionControl: false,
    });

    // Dark Matter CartoDB tiles (clean, free, dark aesthetic, zero API key)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map);

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
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Recenter when corridor changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !activeCorridor) return;
    map.flyTo(activeCorridor.center, activeCorridor.zoom, {
      duration: 1.2,
      easeLinearity: 0.25,
    });
  }, [currentCorridorKey, activeCorridor]);

  // Pan when currentStation changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !currentStation) return;
    map.panTo([currentStation.lat, currentStation.lng], {
      animate: true,
      duration: 0.8,
    });
  }, [currentStation?.id]);

  // Render Map Features (Metro track, Stations, Stands, Vehicles, LMSI heat rings)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !markersLayerRef.current || !routesLayerRef.current) return;

    const markersLayer = markersLayerRef.current;
    const routesLayer = routesLayerRef.current;
    const vectorsLayer = dispatchVectorsLayerRef.current;

    markersLayer.clearLayers();
    routesLayer.clearLayers();
    if (vectorsLayer) vectorsLayer.clearLayers();

    // 1. Draw Metro Trunk Polyline
    if (showTransitTrack && computedStations.length > 1) {
      const latlngs = computedStations.map((s) => [s.lat, s.lng]);

      // Glow backdrop
      L.polyline(latlngs, {
        color: '#10B981',
        weight: 8,
        opacity: 0.25,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(routesLayer);

      // Core line
      L.polyline(latlngs, {
        color: '#10B981',
        weight: 3.5,
        opacity: 0.95,
        dashArray: '8, 8',
      }).addTo(routesLayer);
    }

    // 2. Plot Stations with LMSI Heat Rings & Badges
    computedStations.forEach((stn) => {
      const isSelected = currentStation?.id === stn.id;
      const lmsiColor = stn.lmsi.color;

      // LMSI Radial Coverage / Stress Ring
      if (showHeatRings) {
        const radiusMeters = stn.lmsi.level === 'CRITICAL' ? 1200 : stn.lmsi.level === 'WARNING' ? 950 : 750;
        const ring = L.circle([stn.lat, stn.lng], {
          radius: radiusMeters,
          color: lmsiColor,
          fillColor: lmsiColor,
          fillOpacity: stn.lmsi.level === 'CRITICAL' ? 0.22 : 0.12,
          weight: isSelected ? 2.5 : 1,
          dashArray: isSelected ? '4, 4' : undefined,
        }).addTo(markersLayer);

        ring.on('click', () => setSelectedStationId(stn.id));
      }

      // Custom Station HTML Marker
      const stationIcon = L.divIcon({
        className: 'custom-station-pin',
        html: `
          <div class="relative flex items-center justify-center cursor-pointer group">
            ${
              isSelected
                ? `<div class="absolute -inset-2 rounded-full animate-ping opacity-60" style="background-color: ${lmsiColor}"></div>`
                : ''
            }
            <div class="w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-xs text-white shadow-xl transition-transform transform group-hover:scale-110"
                 style="background-color: #0F172A; border: 2px solid ${lmsiColor}; box-shadow: 0 0 15px ${lmsiColor}60;">
              <span>${stn.code}</span>
            </div>
            <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-slate-950/90 text-[10px] font-sans font-semibold text-slate-200 border border-slate-700/80 pointer-events-none shadow-md">
              ${stn.name}
            </div>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });

      const stnMarker = L.marker([stn.lat, stn.lng], { icon: stationIcon }).addTo(markersLayer);
      stnMarker.on('click', () => setSelectedStationId(stn.id));

      // 3. Plot Feeder Stands
      if (showStands && stn.stands) {
        stn.stands.forEach((stand) => {
          const isEv = stand.type === 'EV_STAND';
          const standIcon = L.divIcon({
            className: 'custom-stand-pin',
            html: `
              <div class="relative flex items-center justify-center cursor-pointer group" title="${stand.name}: ${stand.currentVehicles} idle vehicles">
                <div class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shadow-lg transition-transform group-hover:scale-125"
                     style="background-color: ${isEv ? '#06B6D4' : '#F59E0B'}; color: #080C14; border: 1.5px solid #FFFFFF;">
                  ${stand.currentVehicles}
                </div>
              </div>
            `,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          });

          const standMarker = L.marker([stand.lat, stand.lng], { icon: standIcon }).addTo(markersLayer);

          // Connect stand to station gate with dashed feeder corridor line
          L.polyline([[stn.lat, stn.lng], [stand.lat, stand.lng]], {
            color: isEv ? '#06B6D4' : '#F59E0B',
            weight: 1.5,
            opacity: 0.5,
            dashArray: '3, 6',
          }).addTo(markersLayer);
        });
      }
    });

    // 4. Render Active Dispatched Vehicle Vectors
    if (showVehicles && dispatchEvents.length > 0 && vectorsLayer) {
      dispatchEvents.slice(0, 5).forEach((disp, idx) => {
        const stn = computedStations.find((s) => s.name === disp.stationName) || currentStation;
        if (!stn) return;

        // Position slightly offset around the station representing dynamic movement
        const angle = (idx * 72 * Math.PI) / 180;
        const dist = 0.005 + (idx % 3) * 0.002;
        const vLat = stn.lat + Math.sin(angle) * dist;
        const vLng = stn.lng + Math.cos(angle) * dist;

        const vehicleIcon = L.divIcon({
          className: 'custom-vehicle-pin',
          html: `
            <div class="relative flex items-center justify-center cursor-pointer animate-pulse" title="${disp.plate} (${disp.driver})">
              <div class="px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950 font-mono text-[9px] font-extrabold shadow-md border border-white flex items-center gap-1">
                <span>⚡</span>
                <span>${disp.plate.slice(-4)}</span>
              </div>
            </div>
          `,
          iconSize: [40, 20],
          iconAnchor: [20, 10],
        });

        L.marker([vLat, vLng], { icon: vehicleIcon }).addTo(vectorsLayer);

        // Vector route line into station
        L.polyline([[vLat, vLng], [stn.lat, stn.lng]], {
          color: '#10B981',
          weight: 2,
          opacity: 0.7,
          dashArray: '4, 4',
        }).addTo(vectorsLayer);
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
  ]);

  return (
    <div className="relative w-full h-[520px] rounded-2xl overflow-hidden border border-slate-800 bg-[#080C14] shadow-2xl">
      {/* Map DOM Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Map Floating HUD Overlay: Header & Layer Controls */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md shadow-lg text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white font-bold">{activeCorridor.shortName}</span>
          <span className="text-slate-500">|</span>
          <span className="text-emerald-400">{computedStations.length} Stations Active</span>
        </div>

        {/* Quick Map Recenter */}
        <button
          onClick={() => {
            const map = mapInstanceRef.current;
            if (map && activeCorridor) {
              map.flyTo(activeCorridor.center, activeCorridor.zoom, { duration: 1 });
            }
          }}
          className="p-2 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-emerald-500/50 hover:bg-slate-800 text-slate-300 transition text-xs shadow-lg"
          title="Recenter Corridor View"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Layer Toggles Pill Bar (Top Right) */}
      <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-1 p-1 rounded-xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md shadow-lg text-xs">
        <button
          onClick={() => setShowHeatRings(!showHeatRings)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition font-medium text-[11px] ${
            showHeatRings ? 'bg-slate-800 text-emerald-400 font-bold' : 'text-slate-500 hover:text-slate-300'
          }`}
          title="Toggle LMSI Stress Heat Rings"
        >
          {showHeatRings ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
          <span>LMSI Rings</span>
        </button>

        <button
          onClick={() => setShowStands(!showStands)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition font-medium text-[11px] ${
            showStands ? 'bg-slate-800 text-cyan-400 font-bold' : 'text-slate-500 hover:text-slate-300'
          }`}
          title="Toggle Feeder Stands"
        >
          {showStands ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
          <span>Feeder Stands</span>
        </button>

        <button
          onClick={() => setShowVehicles(!showVehicles)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition font-medium text-[11px] ${
            showVehicles ? 'bg-slate-800 text-emerald-400 font-bold' : 'text-slate-500 hover:text-slate-300'
          }`}
          title="Toggle Moving Fleet Vehicles"
        >
          {showVehicles ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
          <span>Fleet Vectors</span>
        </button>
      </div>

      {/* Floating LMSI Legend Bar (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-10 p-2.5 rounded-xl bg-slate-950/90 border border-slate-800/90 backdrop-blur-md shadow-xl text-[11px] font-mono">
        <div className="text-[9px] uppercase tracking-wider text-slate-400 mb-1.5 font-bold">
          Last-Mile Stress Index (LMSI)
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500" />
            <span className="text-slate-300">&lt; 1.2 (Optimal &lt;5m)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500" />
            <span className="text-slate-300">1.2–2.5 (Surge 5–12m)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500 animate-pulse" />
            <span className="text-slate-300">&gt; 2.5 (Deficit &gt;15m)</span>
          </div>
          <div className="flex items-center gap-1.5 border-l border-slate-800 pl-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span className="text-slate-300">Smart EV Stand</span>
          </div>
        </div>
      </div>
    </div>
  );
}
