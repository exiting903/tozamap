
import React, { useEffect, useRef, useState } from 'react';
import { PollutionCategory, Report, ReportStatus, EcoPoint, EcoPointType } from '../types';
import { CATEGORY_COLORS, CATEGORY_ICONS, ECO_POINTS } from '../constants';

interface MapDataProps {
  reports: Report[];
  onReportClick: (report: Report) => void;
  activeCategory: PollutionCategory | 'ALL';
  setActiveCategory: (cat: PollutionCategory | 'ALL') => void;
  t: any;
}

export const MapData: React.FC<MapDataProps> = ({ reports, onReportClick, activeCategory, setActiveCategory, t }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const userMarkerRef = useRef<any>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  // Initialize Map
  useEffect(() => {
    const L = (window as any).L;
    if (!L || !mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false
    }).setView([41.311081, 69.240562], 13); // Tashkent

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OSM &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    mapRef.current = map;

    // Start watching user location
    if ('geolocation' in navigator) {
        navigator.geolocation.watchPosition(
            (pos) => {
                const newLoc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                setUserLocation(newLoc);
            },
            (err) => console.warn('Geo watch error:', err),
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
        );
    }

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Handle User Location Marker (Pulsing Blue Dot)
  useEffect(() => {
      const L = (window as any).L;
      const map = mapRef.current;
      if (!map || !L || !userLocation) return;

      if (userMarkerRef.current) {
          userMarkerRef.current.setLatLng([userLocation.lat, userLocation.lng]);
      } else {
          const userIcon = L.divIcon({
              html: `
                <div class="relative flex items-center justify-center w-6 h-6">
                    <span class="absolute inline-flex w-full h-full rounded-full opacity-75 bg-blue-400 animate-ping"></span>
                    <span class="relative inline-flex w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow-sm"></span>
                </div>
              `,
              className: 'leaflet-div-icon',
              iconSize: [24, 24],
              iconAnchor: [12, 12]
          });

          userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], { 
              icon: userIcon, 
              zIndexOffset: 1000 
          }).addTo(map);
      }
  }, [userLocation]);

  // Handle Markers (Reports + EcoPoints)
  useEffect(() => {
    const map = mapRef.current;
    const L = (window as any).L;
    if (!map || !L) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // 1. Render Reports
    const activeReports = reports.filter(r => r.status !== ReportStatus.RESOLVED);
    const filteredReports = activeCategory === 'ALL' 
      ? activeReports 
      : activeReports.filter(r => r.category === activeCategory);

    filteredReports.forEach((report) => {
      const iconHtml = `
        <div class="relative flex flex-col items-center justify-center">
          <div class="w-8 h-8 rounded-full shadow-lg flex items-center justify-center text-white border-2 border-white ${CATEGORY_COLORS[report.category]} hover:scale-110 transition-transform cursor-pointer">
            <i class="fa-solid ${CATEGORY_ICONS[report.category]} text-xs"></i>
          </div>
        </div>
      `;

      const icon = L.divIcon({
        html: iconHtml,
        className: 'leaflet-div-icon', 
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker([report.location.lat, report.location.lng], { icon })
        .addTo(map)
        .on('click', () => onReportClick(report));
      
      markersRef.current.push(marker);
    });

    // 2. Render Eco Points (Recycling & Volunteers)
    // Only show them if "ALL" or no specific pollution filter is active (optional logic, here we show them always unless specific filters conflict, but let's show them always for now)
    if (activeCategory === 'ALL') {
      ECO_POINTS.forEach((point) => {
         const isRecycling = point.type === EcoPointType.RECYCLING;
         const colorClass = isRecycling ? 'bg-emerald-500' : 'bg-indigo-500';
         const iconClass = isRecycling ? 'fa-recycle' : 'fa-hand-holding-heart';

         const iconHtml = `
          <div class="relative flex flex-col items-center justify-center">
            <div class="w-8 h-8 rounded-full shadow-lg flex items-center justify-center text-white border-2 border-white ${colorClass} hover:scale-110 transition-transform cursor-pointer">
              <i class="fa-solid ${iconClass} text-xs"></i>
            </div>
          </div>
         `;

         const icon = L.divIcon({
            html: iconHtml,
            className: 'leaflet-div-icon',
            iconSize: [32, 32],
            iconAnchor: [16, 16]
         });

         const marker = L.marker([point.location.lat, point.location.lng], { icon })
            .addTo(map)
            .bindPopup(`
               <div class="text-center p-1">
                 <div class="font-bold text-emerald-700 mb-1">${point.name}</div>
                 <div class="text-xs text-slate-600 mb-2">${point.description}</div>
                 <div class="text-xs font-semibold">🕒 ${point.workingHours}</div>
                 <div class="text-xs text-blue-600 mt-1">${point.contact}</div>
                 <div class="mt-2 flex flex-wrap gap-1 justify-center">
                    ${point.acceptedItems?.map(i => `<span class="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] text-slate-500">${i}</span>`).join('')}
                 </div>
               </div>
            `);
         
         markersRef.current.push(marker);
      });
    }

  }, [reports, activeCategory, onReportClick]);

  const handleCenterOnUser = () => {
      if (userLocation && mapRef.current) {
          mapRef.current.setView([userLocation.lat, userLocation.lng], 15);
      } else if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition((pos) => {
             if(mapRef.current) {
                 mapRef.current.setView([pos.coords.latitude, pos.coords.longitude], 15);
             }
          });
      }
  };

  return (
    <div className="relative w-full h-full bg-slate-100 overflow-hidden">
      {/* Leaflet Map Container */}
      <div ref={mapContainerRef} className="absolute inset-0 z-0" />
      
      {/* Floating Filter Chips */}
      <div className="absolute top-4 left-0 w-full overflow-x-auto px-4 flex space-x-2 pb-2 z-[500] no-scrollbar">
        <button
          onClick={() => setActiveCategory('ALL')}
          className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium shadow-md transition-colors ${activeCategory === 'ALL' ? 'bg-slate-800 text-white' : 'bg-white text-slate-600'}`}
        >
          {t.map.all}
        </button>
        {Object.values(PollutionCategory).map(cat => (
           <button
           key={cat}
           onClick={() => setActiveCategory(cat)}
           className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium shadow-md transition-colors flex items-center gap-2 ${activeCategory === cat ? `${CATEGORY_COLORS[cat]} text-white` : 'bg-white text-slate-600'}`}
         >
           <i className={`fa-solid ${CATEGORY_ICONS[cat]} text-xs`}></i>
           {t.categories[cat]}
         </button>
        ))}
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute bottom-20 right-4 flex flex-col space-y-2 z-[500]">
         <button 
            onClick={handleCenterOnUser}
            className={`w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center active:bg-slate-50 ${userLocation ? 'text-blue-500' : 'text-slate-600'}`}
         >
            <i className="fa-solid fa-location-crosshairs"></i>
         </button>
         <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-slate-600 active:bg-slate-50">
            <i className="fa-solid fa-layer-group"></i>
         </button>
      </div>
    </div>
  );
};
