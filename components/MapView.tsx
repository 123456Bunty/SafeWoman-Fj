
import React, { useEffect, useRef, useState } from 'react';
import { SafetyReport } from '../types';
import { MapPin, Plus, Send, X } from 'lucide-react';

interface MapViewProps {
  reports: SafetyReport[];
  addReport: (report: SafetyReport) => void;
}

const MapView: React.FC<MapViewProps> = ({ reports, addReport }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [newReportType, setNewReportType] = useState<SafetyReport['type']>('suspicious-activity');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map focused on Suva, Fiji
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = (window as any).L.map(mapContainerRef.current, {
        center: [-18.1416, 178.4419],
        zoom: 14,
        zoomControl: false
      });

      (window as any).L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
      }).addTo(mapInstanceRef.current);
    }

    const L = (window as any).L;

    // Clear existing markers if any (simple implementation)
    mapInstanceRef.current.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        mapInstanceRef.current.removeLayer(layer);
      }
    });

    // Add markers for reports
    reports.forEach(report => {
      const color = report.type === 'safe' ? '#22c55e' : report.severity === 'high' ? '#ef4444' : '#f97316';
      
      const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: ${color}; width: 14px; height: 14px; border: 2px solid white; border-radius: 50%; box-shadow: 0 0 5px rgba(0,0,0,0.3)"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7]
      });

      L.marker([report.lat, report.lng], { icon: customIcon })
        .addTo(mapInstanceRef.current)
        .bindPopup(`<strong>${report.type.toUpperCase()}</strong><br>${report.description}`);
    });

    return () => {
      // Cleanup not strictly needed for this demo but good practice
    };
  }, [reports]);

  const handleSubmitReport = () => {
    const center = mapInstanceRef.current.getCenter();
    const newReport: SafetyReport = {
      id: Math.random().toString(36).substr(2, 9),
      lat: center.lat,
      lng: center.lng,
      type: newReportType,
      description,
      severity: newReportType === 'suspicious-activity' || newReportType === 'harassment' ? 'high' : 'medium',
      timestamp: Date.now()
    };
    addReport(newReport);
    setShowReportModal(false);
    setDescription('');
  };

  return (
    <div className="h-full w-full relative">
      <div id="map" ref={mapContainerRef} className="z-0" />
      
      <div className="absolute top-4 left-4 right-4 z-10 pointer-events-none">
        <div className="bg-white/90 backdrop-blur shadow-md p-3 rounded-2xl pointer-events-auto">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Safety Map: Suva</p>
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-red-500"></span> Danger
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span> Caution
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-green-500"></span> Safe
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={() => setShowReportModal(true)}
        className="absolute bottom-6 right-6 z-10 w-14 h-14 bg-indigo-600 rounded-full shadow-lg flex items-center justify-center text-white active:scale-95 transition-transform"
      >
        <Plus className="w-8 h-8" />
      </button>

      {showReportModal && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-20 flex items-center justify-center p-6">
          <div className="bg-white w-full rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Report Concern</h3>
              <button onClick={() => setShowReportModal(false)} className="p-1 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mb-4">The report will be pinned to your current map center.</p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Issue Category</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['suspicious-activity', 'poor-lighting', 'harassment', 'safe'] as const).map(type => (
                    <button
                      key={type}
                      onClick={() => setNewReportType(type)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        newReportType === type 
                          ? 'bg-indigo-600 text-white border-indigo-600' 
                          : 'bg-white text-gray-600 border-gray-100'
                      }`}
                    >
                      {type.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Description</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-600 outline-none h-24"
                  placeholder="What did you notice?"
                />
              </div>

              <button 
                onClick={handleSubmitReport}
                disabled={!description}
                className="w-full bg-indigo-600 text-white font-bold py-3 rounded-2xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" /> Submit Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;
