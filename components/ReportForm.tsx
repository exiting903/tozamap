
import React, { useState, useEffect, useRef } from 'react';
import { PollutionCategory } from '../types';
import { CATEGORY_ICONS } from '../constants';

interface ReportFormProps {
  onCancel: () => void;
  onSubmit: (data: any) => void;
  t: any;
}

export const ReportForm: React.FC<ReportFormProps> = ({ onCancel, onSubmit, t }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedCategory, setSelectedCategory] = useState<PollutionCategory | null>(null);
  const [description, setDescription] = useState('');
  const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null);
  const [isLoadingMap, setIsLoadingMap] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Init map when entering step 2
  useEffect(() => {
    if (step === 2 && mapContainerRef.current && !mapRef.current) {
      const L = (window as any).L;
      if (!L) return;

      // Default to Tashkent initially
      const defaultLat = 41.311081;
      const defaultLng = 69.240562;

      const map = L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: false,
        dragging: true
      }).setView([defaultLat, defaultLng], 15);

      // Use CartoDB Voyager for the picker as well
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OSM &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map);

      mapRef.current = map;

      // Listen to move events to update coords based on center
      map.on('move', () => {
        const center = map.getCenter();
        setCoords({ lat: center.lat, lng: center.lng });
      });

      map.on('moveend', () => {
         const center = map.getCenter();
         setCoords({ lat: center.lat, lng: center.lng });
      });

      // Try to get real location to center map
      if ('geolocation' in navigator) {
        setIsLoadingMap(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                map.setView([latitude, longitude], 17);
                setCoords({ lat: latitude, lng: longitude });
                setIsLoadingMap(false);
            },
            (error) => {
                console.warn("Geo error", error);
                setCoords({ lat: defaultLat, lng: defaultLng });
                setIsLoadingMap(false);
            },
            { enableHighAccuracy: true, timeout: 5000 }
        );
      } else {
          setCoords({ lat: defaultLat, lng: defaultLng });
      }
    }

    return () => {
        if (step === 1 && mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
        }
    };
  }, [step]);


  const handleNext = (cat: PollutionCategory) => {
      setSelectedCategory(cat);
      setStep(2);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!selectedCategory || !coords) return;
    
    onSubmit({
      category: selectedCategory,
      description: description || t.form.placeholderDesc,
      location: { 
          lat: coords.lat, 
          lng: coords.lng,
          addressName: `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`
      },
      image: imagePreview // Pass the uploaded image
    });
  };

  const handleLocateMe = () => {
      if (mapRef.current && 'geolocation' in navigator) {
          setIsLoadingMap(true);
          navigator.geolocation.getCurrentPosition((pos) => {
              mapRef.current.setView([pos.coords.latitude, pos.coords.longitude], 17);
              setIsLoadingMap(false);
          }, () => setIsLoadingMap(false));
      }
  };

  return (
    <div className="fixed inset-0 z-[1100] bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-slate-100 shrink-0">
        <button onClick={onCancel} className="text-slate-500 p-2">
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>
        <h2 className="font-semibold text-lg">{t.form.title}</h2>
        <div className="w-8"></div> 
      </div>

      <div className="flex-1 overflow-y-auto bg-slate-50">
        {step === 1 && (
          <div className="p-6 animate-fade-in">
            <h3 className="text-xl font-bold text-slate-800 mb-2">{t.form.step1Title}</h3>
            <p className="text-slate-500 mb-6">{t.form.step1Desc}</p>
            
            <div className="grid grid-cols-2 gap-4">
              {Object.values(PollutionCategory).map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleNext(cat)}
                  className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 transition-all ${selectedCategory === cat ? 'border-emerald-500 bg-emerald-50' : 'border-white bg-white shadow-sm hover:border-emerald-200'}`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${selectedCategory === cat ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    <i className={`fa-solid ${CATEGORY_ICONS[cat]}`}></i>
                  </div>
                  <span className={`font-medium ${selectedCategory === cat ? 'text-emerald-700' : 'text-slate-600'}`}>{t.categories[cat]}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col h-full">
             {/* Map Picker Section */}
             <div className="relative w-full h-[40vh] bg-slate-200 shrink-0">
                <div ref={mapContainerRef} className="absolute inset-0 z-0" />
                
                {/* Center Pin (Fixed) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 -mt-4 pointer-events-none text-emerald-600 drop-shadow-xl">
                    <i className="fa-solid fa-location-dot text-4xl filter drop-shadow-md"></i>
                    <div className="w-2 h-2 bg-emerald-800/50 rounded-full absolute -bottom-1 left-1/2 -translate-x-1/2 blur-[1px]"></div>
                </div>

                {/* Map Controls */}
                <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
                     <button 
                        onClick={handleLocateMe}
                        className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center text-slate-600 active:bg-slate-50"
                     >
                        <i className={`fa-solid ${isLoadingMap ? 'fa-circle-notch fa-spin' : 'fa-location-crosshairs'}`}></i>
                     </button>
                </div>
             </div>

             {/* Form Section */}
             <div className="flex-1 bg-white p-6 rounded-t-3xl -mt-6 relative z-20 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
                 <div className="mx-auto w-12 h-1 bg-slate-200 rounded-full mb-6"></div>
                 
                 {/* Image Upload Field */}
                 <div className="mb-6">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Фотография</label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-32 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 hover:border-emerald-400 transition relative overflow-hidden bg-slate-50"
                    >
                        {imagePreview ? (
                            <>
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover opacity-80" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white font-medium opacity-0 hover:opacity-100 transition-opacity">
                                    <i className="fa-solid fa-pen mr-2"></i> {t.form.changePhoto}
                                </div>
                            </>
                        ) : (
                            <>
                                <i className="fa-solid fa-camera text-3xl text-slate-400 mb-2"></i>
                                <span className="text-slate-500 text-sm font-medium">{t.form.addPhoto}</span>
                            </>
                        )}
                    </div>
                    <input 
                        ref={fileInputRef}
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleImageChange}
                    />
                 </div>

                 <div className="mb-6">
                     <label className="block text-sm font-bold text-slate-700 mb-2">Комментарий</label>
                     <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={t.form.placeholderDesc}
                        className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-emerald-500 focus:outline-none h-24 resize-none"
                     ></textarea>
                 </div>

                 <button 
                    onClick={handleSubmit}
                    disabled={!coords}
                    className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-emerald-200 disabled:opacity-50 active:scale-95 transition-transform"
                 >
                    {t.form.submit}
                 </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
