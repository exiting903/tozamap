
import React from 'react';
import { User, Language } from '../types';

interface ProfileProps {
  user: User;
  language: Language;
  onToggleLanguage: () => void;
  onLogout: () => void;
  t: any;
}

export const Profile: React.FC<ProfileProps> = ({ user, language, onToggleLanguage, onLogout, t }) => {
  const getLanguageLabel = (lang: Language) => {
      switch(lang) {
          case 'ru': return 'Русский (RU)';
          case 'uz': return 'O\'zbek (UZ)';
          case 'en': return 'English (EN)';
      }
  };

  return (
    <div className="h-full bg-white overflow-y-auto pb-20">
      {/* Header */}
      <div className="bg-emerald-600 text-white pt-12 pb-8 px-6 rounded-b-[2.5rem] shadow-xl mb-8">
        <div className="flex items-center gap-4 mb-6">
           <img 
            src={user.avatarUrl} 
            alt={user.name} 
            className="w-20 h-20 rounded-full border-4 border-emerald-400 object-cover bg-white"
           />
           <div>
             <h1 className="text-2xl font-bold">{user.name}</h1>
             <div className="text-emerald-100 text-sm mb-1">@{user.nickname}</div>
             <div className="inline-block px-3 py-1 bg-emerald-700 rounded-full text-xs font-medium border border-emerald-500">
                {user.rank}
             </div>
           </div>
        </div>
        
        <div className="flex justify-between text-center">
           <div className="bg-emerald-700/50 rounded-2xl p-3 flex-1 mr-2 backdrop-blur-sm border border-emerald-500/30">
              <div className="text-3xl font-bold">{user.points}</div>
              <div className="text-emerald-200 text-xs">{t.profile.pointsLabel}</div>
           </div>
           <div className="bg-emerald-700/50 rounded-2xl p-3 flex-1 ml-2 backdrop-blur-sm border border-emerald-500/30">
              <div className="text-3xl font-bold">12</div>
              <div className="text-emerald-200 text-xs">{t.profile.reportsLabel}</div>
           </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6">
        <h3 className="font-bold text-slate-800 text-lg mb-4">{t.profile.achievements}</h3>
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
             { icon: 'fa-seedling', color: 'text-green-500', bg: 'bg-green-100', label: t.profile.badges.novice },
             { icon: 'fa-camera', color: 'text-blue-500', bg: 'bg-blue-100', label: t.profile.badges.reporter },
             { icon: 'fa-hand-holding-heart', color: 'text-red-400', bg: 'bg-slate-100 grayscale', label: t.profile.badges.volunteer },
          ].map((badge, i) => (
            <div key={i} className="flex flex-col items-center text-center">
               <div className={`w-16 h-16 rounded-full ${badge.bg} flex items-center justify-center mb-2`}>
                 <i className={`fa-solid ${badge.icon} ${badge.color} text-2xl`}></i>
               </div>
               <span className="text-xs font-medium text-slate-600">{badge.label}</span>
            </div>
          ))}
        </div>

        <h3 className="font-bold text-slate-800 text-lg mb-4">{t.profile.settings}</h3>
        <div className="space-y-2">
           <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-3">
                <i className="fa-solid fa-bell w-6 text-center text-slate-400"></i>
                <span className="font-medium text-slate-700">{t.profile.notifications}</span>
                </div>
                <i className="fa-solid fa-chevron-right text-xs text-slate-300"></i>
            </button>

            <button 
                onClick={onToggleLanguage}
                className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
            >
                <div className="flex items-center gap-3">
                <i className="fa-solid fa-globe w-6 text-center text-slate-400"></i>
                <span className="font-medium text-slate-700">
                    {t.profile.language}
                </span>
                </div>
                <div className="text-xs text-slate-500 font-semibold uppercase mr-2 bg-slate-200 px-2 py-1 rounded">
                    {getLanguageLabel(language)}
                </div>
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-3">
                <i className="fa-solid fa-circle-question w-6 text-center text-slate-400"></i>
                <span className="font-medium text-slate-700">{t.profile.help}</span>
                </div>
                <i className="fa-solid fa-chevron-right text-xs text-slate-300"></i>
            </button>

            <button 
                onClick={onLogout}
                className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
            >
                <div className="flex items-center gap-3">
                <i className="fa-solid fa-arrow-right-from-bracket w-6 text-center text-red-500"></i>
                <span className="font-medium text-red-500">{t.profile.logout}</span>
                </div>
                <i className="fa-solid fa-chevron-right text-xs text-slate-300"></i>
            </button>
        </div>
      </div>
    </div>
  );
};