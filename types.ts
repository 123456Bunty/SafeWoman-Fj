
export interface SafetyReport {
  id: string;
  lat: number;
  lng: number;
  type: 'poor-lighting' | 'suspicious-activity' | 'harassment' | 'overcrowded' | 'safe';
  description: string;
  timestamp: number;
  severity: 'low' | 'medium' | 'high';
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relation: string;
}

export enum ViewMode {
  DASHBOARD = 'dashboard',
  MAP = 'map',
  REPORTS = 'reports',
  ASSISTANT = 'assistant',
  SETTINGS = 'settings'
}
