import React, { useEffect, useRef } from 'react';
import { PollutionCategory, Report, ReportStatus } from '../types';
import { CATEGORY_COLORS, CATEGORY_ICONS } from '../constants';

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

  // Initialize Map
  useEffect(() => {
    const L = (window as any).L;
    if (!L || !mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false
    }).setView([41.311081, 69.240562], 13); // Tashkent

    // Changed to CartoDB Voyager tiles for better aesthetics
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Handle Markers
  useEffect(() => {
    const map = mapRef.current;
    const L = (window as any).L;
    if (!map || !L) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Filter active reports: Must match category AND NOT be resolved
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
  }, [reports, activeCategory, onReportClick]);

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
            onClick={() => {
               mapRef.current?.setView([41.311081, 69.240562], 13);
            }}
            className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-slate-600 active:bg-slate-50"
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