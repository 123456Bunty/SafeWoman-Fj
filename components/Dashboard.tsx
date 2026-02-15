
import React from 'react';
import { ViewMode, SafetyReport } from '../types';
import { AlertCircle, MapPin, Share2, ShieldCheck, ChevronRight, Activity, Sparkles } from 'lucide-react';

interface DashboardProps {
  onSOS: () => void;
  isLocationSharing: boolean;
  toggleLocationSharing: () => void;
  recentReports: SafetyReport[];
  onNavigate: (view: ViewMode) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  onSOS, 
  isLocationSharing, 
  toggleLocationSharing, 
  recentReports,
  onNavigate 
}) => {
  return (
    <div className="p-5 space-y-6">
      {/* Hero Safety Tip - Professional Look */}
      <div className="bg-gradient-to-br from-rose-600 via-pink-700 to-indigo-800 p-6 rounded-[2rem] text-white shadow-xl relative overflow-hidden group">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2 text-rose-100">
             <Sparkles className="w-4 h-4" />
             <span className="text-[10px] font-bold uppercase tracking-widest">Nightly Safety Brief</span>
          </div>
          <h2 className="text-xl font-bold leading-tight">Stay Safe Near the Harbor</h2>
          <p className="text-rose-100/80 text-sm mt-1 max-w-[80%]">Street lights are dim near Victoria Parade. We recommend staying on Main St tonight.</p>
          <button 
            onClick={() => onNavigate(ViewMode.ASSISTANT)}
            className="mt-5 bg-white text-rose-700 hover:bg-rose-50 text-xs font-black py-2.5 px-6 rounded-full transition-all shadow-md active:scale-95"
          >
            Ask AI Assistant
          </button>
        </div>
        <div className="absolute right-[-30px] bottom-[-20px] opacity-10 group-hover:scale-110 transition-transform duration-700">
          <ShieldCheck className="w-44 h-44" />
        </div>
      </div>

      {/* SOS Button Area */}
      <div className="flex flex-col items-center gap-4 py-2">
        <button 
          onClick={onSOS}
          className="w-44 h-44 rounded-full bg-red-500 shadow-[0_0_40px_rgba(239,68,68,0.4)] flex items-center justify-center flex-col gap-1 active:scale-90 transition-all pulse relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
          <AlertCircle className="w-16 h-16 text-white" />
          <span className="text-white font-black text-2xl tracking-tighter">SOS</span>
        </button>
        <p className="text-[10px] text-rose-400 font-bold text-center px-12 uppercase tracking-wide">
          Tap in case of danger. Alerts authorities immediately.
        </p>
      </div>

      {/* Main Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={toggleLocationSharing}
          className={`p-5 rounded-3xl border flex flex-col items-center gap-2 transition-all duration-300 shadow-sm ${
            isLocationSharing ? 'bg-green-600 border-green-400 text-white' : 'bg-white/60 border-white/50 hover:bg-white text-rose-950'
          }`}
        >
          <Share2 className={`w-6 h-6 ${isLocationSharing ? 'text-white' : 'text-rose-600'}`} />
          <span className="text-xs font-bold uppercase tracking-tight">Share Live</span>
          <span className={`text-[8px] font-black uppercase ${isLocationSharing ? 'text-green-100' : 'text-rose-300'}`}>
            {isLocationSharing ? 'ACTIVE' : 'OFFLINE'}
          </span>
        </button>
        <button 
          onClick={() => onNavigate(ViewMode.MAP)}
          className="p-5 rounded-3xl bg-white/60 border border-white/50 hover:bg-white flex flex-col items-center gap-2 shadow-sm transition-all"
        >
          <MapPin className="w-6 h-6 text-rose-600" />
          <span className="text-xs font-bold uppercase tracking-tight text-rose-950">Safe Map</span>
          <span className="text-[8px] text-rose-300 font-black uppercase tracking-tight">Suva Central</span>
        </button>
      </div>

      {/* Reports Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h3 className="font-black text-rose-950 tracking-tight text-lg">Community Feed</h3>
          <button 
            onClick={() => onNavigate(ViewMode.REPORTS)}
            className="text-rose-600 text-xs font-bold flex items-center gap-1 hover:underline"
          >
            View Alerts <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="space-y-3">
          {recentReports.map(report => (
            <div key={report.id} className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl border border-white shadow-sm hover:bg-white transition-colors">
              <div className={`p-3 rounded-xl shadow-inner ${
                report.type === 'safe' ? 'bg-green-100 text-green-700' : 'bg-rose-100 text-rose-700'
              }`}>
                {report.type === 'safe' ? <ShieldCheck className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold capitalize text-rose-950">{report.type.replace('-', ' ')}</p>
                <p className="text-xs text-rose-500/80 line-clamp-1 font-medium">{report.description}</p>
              </div>
              <span className="text-[9px] text-rose-300 font-black">
                {new Date(report.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Professional Sponsor Bar */}
      <div className="pt-2">
        <div className="bg-white/40 border border-white/60 rounded-2xl p-3 flex items-center gap-3">
          <div className="w-10 h-10 bg-rose-900 rounded-xl flex items-center justify-center text-[10px] text-white font-black">Viti</div>
          <div className="flex-1">
            <p className="text-[9px] font-black text-rose-400 uppercase tracking-widest">Sponsored Partner</p>
            <p className="text-xs font-bold text-rose-950">10% off secure taxi rides with VitiCabs. Use: SAFEFIJI</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
