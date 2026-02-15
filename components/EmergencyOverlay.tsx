
import React, { useState, useEffect } from 'react';
import { EmergencyContact } from '../types';
import { Phone, X, ShieldAlert, Wifi, MapPin } from 'lucide-react';

interface EmergencyOverlayProps {
  onClose: () => void;
  contacts: EmergencyContact[];
}

const EmergencyOverlay: React.FC<EmergencyOverlayProps> = ({ onClose, contacts }) => {
  const [countdown, setCountdown] = useState(5);
  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsTriggered(true);
    }
  }, [countdown]);

  return (
    <div className="fixed inset-0 z-[100] bg-red-600 flex flex-col items-center justify-center p-8 text-white">
      {!isTriggered ? (
        <div className="text-center space-y-8 animate-in zoom-in duration-300">
          <div className="w-32 h-32 rounded-full border-8 border-white/30 flex items-center justify-center">
            <span className="text-6xl font-black">{countdown}</span>
          </div>
          <div className="space-y-2">
            <h2 className="text-4xl font-black uppercase tracking-tighter">SOS Alert</h2>
            <p className="text-red-100 font-medium opacity-80">Contacting emergency services and sharing your live coordinates in {countdown}s</p>
          </div>
          <button 
            onClick={onClose}
            className="px-12 py-4 bg-white text-red-600 font-black rounded-full shadow-2xl active:scale-95 transition-transform"
          >
            CANCEL (STILL SAFE)
          </button>
        </div>
      ) : (
        <div className="w-full max-w-sm space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl animate-pulse">
              <ShieldAlert className="w-12 h-12 text-red-600" />
            </div>
          </div>
          
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black">ALERT ACTIVE</h2>
            <p className="text-red-100 flex items-center justify-center gap-2 font-medium">
              <Wifi className="w-4 h-4" /> Broadcasting Live Location...
            </p>
            <p className="text-[10px] bg-red-800/50 py-1 rounded-full inline-block px-3">
              Lat: -18.14 | Lng: 178.44
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold text-red-100 uppercase text-center opacity-70">Notifying Contacts</p>
            {contacts.map(contact => (
              <div key={contact.id} className="bg-white/10 backdrop-blur-md p-4 rounded-3xl flex justify-between items-center border border-white/10">
                <div>
                  <p className="font-bold">{contact.name}</p>
                  <p className="text-xs opacity-70">{contact.phone}</p>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                   <span className="text-[10px] font-bold text-green-400">SENT</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => window.open(`tel:${contacts[0].phone}`)}
              className="flex-1 bg-white text-red-600 py-4 rounded-3xl font-black shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Phone className="w-5 h-5" /> CALL POLICE
            </button>
            <button 
              onClick={onClose}
              className="p-4 bg-red-800/50 rounded-3xl text-white active:scale-95 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-4 bg-red-700/50 rounded-2xl flex items-center gap-3">
             <MapPin className="w-5 h-5 text-red-300" />
             <p className="text-xs font-medium">Your device camera and audio are being recorded and uploaded to Safe Cloud.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyOverlay;
