
import React from 'react';
import { GUIDE_CONTENT } from '../constants';

interface EcoGuideProps {
  t: any;
}

export const EcoGuide: React.FC<EcoGuideProps> = ({ t }) => {
  return (
    <div className="h-full bg-slate-50 overflow-y-auto pb-20">
      {/* Header */}
      <div className="bg-emerald-600 text-white pt-12 pb-6 px-6 rounded-b-[2rem] shadow-lg sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-2">
           <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
             <i className="fa-solid fa-book-open text-lg"></i>
           </div>
           <h1 className="text-2xl font-bold">{t.guide.title}</h1>
        </div>
        <p className="text-emerald-100 text-sm">{t.guide.subtitle}</p>
      </div>

      <div className="p-4 space-y-6">
        {GUIDE_CONTENT.map((section) => {
          // Dynamically get title based on key in constants
          const titleKey = section.titleKey.split('.')[1] as keyof typeof t.guide;
          const title = t.guide[titleKey] || section.titleKey;

          return (
            <div key={section.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-emerald-50/50 px-4 py-3 border-b border-emerald-100 flex items-center gap-3">
                <i className={`fa-solid ${section.icon} text-emerald-600`}></i>
                <h3 className="font-bold text-slate-800">{title}</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {section.items.map((item, idx) => (
                  <div key={idx} className="p-4">
                    <div className="font-bold text-slate-700 mb-1">{item.label}</div>
                    <div className="text-sm text-slate-500 leading-relaxed">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
           <div className="flex items-start gap-4">
              <i className="fa-solid fa-lightbulb text-2xl text-yellow-300 mt-1"></i>
              <div>
                 <h4 className="font-bold text-lg mb-2">Знаете ли вы?</h4>
                 <p className="text-sm text-blue-100 leading-relaxed">
                   Одна батарейка загрязняет тяжелыми металлами около 20 квадратных метров земли. Сдавайте их в специальные пункты приема!
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
