import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useSimulation } from '../context/SimulationContext';
import { 
  Layers, 
  MapPin, 
  RefreshCw,
  Eye,
  EyeOff,
  CheckCircle2
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
    if (mapInstanceRef.current) return;

    const initialCenter = activeCorridor.center || [19.1176, 72.8680];
    const initialZoom = activeCorridor.zoom || 13;

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      zoomControl: false,
      attributionControl: false,
    });

    // Dark Matter CartoDB tiles (100% Free Open Tiles, zero API key needed)
    const baseTiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
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
      duration: 1.0,
      easeLinearity: 0.25,
    });
  }, [currentCorridorKey, activeCorridor]);

  // Pan when currentStation changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !currentStation) return;
    map.panTo([currentStation.lat, currentStation.lng], {
      animate: true,
      duration: 0.6,
    });
  }, [currentStation?.id]);

  // Render Map Features (Track, Stations, Stands, Vehicles, LMSI heat rings)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !markersLayerRef.current || !routesLayerRef.current) return;

    const markersLayer = markersLayerRef.current;
    const routesLayer = routesLayerRef.current;
    const vectorsLayer = dispatchVectorsLayerRef.current;

    markersLayer.clearLayers();
    routesLayer.clearLayers();
    if (vectorsLayer) vectorsLayer.clearLayers();

    // 1. Draw Transit Line Polyline
    if (showTransitTrack && computedStations.length > 1) {
      const latlngs = computedStations.map((s) => [s.lat, s.lng]);
      const lineColor = activeCorridor.color || '#10B981';

      L.polyline(latlngs, {
        color: lineColor,
        weight: 6,
        opacity: 0.25,
        lineCap: 'round',
      }).addTo(routesLayer);

      L.polyline(latlngs, {
        color: lineColor,
        weight: 3,
        opacity: 0.9,
        dashArray: '6, 6',
      }).addTo(routesLayer);
    }

    // 2. Plot Stations with LMSI Heat Rings
    computedStations.forEach((stn) => {
      const isSelected = currentStation?.id === stn.id;
      const lmsiColor = stn.lmsi.color;

      if (showHeatRings) {
        const radiusMeters = stn.lmsi.level === 'CRITICAL' ? 1100 : stn.lmsi.level === 'WARNING' ? 850 : 650;
        const ring = L.circle([stn.lat, stn.lng], {
          radius: radiusMeters,
          color: lmsiColor,
          fillColor: lmsiColor,
          fillOpacity: stn.lmsi.level === 'CRITICAL' ? 0.22 : 0.12,
          weight: isSelected ? 2 : 1,
        }).addTo(markersLayer);

        ring.on('click', () => setSelectedStationId(stn.id));
      }

      // Station Marker
      const stationIcon = L.divIcon({
        className: 'custom-station-pin',
        html: `
          <div class="relative flex items-center justify-center cursor-pointer group">
            ${
              isSelected
                ? `<div class="absolute -inset-1.5 rounded-full animate-ping opacity-60" style="background-color: ${lmsiColor}"></div>`
                : ''
            }
            <div class="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-[11px] text-white shadow-xl transition-transform transform group-hover:scale-110"
                 style="background-color: #0F172A; border: 2px solid ${lmsiColor}; box-shadow: 0 0 10px ${lmsiColor}50;">
              <span>${stn.code}</span>
            </div>
            <div class="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded bg-slate-950/90 text-[9px] font-sans font-medium text-slate-200 border border-slate-700/80 pointer-events-none shadow-md">
              ${stn.name.split(' (')[0]}
            </div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const stnMarker = L.marker([stn.lat, stn.lng], { icon: stationIcon }).addTo(markersLayer);
      stnMarker.on('click', () => setSelectedStationId(stn.id));

      // 3. Feeder Stands
      if (showStands && stn.stands) {
        stn.stands.forEach((stand) => {
          const isEv = stand.type === 'EV_STAND';
          const standIcon = L.divIcon({
            className: 'custom-stand-pin',
            html: `
              <div class="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-mono font-bold shadow-md cursor-pointer"
                   style="background-color: ${isEv ? '#06B6D4' : '#F59E0B'}; color: #080C14; border: 1.5px solid #FFFFFF;">
                ${stand.currentVehicles}
              </div>
            `,
            iconSize: [20, 20],
            iconAnchor: [10, 10],
          });

          L.marker([stand.lat, stand.lng], { icon: standIcon }).addTo(markersLayer);

          L.polyline([[stn.lat, stn.lng], [stand.lat, stand.lng]], {
            color: isEv ? '#06B6D4' : '#F59E0B',
            weight: 1.5,
            opacity: 0.45,
            dashArray: '3, 5',
          }).addTo(markersLayer);
        });
      }
    });

    // 4. Moving Vehicle Markers
    if (showVehicles && dispatchEvents.length > 0 && vectorsLayer) {
      dispatchEvents.slice(0, 4).forEach((disp, idx) => {
        const stn = computedStations.find((s) => s.name === disp.stationName) || currentStation;
        if (!stn) return;

        const angle = (idx * 80 * Math.PI) / 180;
        const dist = 0.004 + (idx % 2) * 0.002;
        const vLat = stn.lat + Math.sin(angle) * dist;
        const vLng = stn.lng + Math.cos(angle) * dist;

        const vehicleIcon = L.divIcon({
          className: 'custom-vehicle-pin',
          html: `
            <div class="px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950 font-mono text-[9px] font-bold shadow-md flex items-center gap-0.5 animate-pulse">
              <span>⚡</span>
              <span>${disp.plate.slice(-4)}</span>
            </div>
          `,
          iconSize: [36, 18],
          iconAnchor: [18, 9],
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
  ]);

  return (
    <div className="relative w-full h-[460px] rounded-2xl overflow-hidden border border-slate-800 bg-[#080C14] shadow-xl">
      {/* Map DOM Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating HUD: Corridor Label */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md shadow-lg text-xs font-mono">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: activeCorridor.color }} />
          <span className="text-white font-bold">{activeCorridor.shortName}</span>
          <span className="text-slate-500">|</span>
          <span className="text-emerald-400 font-semibold">{computedStations.length} Stations</span>
        </div>

        <button
          onClick={() => {
            const map = mapInstanceRef.current;
            if (map && activeCorridor) {
              map.flyTo(activeCorridor.center, activeCorridor.zoom, { duration: 0.8 });
            }
          }}
          className="p-2 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-emerald-500/50 text-slate-300 transition text-xs shadow-md"
          title="Recenter Corridor View"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Layer Toggles (Top Right) */}
      <div className="absolute top-3 right-3 z-10 hidden sm:flex items-center gap-1 p-1 rounded-xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-xs">
        <button
          onClick={() => setShowHeatRings(!showHeatRings)}
          className={`px-2 py-1 rounded-lg text-[10px] font-mono transition ${
            showHeatRings ? 'bg-slate-800 text-emerald-400 font-bold' : 'text-slate-500'
          }`}
        >
          Stress Rings
        </button>
        <button
          onClick={() => setShowStands(!showStands)}
          className={`px-2 py-1 rounded-lg text-[10px] font-mono transition ${
            showStands ? 'bg-slate-800 text-cyan-400 font-bold' : 'text-slate-500'
          }`}
        >
          Feeder Stands
        </button>
        <button
          onClick={() => setShowVehicles(!showVehicles)}
          className={`px-2 py-1 rounded-lg text-[10px] font-mono transition ${
            showVehicles ? 'bg-slate-800 text-emerald-400 font-bold' : 'text-slate-500'
          }`}
        >
          Fleet
        </button>
      </div>

      {/* Compact Legend & No API Key Disclaimer */}
      <div className="absolute bottom-3 left-3 z-10 p-2 rounded-xl bg-slate-950/90 border border-slate-800 backdrop-blur-md shadow-lg text-[10px] font-mono flex items-center gap-3">
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
        <div className="flex items-center gap-1 pl-2 border-l border-slate-800 text-slate-500">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span>Zero API Key (CartoDB Open Tiles)</span>
        </div>
      </div>
    </div>
  );
}
