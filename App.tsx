
import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { MapData } from './components/MapData';
import { ReportForm } from './components/ReportForm';
import { Profile } from './components/Profile';
import { ReportDetails } from './components/ReportDetails';
import { Auth } from './components/Auth';
import { Toast } from './components/Toast';
import { INITIAL_REPORTS } from './constants';
import { translations } from './translations';
import { Report, ViewState, PollutionCategory, ReportStatus, User, Language } from './types';

const App: React.FC = () => {
  // User State - Null means not logged in
  const [user, setUser] = useState<User | null>(null);
  
  const [view, setView] = useState<ViewState>('MAP');
  const [reports, setReports] = useState<Report[]>(INITIAL_REPORTS);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [activeCategory, setActiveCategory] = useState<PollutionCategory | 'ALL'>('ALL');
  
  // Language State
  const [language, setLanguage] = useState<Language>('ru');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const t = translations[language];

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    setView('MAP');
  };

  const handleLogout = () => {
    setUser(null);
    setView('AUTH'); // Conceptually, though handleLogin will just re-render Auth
  };

  const handleNavigate = (newView: ViewState) => {
    if (newView !== 'REPORT_DETAILS') {
      setSelectedReport(null);
    }
    setView(newView);
  };

  const handleReportClick = (report: Report) => {
    setSelectedReport(report);
    setView('REPORT_DETAILS');
  };

  const handleAddSubmit = (data: Partial<Report>) => {
    if (!user) return;

    const newReport: Report = {
      id: `r${Date.now()}`,
      userId: user.id,
      category: data.category as PollutionCategory,
      description: data.description || '',
      location: data.location || { lat: 0, lng: 0 },
      timestamp: Date.now(),
      status: ReportStatus.NEW,
      likes: 0,
      imageUrl: `https://picsum.photos/seed/${Date.now()}/800/600`, 
    };

    setReports(prev => [newReport, ...prev]);
    setView('MAP');
    setActiveCategory('ALL');
    showToast(t.toast.added);
    setUser(prev => prev ? ({ ...prev, points: prev.points + 10 }) : null);
  };

  const handleSupportReport = (reportId: string) => {
    const updatedReports = reports.map(r => {
      if (r.id === reportId) {
        return { ...r, likes: r.likes + 1 };
      }
      return r;
    });
    
    setReports(updatedReports);
    
    if (selectedReport && selectedReport.id === reportId) {
      setSelectedReport(prev => prev ? { ...prev, likes: prev.likes + 1 } : null);
    }
  };

  const handleFixReport = (reportId: string) => {
    const pointsAwarded = 50;

    const updatedReports = reports.map(r => {
      if (r.id === reportId) {
        return { ...r, status: ReportStatus.RESOLVED };
      }
      return r;
    });
    setReports(updatedReports);

    setUser(prev => prev ? ({ ...prev, points: prev.points + pointsAwarded }) : null);

    if (selectedReport && selectedReport.id === reportId) {
        setSelectedReport(prev => prev ? { ...prev, status: ReportStatus.RESOLVED } : null);
    }

    showToast(t.toast.fixed);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  const toggleLanguage = () => {
    setLanguage(prev => {
        if (prev === 'ru') return 'uz';
        if (prev === 'uz') return 'en';
        return 'ru';
    });
  };

  // Calculate derived state for profile
  const userReportCount = user ? reports.filter(r => r.userId === user.id).length : 0;

  // If user is not logged in, show Auth screen
  if (!user) {
    return (
      <div className="relative w-full h-screen bg-slate-50 overflow-hidden max-w-lg mx-auto shadow-2xl border-x border-slate-200">
         <Auth onLogin={handleLogin} t={t} />
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-slate-50 overflow-hidden max-w-lg mx-auto shadow-2xl border-x border-slate-200">
      
      <Toast 
        message={toastMessage || ''} 
        isVisible={!!toastMessage} 
        onClose={() => setToastMessage(null)} 
      />

      {/* Main Content Area */}
      <div className="w-full h-full pb-16">
        {view === 'MAP' && (
          <MapData 
            reports={reports} 
            onReportClick={handleReportClick}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            t={t}
          />
        )}
        
        {view === 'PROFILE' && (
          <Profile 
            user={user} 
            reportCount={userReportCount}
            language={language}
            onToggleLanguage={toggleLanguage}
            t={t}
            onLogout={handleLogout}
          />
        )}
      </div>

      {/* Overlays */}
      {view === 'ADD' && (
        <ReportForm 
          onCancel={() => setView('MAP')}
          onSubmit={handleAddSubmit}
          t={t}
        />
      )}

      {view === 'REPORT_DETAILS' && selectedReport && (
        <ReportDetails 
          report={selectedReport}
          onBack={() => setView('MAP')}
          onSupport={handleSupportReport}
          onFix={handleFixReport}
          t={t}
          language={language}
        />
      )}

      {/* Persistent Navigation */}
      {view !== 'ADD' && view !== 'REPORT_DETAILS' && (
        <Navigation currentView={view} onNavigate={handleNavigate} t={t} />
      )}
    </div>
  );
};

export default App;
