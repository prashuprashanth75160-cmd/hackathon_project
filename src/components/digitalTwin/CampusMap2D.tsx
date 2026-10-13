import React from 'react';
import { CampusLocation } from '../../types/campus';
import {
  Building2,
  BookOpen,
  Utensils,
  Home,
  FlaskConical,
  Car,
  Briefcase,
  Trophy,
  AlertCircle,
  Zap,
  Droplets,
  Users,
} from 'lucide-react';

interface CampusMap2DProps {
  locations: CampusLocation[];
  selectedLocation: CampusLocation | null;
  onSelectLocation: (loc: CampusLocation) => void;
}

const getLocationIcon = (id: string) => {
  switch (id) {
    case 'loc-academic': return Building2;
    case 'loc-library': return BookOpen;
    case 'loc-canteen': return Utensils;
    case 'loc-hostel': return Home;
    case 'loc-laboratory': return FlaskConical;
    case 'loc-parking': return Car;
    case 'loc-admin': return Briefcase;
    case 'loc-sports': return Trophy;
    default: return Building2;
  }
};

const getStatusBadge = (status: CampusLocation['status']) => {
  switch (status) {
    case 'optimal':
      return {
        bg: 'bg-eco-green/20 border-eco-green/50 text-eco-green',
        dot: 'bg-eco-green',
        glow: 'shadow-glow-green',
      };
    case 'warning':
      return {
        bg: 'bg-eco-amber/20 border-eco-amber/50 text-eco-amber',
        dot: 'bg-eco-amber',
        glow: 'shadow-glow-amber',
      };
    case 'critical':
      return {
        bg: 'bg-eco-red/20 border-eco-red/50 text-eco-red',
        dot: 'bg-eco-red',
        glow: 'shadow-[0_0_20px_rgba(239,68,68,0.4)]',
      };
  }
};

export const CampusMap2D: React.FC<CampusMap2DProps> = ({
  locations,
  selectedLocation,
  onSelectLocation,
}) => {
  return (
    <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-gradient-to-br from-[#060D1E] via-[#0B1736] to-[#081226] rounded-2xl border border-campus-border overflow-hidden cyber-grid shadow-2xl">
      
      {/* Decorative campus grid roads and layout styling */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <linearGradient id="gridGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {/* Main campus boulevard arteries */}
        <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="url(#gridGrad)" strokeWidth="6" strokeDasharray="8 6" />
        <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="url(#gridGrad)" strokeWidth="6" strokeDasharray="8 6" />
        {/* Connecting campus paths */}
        <line x1="20%" y1="25%" x2="80%" y2="75%" stroke="#38BDF8" strokeWidth="2" strokeOpacity="0.3" />
        <line x1="30%" y1="75%" x2="70%" y2="25%" stroke="#38BDF8" strokeWidth="2" strokeOpacity="0.3" />
        {/* Central Plaza Circle */}
        <circle cx="50%" cy="50%" r="90" fill="none" stroke="#10B981" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.4" />
        <circle cx="50%" cy="50%" r="50" fill="rgba(16, 185, 129, 0.03)" stroke="#06B6D4" strokeWidth="1" opacity="0.6" />
      </svg>

      {/* Top Map HUD overlay */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
        <div className="glass-panel px-3 py-1.5 rounded-lg border border-white/10 pointer-events-auto flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-eco-green animate-ping" />
          <span className="text-xs font-bold text-white tracking-wide">
            DSU Campus Digital Twin 2.0
          </span>
          <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
            [Interactive Node Telemetry]
          </span>
        </div>

        {/* Legend */}
        <div className="glass-panel px-3 py-1.5 rounded-lg border border-white/10 pointer-events-auto flex items-center space-x-3 text-[10px] font-semibold text-slate-300">
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-eco-green" />
            <span>Optimal (&gt;80)</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-eco-amber" />
            <span>Warning</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-eco-red animate-pulse" />
            <span>Critical Waste/Leak</span>
          </span>
        </div>
      </div>

      {/* Compass / Orientation */}
      <div className="absolute bottom-3 right-3 glass-panel px-2.5 py-1 rounded-md text-[10px] font-mono text-slate-400 border border-white/10 z-10 pointer-events-none">
        <span>▲ NORTH • Bengaluru Lat: 12.87° N</span>
      </div>

      {/* Central Campus Plaza Marker */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
        <div className="text-[9px] uppercase tracking-widest text-slate-400 font-mono bg-campus-card/70 px-2 py-0.5 rounded border border-white/5">
          Central Quadrangle
        </div>
      </div>

      {/* Interactive Location Nodes */}
      {locations.map(loc => {
        const Icon = getLocationIcon(loc.id);
        const style = getStatusBadge(loc.status);
        const isSelected = selectedLocation?.id === loc.id;

        return (
          <div
            key={loc.id}
            style={{
              left: `${loc.mapCoordinates.x}%`,
              top: `${loc.mapCoordinates.y}%`,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
          >
            {/* Clickable Node */}
            <button
              onClick={() => onSelectLocation(loc)}
              className={`relative flex items-center justify-center p-2.5 sm:p-3 rounded-2xl transition-all duration-300 transform group-hover:scale-110 focus:outline-none ${
                isSelected
                  ? 'bg-campus-surface border-2 border-eco-cyan ring-4 ring-eco-cyan/30 scale-110'
                  : 'bg-campus-card/90 border border-white/20 hover:border-white/50'
              } ${style.glow}`}
            >
              {/* Status pulse dot */}
              <span
                className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${style.dot} border-2 border-campus-darkest animate-pulse`}
              />

              <Icon className="w-5 h-5 text-white" />

              {/* Alerts badge */}
              {loc.activeAlerts.length > 0 && (
                <span className="absolute -bottom-1 -left-1 px-1 rounded-full text-[9px] font-bold bg-eco-red text-white flex items-center">
                  !
                </span>
              )}
            </button>

            {/* Label below node */}
            <div className="mt-1 text-center pointer-events-none">
              <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold tracking-tight bg-campus-darkest/90 text-slate-200 border border-white/10 group-hover:border-eco-green/50 whitespace-nowrap">
                {loc.name}
              </span>
            </div>

            {/* Hover Tooltip Card */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-2.5 rounded-xl glass-dropdown shadow-2xl border border-white/20 z-30">
              <div className="flex items-center justify-between pb-1 border-b border-white/10 text-xs font-bold text-white">
                <span className="truncate">{loc.name}</span>
                <span className={`px-1.5 py-0.5 rounded text-[9px] uppercase font-mono ${style.bg}`}>
                  {loc.status}
                </span>
              </div>

              <div className="mt-1.5 space-y-1 text-[11px] text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center space-x-1">
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span>Electricity</span>
                  </span>
                  <span className="font-mono font-bold text-white">{loc.electricityKwh} kWh</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center space-x-1">
                    <Droplets className="w-3 h-3 text-sky-400" />
                    <span>Water</span>
                  </span>
                  <span className="font-mono font-bold text-white">{loc.waterLitres} L</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center space-x-1">
                    <Users className="w-3 h-3 text-emerald-400" />
                    <span>Occupancy</span>
                  </span>
                  <span className="font-mono text-white">{loc.occupancy}/{loc.maxCapacity}</span>
                </div>
              </div>

              {loc.activeAlerts.length > 0 && (
                <div className="mt-1.5 pt-1 border-t border-white/10 text-[10px] text-eco-red font-medium flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{loc.activeAlerts[0]}</span>
                </div>
              )}

              <p className="mt-1 text-[9px] text-eco-cyan font-mono text-center">
                Click node to view digital twin analysis
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
