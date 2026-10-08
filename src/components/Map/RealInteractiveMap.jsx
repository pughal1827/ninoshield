import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useNinoShield } from '../../context/NinoShieldContext';
import { Layers, Maximize2, RotateCcw, Info } from 'lucide-react';

export default function RealInteractiveMap({ height = "420px", onSelectRegion }) {
  const { locations, selectedLocation, changeLocation } = useNinoShield();
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  const [activeLayer, setActiveLayer] = useState('overall');

  // Helper to determine marker color based on selected risk layer
  const getMarkerColor = (loc, layer) => {
    let score = loc.overallRisk;
    if (layer === 'heat') score = loc.temperatureRisk;
    if (layer === 'water') score = loc.waterStress;
    if (layer === 'rain') score = loc.rainfallRisk;
    if (layer === 'ag') score = loc.agricultureRisk;
    if (layer === 'vuln') score = loc.vulnerability;

    if (score >= 75) return '#dc2626'; // Red Critical
    if (score >= 60) return '#f97316'; // Orange High
    if (score >= 45) return '#eab308'; // Yellow Moderate
    return '#10b981'; // Green Low
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Default center: Madurai [9.9252, 78.1198], zoom 7.5
      const map = L.map(mapContainerRef.current, {
        center: [9.9252, 78.1198],
        zoom: 7.5,
        zoomControl: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      // Custom Zoom control top-right
      L.control.zoom({ position: 'topright' }).addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers when locations or activeLayer changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    locations.forEach(loc => {
      const color = getMarkerColor(loc, activeLayer);

      let score = loc.overallRisk;
      if (activeLayer === 'heat') score = loc.temperatureRisk;
      if (activeLayer === 'water') score = loc.waterStress;
      if (activeLayer === 'rain') score = loc.rainfallRisk;
      if (activeLayer === 'ag') score = loc.agricultureRisk;

      // Custom Circle Marker
      const customHtml = `
        <div style="
          background-color: ${color};
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 800;
          font-size: 11px;
          cursor: pointer;
        ">
          ${score}
        </div>
      `;

      const customIcon = L.divIcon({
        html: customHtml,
        className: 'custom-leaflet-pin',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -14]
      });

      const popupContent = `
        <div style="font-family: sans-serif; padding: 4px; min-width: 180px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
            <strong style="font-size: 14px; color: #0B1736;">${loc.name}</strong>
            <span style="font-size: 10px; font-weight: bold; padding: 2px 6px; border-radius: 4px; background: ${color}; color: white;">
              ${score} / 100
            </span>
          </div>
          <div style="font-size: 11px; color: #64748b; margin-bottom: 6px;">${loc.district}</div>
          <div style="font-size: 11px; line-height: 1.5; margin-bottom: 8px;">
            <div>Temp: <strong style="color: #dc2626;">${loc.anomalies.tempAnomaly}</strong></div>
            <div>Rain: <strong style="color: #f97316;">${loc.anomalies.rainAnomaly}</strong></div>
            <div>Water: <strong style="color: #2563eb;">${loc.anomalies.waterAvailability}</strong></div>
            <div>Pop: <strong>${(loc.population || 1200000).toLocaleString()}</strong></div>
          </div>
          <button id="btn-select-${loc.id}" style="
            width: 100%;
            background: #1769FF;
            color: white;
            border: none;
            padding: 6px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: bold;
            cursor: pointer;
          ">
            Inspect Location →
          </button>
        </div>
      `;

      const marker = L.marker(loc.coordinates, { icon: customIcon })
        .addTo(map)
        .bindPopup(popupContent);

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-select-${loc.id}`);
        if (btn) {
          btn.onclick = () => {
            changeLocation(loc.id);
            if (onSelectRegion) onSelectRegion(loc);
          };
        }
      });

      marker.on('click', () => {
        changeLocation(loc.id);
        if (onSelectRegion) onSelectRegion(loc);
      });

      markersRef.current.push(marker);
    });

  }, [locations, activeLayer, changeLocation, onSelectRegion]);

  // Pan to selected location when selectedLocation changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (map && selectedLocation && selectedLocation.coordinates) {
      map.flyTo(selectedLocation.coordinates, 9, { duration: 1.2 });
    }
  }, [selectedLocation]);

  const handleResetView = () => {
    const map = mapInstanceRef.current;
    if (map) {
      map.flyTo([9.9252, 78.1198], 7.5, { duration: 1.2 });
    }
  };

  return (
    <div className="relative w-full rounded-2xl border border-blue-100 bg-white overflow-hidden shadow-xs">
      
      {/* Map Control Bar */}
      <div className="p-3 bg-[#F8FBFF] border-b border-blue-100 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-[#1769FF]" />
          <span className="font-bold text-[#0B1736]">Map Risk Layer:</span>
          
          <select
            value={activeLayer}
            onChange={(e) => setActiveLayer(e.target.value)}
            className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-[#1769FF]"
          >
            <option value="overall">Overall Risk Score</option>
            <option value="heat">Extreme Heat Risk</option>
            <option value="water">Water Stress Layer</option>
            <option value="rain">Rainfall Deficit</option>
            <option value="ag">Agriculture Stress</option>
            <option value="vuln">Population Vulnerability</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          {/* Demo Data Label Badge */}
          <span className="hidden sm:inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1769FF] font-bold text-[10px] border border-blue-200">
            <Info className="w-3 h-3" />
            <span>Climate overlay: Prototype / Scenario Data</span>
          </span>

          <button
            onClick={handleResetView}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 font-semibold text-slate-700 hover:bg-slate-50 transition"
            title="Reset Map View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset View</span>
          </button>
        </div>
      </div>

      {/* Leaflet Map Div */}
      <div ref={mapContainerRef} style={{ height }} className="w-full z-10" />

      {/* Floating Legend */}
      <div className="absolute bottom-3 left-3 z-20 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-200 shadow-md text-[11px] font-semibold text-[#0B1736] flex items-center space-x-3">
        <span className="flex items-center space-x-1">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
          <span>Critical (75-100)</span>
        </span>
        <span className="flex items-center space-x-1">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
          <span>High (60-74)</span>
        </span>
        <span className="flex items-center space-x-1">
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
          <span>Moderate (45-59)</span>
        </span>
        <span className="flex items-center space-x-1">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span>Low (&lt;45)</span>
        </span>
      </div>

    </div>
  );
}
