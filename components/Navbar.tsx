
import React from 'react';
import { ViewMode } from '../types';
import { LayoutDashboard, Map, Bell, MessageSquare } from 'lucide-react';

interface NavbarProps {
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView }) => {
  const tabs = [
    { id: ViewMode.DASHBOARD, icon: LayoutDashboard, label: 'Home' },
    { id: ViewMode.MAP, icon: Map, label: 'Map' },
    { id: ViewMode.REPORTS, icon: Bell, label: 'Alerts' },
    { id: ViewMode.ASSISTANT, icon: MessageSquare, label: 'AI' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/40 backdrop-blur-2xl border-t border-white/50 px-6 py-4 z-50 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(251,207,232,0.3)]">
      <div className="flex justify-between items-center">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = currentView === tab.id;
          return (
            <button 
              key={tab.id}
              onClick={() => setCurrentView(tab.id)}
              className="flex flex-col items-center gap-1 group relative"
            >
              <div className={`p-2.5 rounded-2xl transition-all duration-300 active:scale-90 ${
                isActive ? 'bg-rose-600 text-white shadow-lg shadow-rose-200 -translate-y-1' : 'text-rose-300 group-hover:text-rose-500'
              }`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className={`text-[8px] font-black uppercase tracking-widest transition-opacity duration-300 ${
                isActive ? 'text-rose-600 opacity-100' : 'text-rose-300 opacity-0'
              }`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-1 w-1 h-1 bg-rose-600 rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
