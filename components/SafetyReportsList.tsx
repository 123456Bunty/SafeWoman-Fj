
import React from 'react';
import { SafetyReport } from '../types';
import { AlertCircle, ShieldCheck, MapPin, Clock } from 'lucide-react';

interface SafetyReportsListProps {
  reports: SafetyReport[];
}

const SafetyReportsList: React.FC<SafetyReportsListProps> = ({ reports }) => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl font-bold">Safety Community</h2>
        <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-full">
          Live Suva
        </span>
      </div>

      <div className="space-y-4">
        {reports.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No reports found in your area.</p>
          </div>
        ) : (
          reports.map(report => (
            <div key={report.id} className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                  report.type === 'safe' 
                    ? 'bg-green-50 text-green-600' 
                    : report.severity === 'high' 
                      ? 'bg-red-50 text-red-600' 
                      : 'bg-orange-50 text-orange-600'
                }`}>
                  {report.type === 'safe' ? <ShieldCheck className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                  {report.type.replace('-', ' ')}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                  <Clock className="w-3 h-3" />
                  {new Date(report.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              
              <p className="text-gray-800 text-sm mb-4 leading-relaxed">
                {report.description}
              </p>

              <div className="flex items-center gap-2 text-indigo-600 text-xs font-medium">
                <MapPin className="w-3 h-3" />
                <span>Near Suva CBD</span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-8 p-6 bg-indigo-900 rounded-3xl text-white relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-xs font-bold opacity-70 uppercase mb-1">Impact Corner</p>
          <h4 className="text-lg font-bold">1,240 Lives Safely Home</h4>
          <p className="text-sm opacity-80 mt-1">Community reports help police identify dark spots across the city.</p>
        </div>
        <div className="absolute right-[-10px] top-[-10px] opacity-10">
          <ShieldCheck className="w-24 h-24" />
        </div>
      </div>
    </div>
  );
};

export default SafetyReportsList;
