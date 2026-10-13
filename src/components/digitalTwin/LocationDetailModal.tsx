import React from 'react';
import { CampusLocation } from '../../types/campus';
import {
  X,
  Zap,
  Droplets,
  Users,
  Trash2,
  Footprints,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Activity,
  ArrowRight,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { Link } from 'react-router-dom';

interface LocationDetailModalProps {
  location: CampusLocation | null;
  onClose: () => void;
}

export const LocationDetailModal: React.FC<LocationDetailModalProps> = ({
  location,
  onClose,
}) => {
  if (!location) return null;

  // Simulated 24-hr load breakdown for this building
  const hourlyData = [
    { hour: '06:00', electricity: Math.round(location.electricityKwh * 0.02), water: Math.round(location.waterLitres * 0.03) },
    { hour: '09:00', electricity: Math.round(location.electricityKwh * 0.12), water: Math.round(location.waterLitres * 0.14) },
    { hour: '12:00', electricity: Math.round(location.electricityKwh * 0.18), water: Math.round(location.waterLitres * 0.22) },
    { hour: '15:00', electricity: Math.round(location.electricityKwh * 0.16), water: Math.round(location.waterLitres * 0.18) },
    { hour: '18:00', electricity: Math.round(location.electricityKwh * 0.11), water: Math.round(location.waterLitres * 0.12) },
    { hour: '21:00', electricity: Math.round(location.electricityKwh * 0.05), water: Math.round(location.waterLitres * 0.06) },
  ];

  const occupancyPct = Math.round((location.occupancy / location.maxCapacity) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel-glow w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 border border-white/20 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-campus-card text-eco-cyan border border-white/10">
                {location.code}
              </span>
              <span className="text-xs text-slate-400">• {location.category} Category</span>
              <span
                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                  location.status === 'optimal'
                    ? 'bg-eco-green/20 text-eco-green border border-eco-green/30'
                    : location.status === 'warning'
                    ? 'bg-eco-amber/20 text-eco-amber border border-eco-amber/30'
                    : 'bg-eco-red/20 text-eco-red border border-eco-red/30'
                }`}
              >
                {location.status} Status
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              {location.name}
            </h2>
            <p className="text-xs text-slate-400">
              Dayananda Sagar University Demonstration Model (Simulated Live Sensor Feed)
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-campus-card hover:bg-campus-surface text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Core Telemetry KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
          <div className="p-3 rounded-xl bg-campus-darkest/60 border border-white/5">
            <div className="flex items-center space-x-1 text-slate-400 text-xs">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Electricity</span>
            </div>
            <p className="text-lg font-bold font-mono text-white mt-1">
              {location.electricityKwh} <span className="text-xs text-slate-400">kWh/d</span>
            </p>
            <span className="text-[10px] text-slate-500 font-mono">Simulated</span>
          </div>

          <div className="p-3 rounded-xl bg-campus-darkest/60 border border-white/5">
            <div className="flex items-center space-x-1 text-slate-400 text-xs">
              <Droplets className="w-3.5 h-3.5 text-sky-400" />
              <span>Water Draw</span>
            </div>
            <p className="text-lg font-bold font-mono text-white mt-1">
              {location.waterLitres} <span className="text-xs text-slate-400">L/d</span>
            </p>
            <span className="text-[10px] text-slate-500 font-mono">Simulated</span>
          </div>

          <div className="p-3 rounded-xl bg-campus-darkest/60 border border-white/5">
            <div className="flex items-center space-x-1 text-slate-400 text-xs">
              <Trash2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Waste Generated</span>
            </div>
            <p className="text-lg font-bold font-mono text-white mt-1">
              {location.wasteKg} <span className="text-xs text-slate-400">kg/d</span>
            </p>
            <span className="text-[10px] text-eco-green font-mono">{location.wasteRecycledPct}% recycled</span>
          </div>

          <div className="p-3 rounded-xl bg-campus-darkest/60 border border-white/5">
            <div className="flex items-center space-x-1 text-slate-400 text-xs">
              <Footprints className="w-3.5 h-3.5 text-purple-400" />
              <span>Carbon Footprint</span>
            </div>
            <p className="text-lg font-bold font-mono text-white mt-1">
              {location.carbonKg} <span className="text-xs text-slate-400">kg CO2e</span>
            </p>
            <span className="text-[10px] text-slate-500 font-mono">Estimated</span>
          </div>
        </div>

        {/* Occupancy gauge */}
        <div className="p-3 rounded-xl bg-campus-darkest/60 border border-white/5 mb-5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium flex items-center space-x-1.5">
              <Users className="w-4 h-4 text-eco-cyan" />
              <span>Simulated Campus Occupancy Rate</span>
            </span>
            <span className="font-mono text-white font-bold">
              {location.occupancy} / {location.maxCapacity} occupants ({occupancyPct}%)
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 mt-2 overflow-hidden">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                occupancyPct > 80 ? 'bg-eco-amber' : 'bg-eco-cyan'
              }`}
              style={{ width: `${occupancyPct}%` }}
            />
          </div>
        </div>

        {/* Simulated Diurnal Profile Chart */}
        <div className="p-3 rounded-xl bg-campus-darkest/60 border border-white/5 mb-5">
          <p className="text-xs font-semibold text-slate-300 mb-2 flex items-center space-x-1.5">
            <Activity className="w-3.5 h-3.5 text-eco-green" />
            <span>Simulated Diurnal Resource Demand Curve</span>
          </p>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                <XAxis dataKey="hour" stroke="#6B7280" fontSize={10} />
                <YAxis stroke="#6B7280" fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#374151',
                    borderRadius: '8px',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="electricity" name="Electricity (kWh)" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="water" name="Water (L/10)" fill="#06B6D4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Alerts & AI Improvement Recommendation */}
        <div className="space-y-3">
          {location.activeAlerts.length > 0 && (
            <div className="p-3 rounded-xl bg-eco-red/10 border border-eco-red/20 text-xs">
              <span className="font-bold text-eco-red flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Active Anomalies Detected by Sentinel</span>
              </span>
              <ul className="mt-1 space-y-1 pl-5 list-disc text-slate-300">
                {location.activeAlerts.map((alert, idx) => (
                  <li key={idx}>{alert}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="p-3 rounded-xl bg-eco-green/10 border border-eco-green/20 text-xs">
            <span className="font-bold text-eco-green flex items-center space-x-1.5">
              <Lightbulb className="w-4 h-4 text-eco-green" />
              <span>Recommended Optimization Action</span>
            </span>
            <p className="mt-1 text-slate-200">
              {location.recommendation}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-mono">
            Sensor Health: <span className="text-eco-green">{location.sensorHealth}</span>
          </span>

          <div className="flex items-center space-x-2">
            <Link
              to="/issues"
              onClick={onClose}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-campus-card hover:bg-campus-surface border border-white/10 text-xs font-medium text-slate-200 hover:text-white transition-colors"
            >
              <span>Report Building Issue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-eco-green hover:bg-eco-greenDark text-campus-darkest text-xs font-bold transition-colors"
            >
              Close Details
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
