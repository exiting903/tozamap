import React from 'react';
import { ViewState } from '../types';

interface NavigationProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  t: any;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate, t }) => {
  const navItemClass = (view: ViewState) => 
    `flex flex-col items-center justify-center w-full h-full space-y-1 ${currentView === view ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`;

  return (
    <div className="fixed bottom-0 left-0 z-[1100] w-full h-16 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
        <button 
          type="button" 
          onClick={() => onNavigate('MAP')}
          className={navItemClass('MAP')}
        >
          <i className="fa-solid fa-map-location-dot text-xl"></i>
          <span className="text-xs">{t.nav.map}</span>
        </button>
        
        <button 
          type="button" 
          onClick={() => onNavigate('ADD')}
          className="flex flex-col items-center justify-center w-full h-full -mt-6"
        >
          <div className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform active:scale-95 ${currentView === 'ADD' ? 'bg-emerald-700 ring-4 ring-emerald-100' : 'bg-emerald-500'}`}>
             <i className="fa-solid fa-plus text-white text-2xl"></i>
          </div>
          <span className="text-xs mt-1 text-slate-500">{t.nav.add}</span>
        </button>

        <button 
          type="button" 
          onClick={() => onNavigate('PROFILE')}
          className={navItemClass('PROFILE')}
        >
          <i className="fa-solid fa-user text-xl"></i>
          <span className="text-xs">{t.nav.profile}</span>
        </button>
      </div>
    </div>
  );
};