import React from 'react';
import { useCampus } from '../context/CampusContext';
import {
  Zap,
  Building2,
  ArrowDownRight,
  Info,
  Cpu,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { WEEKLY_ELECTRICITY_DATA } from '../data/mockCampusData';

export const EnergyMonitoringPage: React.FC = () => {
  const { locations, metrics } = useCampus();

  // Building electricity ranking sorted
  const sortedBuildings = [...locations].sort((a, b) => b.electricityKwh - a.electricityKwh);

  const subLoadBreakdown = [
    { name: 'HVAC & Central Air Cooling', percentage: 42, kwh: Math.round(metrics.totalElectricityKwh * 0.42), color: '#38BDF8' },
    { name: 'Lighting & Daylight Circuits', percentage: 24, kwh: Math.round(metrics.totalElectricityKwh * 0.24), color: '#F59E0B' },
    { name: 'Lab Machinery & Servers', percentage: 21, kwh: Math.round(metrics.totalElectricityKwh * 0.21), color: '#A855F7' },
    { name: 'Hostel Geysers & Appliances', percentage: 13, kwh: Math.round(metrics.totalElectricityKwh * 0.13), color: '#10B981' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 border border-amber-400/20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                Campus Energy & Smart Grid Monitoring
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-400 font-bold border border-amber-400/30">
                Sub-Meter Telemetry
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Real-time load balancing and smart feeder metrics across Dayananda Sagar University (DSU). Identifies phantom loads, peak power tariffs, and rooftop solar offset.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="px-3 py-2 rounded-xl bg-campus-darkest/70 border border-white/10 text-right">
              <span className="text-[10px] text-slate-400 block font-mono">Solar Rooftop Generation</span>
              <span className="text-sm font-bold text-amber-400 font-mono">345 kWh today (26% offset)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Energy Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel rounded-xl p-4 border border-white/10">
          <span className="text-xs text-slate-400 font-medium">Daily Grid Demand</span>
          <p className="text-2xl font-extrabold text-white font-mono mt-1">
            {metrics.totalElectricityKwh.toLocaleString()} <span className="text-xs text-slate-400">kWh</span>
          </p>
          <span className="text-[10px] text-eco-green flex items-center mt-1">
            <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" /> -6.4% below weekday baseline
          </span>
        </div>

        <div className="glass-panel rounded-xl p-4 border border-white/10">
          <span className="text-xs text-slate-400 font-medium">Peak Demand Recorded</span>
          <p className="text-2xl font-extrabold text-amber-400 font-mono mt-1">
            158 <span className="text-xs text-slate-400">kW</span>
          </p>
          <span className="text-[10px] text-slate-400 mt-1 block">Occurred 02:15 PM (Air-con peak)</span>
        </div>

        <div className="glass-panel rounded-xl p-4 border border-white/10">
          <span className="text-xs text-slate-400 font-medium">Rooftop Solar PV</span>
          <p className="text-2xl font-extrabold text-eco-green font-mono mt-1">
            345 <span className="text-xs text-slate-400">kWh</span>
          </p>
          <span className="text-[10px] text-eco-green mt-1 block">Supplying North Parking & Labs</span>
        </div>

        <div className="glass-panel rounded-xl p-4 border border-white/10">
          <span className="text-xs text-slate-400 font-medium">Avoided Tariff Cost</span>
          <p className="text-2xl font-extrabold text-sky-400 font-mono mt-1">
            ₹2,829 <span className="text-xs text-slate-400">/day</span>
          </p>
          <span className="text-[10px] text-slate-400 mt-1 block">Calculated at ₹8.20 / unit</span>
        </div>
      </div>

      {/* Main Grid: Weekly Energy Load Curve & Sub-load Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Weekly Profile (8 cols) */}
        <div className="lg:col-span-8 glass-panel rounded-2xl p-5 border border-white/10">
          <div className="pb-3 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>7-Day Electricity Profile & Demand Peak</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">
              Unit: Kilowatt-Hours (kWh)
            </span>
          </div>

          <div className="h-64 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={WEEKLY_ELECTRICITY_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                <XAxis dataKey="day" stroke="#6B7280" fontSize={11} />
                <YAxis stroke="#6B7280" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#374151',
                    borderRadius: '8px',
                    fontSize: '11px',
                  }}
                />
                <Area type="monotone" dataKey="baselineKwh" stroke="#64748B" fill="#64748B" fillOpacity={0.15} name="Historical Baseline" />
                <Area type="monotone" dataKey="optimizedKwh" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.3} name="Current Feeder Draw" />
                <Area type="monotone" dataKey="solarKwh" stroke="#10B981" fill="#10B981" fillOpacity={0.2} name="Solar Array Output" />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sub-system Breakdown (4 cols) */}
        <div className="lg:col-span-4 glass-panel rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
          <div className="pb-3 border-b border-white/10">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
              <Cpu className="w-4 h-4 text-eco-cyan" />
              <span>Campus Sub-System Consumption</span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Breakdown by campus utility domain
            </p>
          </div>

          <div className="space-y-3.5 my-3">
            {subLoadBreakdown.map(load => (
              <div key={load.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium truncate max-w-[190px]">
                    {load.name}
                  </span>
                  <span className="font-mono text-white font-bold">
                    {load.kwh} kWh ({load.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-1.5 rounded-full"
                    style={{ width: `${load.percentage}%`, backgroundColor: load.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400">
            Smart scheduling can automatically throttle HVAC capacity when outdoor temperature drops below 24°C.
          </div>
        </div>

      </div>

      {/* Building-wise Ranking Table */}
      <div className="glass-panel rounded-2xl p-5 border border-white/10">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center space-x-1.5">
          <Building2 className="w-4 h-4 text-amber-400" />
          <span>Facility Energy Ranking & Conservation Potential</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-mono text-[11px]">
                <th className="pb-2">DSU Building</th>
                <th className="pb-2">Category</th>
                <th className="pb-2">Daily Draw (kWh)</th>
                <th className="pb-2">Carbon Impact (kg CO2e)</th>
                <th className="pb-2">Energy Health</th>
                <th className="pb-2 text-right">Recommended Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {sortedBuildings.map(loc => (
                <tr key={loc.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-2.5 font-bold text-white flex items-center space-x-2">
                    <span className="text-eco-cyan font-mono text-[10px]">{loc.code}</span>
                    <span>{loc.name}</span>
                  </td>
                  <td className="py-2.5 text-slate-400">{loc.category}</td>
                  <td className="py-2.5 font-mono font-bold text-amber-300">
                    {loc.electricityKwh} kWh
                  </td>
                  <td className="py-2.5 font-mono text-slate-300">
                    {loc.carbonKg} kg
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
        <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <p>
          <strong>Simulated Energy Feed:</strong> Data models baseline electrical loads derived from average square footage and educational facility schedules in Bengaluru. Does not claim real-time BESCOM smart meter approval.
        </p>
      </div>

    </div>
  );
};
