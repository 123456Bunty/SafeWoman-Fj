
import React, { useState, useEffect, useCallback } from 'react';
import { ViewMode, SafetyReport, EmergencyContact } from './types';
import Dashboard from './components/Dashboard';
import MapView from './components/MapView';
import SafetyReportsList from './components/SafetyReportsList';
import GeminiAssistant from './components/GeminiAssistant';
import Navbar from './components/Navbar';
import EmergencyOverlay from './components/EmergencyOverlay';
import { AlertTriangle, Map, Shield, MessageCircle, Settings, Phone } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>(ViewMode.DASHBOARD);
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [isLocationSharing, setIsLocationSharing] = useState(false);
  const [reports, setReports] = useState<SafetyReport[]>([
    {
      id: '1',
      lat: -18.1416,
      lng: 178.4419,
      type: 'poor-lighting',
      description: 'Street lights out on Victoria Parade near Albert Park.',
      severity: 'medium',
      timestamp: Date.now() - 3600000
    },
    {
      id: '2',
      lat: -18.1345,
      lng: 178.4231,
      type: 'safe',
      description: 'Police presence felt safe near Suva Market.',
      severity: 'low',
      timestamp: Date.now() - 7200000
    }
  ]);

  const [contacts] = useState<EmergencyContact[]>([
    { id: '1', name: 'Police Fiji', phone: '911', relation: 'Authority' },
    { id: '2', name: 'Suva NGO Support', phone: '331 4160', relation: 'Help Desk' },
    { id: '3', name: 'Mom', phone: '555-0199', relation: 'Family' }
  ]);

  const handleSOS = useCallback(() => {
    setIsSOSActive(true);
  }, []);

  const addReport = (newReport: SafetyReport) => {
    setReports(prev => [newReport, ...prev]);
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto glass shadow-2xl overflow-hidden relative">
      {/* Header */}
      <header className="p-4 bg-white/40 backdrop-blur-md border-b border-white/40 flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-rose-200">
            <Shield className="text-white w-5 h-5" />
          </div>
          <h1 className="font-bold text-xl text-rose-950">SafeWomen Fiji</h1>
        </div>
        <div className="flex items-center gap-2">
          {isLocationSharing && (
            <span className="flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-100/80 px-2 py-1 rounded-full animate-pulse border border-green-200">
              LIVE
            </span>
          )}
          <button 
            onClick={() => setCurrentView(ViewMode.SETTINGS)}
            className="p-2 text-rose-800 hover:bg-rose-100/50 rounded-full transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {currentView === ViewMode.DASHBOARD && (
          <Dashboard 
            onSOS={handleSOS} 
            isLocationSharing={isLocationSharing}
            toggleLocationSharing={() => setIsLocationSharing(!isLocationSharing)}
            recentReports={reports.slice(0, 3)}
            onNavigate={(view) => setCurrentView(view)}
          />
        )}
        {currentView === ViewMode.MAP && (
          <MapView reports={reports} addReport={addReport} />
        )}
        {currentView === ViewMode.REPORTS && (
          <SafetyReportsList reports={reports} />
        )}
        {currentView === ViewMode.ASSISTANT && (
          <GeminiAssistant reports={reports} />
        )}
        {currentView === ViewMode.SETTINGS && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-rose-950 mb-6">Settings</h2>
            <div className="space-y-6">
              <section>
                <h3 className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-3">Emergency Contacts</h3>
                <div className="space-y-3">
                  {contacts.map(c => (
                    <div key={c.id} className="flex justify-between items-center p-4 bg-white/60 rounded-2xl border border-white shadow-sm">
                      <div>
                        <p className="font-bold text-rose-950">{c.name}</p>
                        <p className="text-xs text-rose-600">{c.relation} • {c.phone}</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
                        <Phone className="w-4 h-4" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              <section>
                <h3 className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-3">Community Partnerships</h3>
                <div className="p-5 bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl text-white shadow-lg">
                  <p className="text-[10px] text-rose-100 italic font-bold mb-1">PROUD PARTNER</p>
                  <p className="text-lg font-black leading-tight">Fiji Women's Rights Movement</p>
                  <p className="text-xs text-rose-500 bg-white/90 mt-3 inline-block px-3 py-1 rounded-full font-bold">Official Safety NGO</p>
                </div>
              </section>
            </div>
          </div>
        )}
      </main>

      {/* SOS Overlay */}
      {isSOSActive && <EmergencyOverlay onClose={() => setIsSOSActive(false)} contacts={contacts} />}

      {/* Navigation */}
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  );
};

export default App;
