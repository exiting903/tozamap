import React, { useState } from 'react';
import { Report, PollutionCategory, AnalysisResult, ReportStatus, Language } from '../types';
import { CATEGORY_ICONS, CATEGORY_COLORS } from '../constants';
import { analyzeReportWithGemini } from '../services/geminiService';

interface ReportDetailsProps {
  report: Report;
  onBack: () => void;
  onSupport: (reportId: string) => void;
  onFix: (reportId: string) => void;
  t: any;
  language: Language;
}

export const ReportDetails: React.FC<ReportDetailsProps> = ({ report, onBack, onSupport, onFix, t, language }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | undefined>(report.aiAnalysis);
  const [hasSupported, setHasSupported] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    const result = await analyzeReportWithGemini(report.category, report.description, language);
    if (result) {
      setAnalysis(result);
    }
    setIsAnalyzing(false);
  };

  const handleSupportClick = () => {
    if (!hasSupported) {
        onSupport(report.id);
        setHasSupported(true);
    }
  };

  const getSeverityColor = (score: number) => {
    if (score < 4) return 'bg-green-500';
    if (score < 7) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const isResolved = report.status === ReportStatus.RESOLVED;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto flex flex-col">
      <div className="relative h-72 w-full bg-slate-200">
        <img src={report.imageUrl} alt="Report" className="w-full h-full object-cover" />
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-slate-800 shadow-lg z-10"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-semibold text-slate-700 shadow-sm">
          {new Date(report.timestamp).toLocaleDateString()}
        </div>
        {isResolved && (
             <div className="absolute inset-0 bg-emerald-900/40 flex items-center justify-center backdrop-blur-sm">
                 <div className="bg-white px-6 py-3 rounded-full shadow-xl transform -rotate-6">
                     <span className="text-emerald-600 font-bold text-xl uppercase tracking-widest border-2 border-emerald-600 px-2 py-1 rounded">{t.details.resolved}</span>
                 </div>
             </div>
        )}
      </div>

      <div className="flex-1 p-6 -mt-6 bg-white rounded-t-3xl relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-white mb-3 ${CATEGORY_COLORS[report.category]}`}>
              <i className={`fa-solid ${CATEGORY_ICONS[report.category]}`}></i>
              {t.categories[report.category]}
            </div>
            <h1 className="text-2xl font-bold text-slate-900">{report.location.addressName}</h1>
            <div className="flex items-center text-slate-500 text-sm mt-1">
               <i className="fa-solid fa-location-dot mr-1.5"></i>
               {report.location.lat.toFixed(4)}, {report.location.lng.toFixed(4)}
            </div>
          </div>
        </div>

        <p className="text-slate-600 text-lg leading-relaxed mb-8">
          {report.description}
        </p>

        {/* AI Analysis Section */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
               <i className="fa-solid fa-wand-magic-sparkles text-purple-600"></i>
               <h3 className="font-bold text-slate-800">{t.details.aiTitle}</h3>
            </div>
            {!analysis && (
              <button 
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg font-medium shadow hover:bg-purple-700 transition disabled:opacity-70"
              >
                {isAnalyzing ? <i className="fa-solid fa-circle-notch fa-spin"></i> : t.details.analyzeBtn}
              </button>
            )}
          </div>

          {analysis ? (
            <div className="space-y-4 animate-fade-in">
               <div>
                 <div className="flex justify-between text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wide">{t.details.severity}</div>
                 <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className={`h-full ${getSeverityColor(analysis.severity)}`} style={{ width: `${analysis.severity * 10}%` }}></div>
                    </div>
                    <span className="font-bold text-slate-800">{analysis.severity}/10</span>
                 </div>
               </div>
               
               <div className="grid grid-cols-1 gap-3">
                  <div className="bg-white p-3 rounded-xl border border-slate-100">
                    <div className="text-xs text-slate-400 mb-1">{t.details.health}</div>
                    <div className="text-sm font-medium text-slate-800">{analysis.healthImpact}</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-100">
                    <div className="text-xs text-slate-400 mb-1">{t.details.recommendation}</div>
                    <div className="text-sm font-medium text-emerald-700">{analysis.recommendation}</div>
                  </div>
               </div>
            </div>
          ) : (
            <p className="text-sm text-slate-400 italic">
              {t.details.placeholder}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
           <button 
            onClick={handleSupportClick}
            disabled={hasSupported || isResolved}
            className={`py-3 rounded-xl border transition-all font-semibold flex items-center justify-center gap-2 ${hasSupported ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'border-slate-200 text-slate-600 hover:bg-slate-50'} disabled:opacity-50`}
           >
              <i className={`${hasSupported ? 'fa-solid' : 'fa-regular'} fa-thumbs-up`}></i>
              {hasSupported ? t.details.supported : `${t.details.support} (${report.likes})`}
           </button>
           <button 
            onClick={() => onFix(report.id)}
            disabled={isResolved}
            className="py-3 rounded-xl bg-slate-900 text-white font-semibold shadow-lg hover:bg-slate-800 active:scale-95 transition-transform disabled:bg-slate-400 disabled:scale-100"
           >
              {isResolved ? t.details.resolved : t.details.fix}
           </button>
        </div>
      </div>
    </div>
  );
};