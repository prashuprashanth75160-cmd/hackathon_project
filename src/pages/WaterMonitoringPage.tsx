import React from 'react';
import { useCampus } from '../context/CampusContext';
import {
  Droplets,
  AlertTriangle,
  ArrowDownRight,
  Info,
  Building2,
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
import { WATER_USAGE_BREAKDOWN } from '../data/mockCampusData';

export const WaterMonitoringPage: React.FC = () => {
  const { locations, metrics, issues } = useCampus();

  const waterIssues = issues.filter(i => i.category === 'Water Leakage');

  // Sorted by water draw
  const sortedWaterBuildings = [...locations].sort((a, b) => b.waterLitres - a.waterLitres);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 border border-sky-400/20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Droplets className="w-5 h-5 text-sky-400" />
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                Campus Water Intelligence & Leakage Detection
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-400/20 text-sky-400 font-bold border border-sky-400/30">
                Acoustic & Flow Telemetry
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Simulated campus-wide water flow distribution across student hostels, academic restrooms, dining kitchens, and landscape sprinkler networks.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="px-3 py-2 rounded-xl bg-campus-darkest/70 border border-white/10 text-right">
              <span className="text-[10px] text-slate-400 block font-mono">Rainwater Harvest Tank</span>
              <span className="text-sm font-bold text-sky-400 font-mono">14,200 L Reserve (72%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel rounded-xl p-4 border border-white/10">
          <span className="text-xs text-slate-400 font-medium">Daily Water Withdrawal</span>
          <p className="text-2xl font-extrabold text-white font-mono mt-1">
            {metrics.totalWaterLitres.toLocaleString()} <span className="text-xs text-slate-400">Litres</span>
          </p>
          <span className="text-[10px] text-eco-green flex items-center mt-1">
            <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" /> -3.2% vs last week
          </span>
        </div>

        <div className="glass-panel rounded-xl p-4 border border-white/10">
          <span className="text-xs text-slate-400 font-medium">Estimated Leakage Rate</span>
          <p className="text-2xl font-extrabold text-eco-red font-mono mt-1">
            3.8 <span className="text-xs text-slate-400">L/hour</span>
          </p>
          <span className="text-[10px] text-slate-400 mt-1 block">Mainly kitchen wash basin tap</span>
        </div>

        <div className="glass-panel rounded-xl p-4 border border-white/10">
          <span className="text-xs text-slate-400 font-medium">Greywater Recycled</span>
          <p className="text-2xl font-extrabold text-eco-green font-mono mt-1">
            4,850 <span className="text-xs text-slate-400">L/day</span>
          </p>
          <span className="text-[10px] text-eco-green mt-1 block">Treated for sports grounds turf</span>
        </div>

        <div className="glass-panel rounded-xl p-4 border border-white/10">
          <span className="text-xs text-slate-400 font-medium">Active Leak Flags</span>
          <p className="text-2xl font-extrabold text-amber-400 font-mono mt-1">
            {waterIssues.filter(i => i.status !== 'Resolved').length} <span className="text-xs text-slate-400">alerts</span>
          </p>
          <span className="text-[10px] text-slate-400 mt-1 block">1 ticket currently being serviced</span>
        </div>
      </div>

      {/* Water Distribution Chart & Active Leak Anomalies */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Distribution Chart (7 cols) */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-5 border border-white/10">
          <div className="pb-3 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
              <Droplets className="w-4 h-4 text-sky-400" />
              <span>Facility Water Draw Allocation</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">
              Litres/Day
            </span>
          </div>

          <div className="h-64 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WATER_USAGE_BREAKDOWN} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                <XAxis dataKey="category" stroke="#6B7280" fontSize={10} />
                <YAxis stroke="#6B7280" fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#374151',
                    borderRadius: '8px',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="litres" fill="#06B6D4" radius={[4, 4, 0, 0]} name="Consumption (L/d)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Leak Reports (5 cols) */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4 text-eco-red" />
                <span>Water Leakage Anomaly Tracker</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-400">
                {waterIssues.length} logged
              </span>
            </div>

            <div className="space-y-3 mt-3">
              {waterIssues.map(issue => (
                <div
                  key={issue.id}
                  className="p-3 rounded-xl bg-campus-darkest/70 border border-white/5 space-y-1.5 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{issue.locationName}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                        issue.status === 'Resolved'
                          ? 'bg-eco-green/20 text-eco-green'
                          : 'bg-eco-amber/20 text-eco-amber'
                      }`}
                    >
                      {issue.status}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px]">{issue.description}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1">
                    <span>Loss: {issue.estimatedWasteImpact}</span>
                    <span>Reported: {issue.reportedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-sky-400/10 border border-sky-400/20 text-xs text-sky-200">
            <span className="font-bold block text-white mb-0.5">Water Sentinel Recommendation:</span>
            Aerators save up to 40% tap volume with zero loss in water pressure. Projected payback period is 2.5 weeks across student hostels and canteens.
          </div>
        </div>

      </div>

      {/* Building-wise Water Ranking */}
      <div className="glass-panel rounded-2xl p-5 border border-white/10">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center space-x-1.5">
          <Building2 className="w-4 h-4 text-sky-400" />
          <span>Building-by-Building Water Footprint</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-mono text-[11px]">
                <th className="pb-2">Location</th>
                <th className="pb-2">Type</th>
                <th className="pb-2">Water (L/day)</th>
                <th className="pb-2">Per Occupant Rate</th>
                <th className="pb-2">Status</th>
                <th className="pb-2 text-right">Conservation Protocol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {sortedWaterBuildings.map(loc => (
                <tr key={loc.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-2.5 font-bold text-white">
                    {loc.name}
                  </td>
                  <td className="py-2.5 text-slate-400">{loc.category}</td>
                  <td className="py-2.5 font-mono font-bold text-sky-300">
                    {loc.waterLitres.toLocaleString()} L
                  </td>
                  <td className="py-2.5 font-mono text-slate-300">
                    {(loc.waterLitres / (loc.occupancy || 1)).toFixed(1)} L/person
                  </td>
                  <td className="py-2.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                        loc.status === 'optimal'
                          ? 'bg-eco-green/20 text-eco-green'
                          : loc.status === 'warning'
                          ? 'bg-eco-amber/20 text-eco-amber'
                          : 'bg-eco-red/20 text-eco-red'
                      }`}
                    >
                      {loc.status}
                    </span>
                  </td>
                  <td className="py-2.5 text-right text-slate-300 truncate max-w-xs">
                    {loc.recommendation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transparent Disclaimer */}
      <div className="p-3 rounded-xl bg-campus-card/50 border border-white/5 flex items-start space-x-2 text-[11px] text-slate-400">
        <Info className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
        <p>
          <strong>Simulated Water Leakage Notice:</strong> Leakage detection algorithms are run against synthetic acoustic sensor profiles. This demo prototype does not claim physical sensor installation on DSU pipe networks.
        </p>
      </div>

    </div>
  );
};
