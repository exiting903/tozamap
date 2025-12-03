
import React, { useEffect, useRef, useState } from 'react';
import { PollutionCategory, Report, ReportStatus, EcoPoint, EcoPointType, AQIData } from '../types';
import { CATEGORY_COLORS, CATEGORY_ICONS, ECO_POINTS } from '../constants';
import { getTashkentAQI, getAQIColor, getAQIStatusKey } from '../services/aqiService';

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
  
  // AQI State
  const [aqiData, setAqiData] = useState<AQIData | null>(null);

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
    
    // Fetch AQI Data
    getTashkentAQI().then(data => {
        if (data) {
            console.log("AQI Data received:", data);
            setAqiData(data);
        } else {
            console.log("AQI Data not available");
        }
    });

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
    // Show if "ALL" is selected
    if (activeCategory === 'ALL') {
      ECO_POINTS.forEach((point) => {
         const isRecycling = point.type === EcoPointType.RECYCLING;
         // Recycling = Green, Volunteer = Indigo/Purple
         const colorClass = isRecycling ? 'bg-emerald-500' : 'bg-indigo-500';
         const iconClass = isRecycling ? 'fa-recycle' : 'fa-hand-holding-heart';

         const iconHtml = `
          <div class="relative flex flex-col items-center justify-center group">
            <div class="w-9 h-9 rounded-full shadow-xl flex items-center justify-center text-white border-[3px] border-white ${colorClass} hover:scale-110 transition-transform cursor-pointer z-10">
              <i class="fa-solid ${iconClass} text-sm"></i>
            </div>
            <div class="absolute -bottom-1 w-4 h-2 bg-black/20 blur-sm rounded-full"></div>
          </div>
         `;

         const icon = L.divIcon({
            html: iconHtml,
            className: 'leaflet-div-icon',
            iconSize: [36, 36],
            iconAnchor: [18, 18]
         });

         const popupContent = `
             <div class="text-center min-w-[200px]">
               <div class="flex items-center justify-center gap-2 mb-2">
                 <div class="w-6 h-6 rounded-full ${colorClass} flex items-center justify-center text-white text-xs">
                    <i class="fa-solid ${iconClass}"></i>
                 </div>
                 <div class="font-bold text-slate-800 text-sm">${point.name}</div>
               </div>
               <div class="text-xs text-slate-600 mb-2 italic">${point.description}</div>
               
               <div class="bg-slate-50 rounded p-2 mb-2 text-left">
                 <div class="text-[10px] text-slate-400 uppercase font-bold mb-0.5">Время работы</div>
                 <div class="text-xs font-semibold text-slate-700">${point.workingHours}</div>
               </div>

               <div class="bg-slate-50 rounded p-2 mb-2 text-left">
                 <div class="text-[10px] text-slate-400 uppercase font-bold mb-0.5">Контакты</div>
                 <div class="text-xs font-semibold text-blue-600">${point.contact}</div>
               </div>

               <div class="flex flex-wrap gap-1 justify-center">
                  ${point.acceptedItems?.map(i => `<span class="px-2 py-0.5 bg-emerald-50 border border-emerald-100 rounded-full text-[10px] text-emerald-700 font-medium">${i}</span>`).join('')}
               </div>
             </div>
         `;

         const marker = L.marker([point.location.lat, point.location.lng], { icon })
            .addTo(map)
            .bindPopup(popupContent, { closeButton: false, className: 'custom-popup' });
         
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
      <div className="absolute top-4 left-0 w-full overflow-x-auto px-4 flex space-x-2 pb-2 z-[500] no-scrollbar pr-20">
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

      {/* AQI Widget (Top Right) */}
      {aqiData && (
          <div className="absolute top-20 right-4 z-[1000] flex flex-col items-end gap-2 animate-slide-down pointer-events-none">
              <div className="bg-white/95 backdrop-blur rounded-2xl shadow-lg p-3 border border-slate-200 flex flex-col items-center min-w-[100px] pointer-events-auto">
                  <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">{t.aqi.label}</div>
                  <div className={`text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm mb-2 ${getAQIColor(aqiData.aqi)}`}>
                      {aqiData.aqi} AQI
                  </div>
                  <div className="text-xs font-semibold text-slate-700 text-center leading-tight mb-2">
                      {t.aqi[getAQIStatusKey(aqiData.aqi).split('.')[1]]}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 border-t border-slate-200 pt-2 w-full justify-center">
                       <img src={`https://www.airvisual.com/images/${aqiData.icon}.png`} className="w-6 h-6" alt="weather" />
                       <span className="text-sm font-medium">{aqiData.temperature}°C</span>
                  </div>
              </div>
          </div>
      )}

      {/* Floating Action Buttons */}
      <div className="absolute bottom-20 right-4 flex flex-col space-y-3 z-[500]">
         <button 
            onClick={handleCenterOnUser}
            className={`w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center active:bg-slate-50 transition-colors ${userLocation ? 'text-blue-500' : 'text-slate-400'}`}
         >
            <i className="fa-solid fa-location-crosshairs text-lg"></i>
         </button>
      </div>
    </div>
  );
};

