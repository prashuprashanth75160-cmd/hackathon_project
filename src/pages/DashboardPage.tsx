import React, { useState } from 'react';
import {
  Zap,
  Droplets,
  Trash2,
  Recycle,
  Footprints,
  Award,
  Sparkles,
  ArrowRight,
  Cpu,
  ScanLine,
  Activity,
} from 'lucide-react';
import { useCampus } from '../context/CampusContext';
import { MetricCard } from '../components/common/MetricCard';
import {
  WEEKLY_ELECTRICITY_DATA,
  WATER_USAGE_BREAKDOWN,
  WASTE_SEGREGATION_DATA,
} from '../data/mockCampusData';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { Link } from 'react-router-dom';
import { ReportIssueModal } from '../components/issues/ReportIssueModal';

export const DashboardPage: React.FC = () => {
  const {
    metrics,
    issues,
    isJudgeScenarioActive,
    toggleJudgeScenario,
    currentDateFilter,
  } = useCampus();

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const pendingIssues = issues.filter(i => i.status !== 'Resolved').slice(0, 3);

  return (
    <div className="space-y-6">
      
      {/* Welcome & Hackathon Quick Banner */}
      <div className="glass-panel-glow rounded-3xl p-6 relative overflow-hidden border border-eco-green/20">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-gradient-to-br from-eco-green/10 via-eco-cyan/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-eco-green/20 text-eco-green border border-eco-green/30 tracking-wider uppercase font-mono">
                Dayananda Sagar University • Pilot Sandbox
              </span>
              <span className="text-xs text-slate-400">
                {currentDateFilter} Overview
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 tracking-tight">
              EcoCampus AI <span className="text-eco-green">— Smart Sustainability Intelligence</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Real-time multi-agent telemetry orchestrating computer vision waste compliance, digital twin physical simulations, and carbon footprint reduction across DSU campus.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={toggleJudgeScenario}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                isJudgeScenarioActive
                  ? 'bg-eco-green text-campus-darkest shadow-glow-green animate-pulse'
                  : 'bg-campus-surface hover:bg-campus-card border border-eco-green/40 text-eco-green hover:shadow-glow-green'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{isJudgeScenarioActive ? 'Scenario Applied (-15% Energy)' : '1-Click Judge Scenario'}</span>
            </button>

            <button
              onClick={() => setIsReportModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-campus-card hover:bg-campus-surface border border-white/10 text-xs font-semibold text-slate-200 hover:text-white transition-colors"
            >
              Report Campus Anomaly
            </button>
          </div>
        </div>
      </div>

      {/* 6 Core KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard
          title="Electricity Demand"
          value={metrics.totalElectricityKwh.toLocaleString()}
          unit="kWh/d"
          change={isJudgeScenarioActive ? '-15%' : '-6.4%'}
          changeType="positive"
          subtitle="Solar: 345 kWh/d"
          icon={Zap}
          iconColor="text-amber-400"
          accentColor="border-amber-400/20"
        />

        <MetricCard
          title="Water Usage"
          value={metrics.totalWaterLitres.toLocaleString()}
          unit="L/d"
          change={isJudgeScenarioActive ? '-18%' : '-3.2%'}
          changeType="positive"
          subtitle="Rainwater: Active"
          icon={Droplets}
          iconColor="text-sky-400"
          accentColor="border-sky-400/20"
        />

        <MetricCard
          title="Waste Volume"
          value={metrics.totalWasteKg}
          unit="kg/d"
          change="-4.1%"
          changeType="positive"
          subtitle="Target: <700 kg"
          icon={Trash2}
          iconColor="text-emerald-400"
          accentColor="border-emerald-400/20"
        />

        <MetricCard
          title="Recycling Ratio"
          value={`${metrics.wasteRecycledPct}%`}
          change={isJudgeScenarioActive ? '+16%' : '+8.2%'}
          changeType="positive"
          subtitle="Target: 80%+"
          icon={Recycle}
          iconColor="text-eco-green"
          accentColor="border-eco-green/30"
          badge="High"
        />

        <MetricCard
          title="Carbon Footprint"
          value={metrics.totalCarbonKg}
          unit="kg CO2e"
          change={isJudgeScenarioActive ? '-18.5%' : '-5.1%'}
          changeType="positive"
          subtitle="Scope 1 & 2"
          icon={Footprints}
          iconColor="text-purple-400"
          accentColor="border-purple-400/20"
        />

        <MetricCard
          title="Campus Green Score"
          value={`${metrics.sustainabilityScore}/100`}
          change={isJudgeScenarioActive ? '+8 pts' : '+3 pts'}
          changeType="positive"
          subtitle="Status: Tier-1 Green"
          icon={Award}
          iconColor="text-yellow-400"
          accentColor="border-yellow-400/30"
        />
      </div>

      {/* Main Visualizations Row: Electricity Area Chart & Waste Segregation Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Weekly Electricity Trend (8 cols on lg) */}
        <div className="lg:col-span-8 glass-panel rounded-2xl p-5 sm:p-6 border border-white/10 flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center space-x-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Weekly Electricity Consumption & Solar Offset (kWh)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Simulated comparison between baseline grid load and AI smart scheduling
              </p>
            </div>

            <div className="flex items-center space-x-3 text-xs">
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
                <span className="text-slate-400">Baseline</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-eco-green" />
                <span className="text-eco-green font-semibold">AI Optimized</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="text-amber-400">Solar PV</span>
              </span>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={WEEKLY_ELECTRICITY_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="optGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="baseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#64748B" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#64748B" stopOpacity={0} />
                  </linearGradient>
                </defs>
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
                <Area type="monotone" dataKey="baselineKwh" stroke="#64748B" strokeWidth={2} fillOpacity={1} fill="url(#baseGrad)" name="Baseline Demand (kWh)" />
                <Area type="monotone" dataKey="optimizedKwh" stroke="#10B981" strokeWidth={2.5} fillOpacity={1} fill="url(#optGrad)" name="AI Optimized Demand (kWh)" />
                <Area type="monotone" dataKey="solarKwh" stroke="#F59E0B" strokeWidth={2} fillOpacity={0} name="Solar Generation (kWh)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
            <span>Peak Demand: <strong className="text-white">158 kW (Wednesday)</strong></span>
            <span className="text-eco-green font-mono">Net Daily Avoidance: ~230 kWh/day</span>
          </div>
        </div>

        {/* Waste Segregation Doughnut (4 cols on lg) */}
        <div className="lg:col-span-4 glass-panel rounded-2xl p-5 sm:p-6 border border-white/10 flex flex-col justify-between">
          <div className="pb-3 border-b border-white/10">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center space-x-2">
              <Recycle className="w-4 h-4 text-eco-green" />
              <span>Waste Segregation Streams</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Breakdown by material category (kg/day)
            </p>
          </div>

          <div className="h-52 w-full my-2 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={WASTE_SEGREGATION_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {WASTE_SEGREGATION_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#374151',
                    borderRadius: '8px',
                    fontSize: '11px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Stream Legend */}
          <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-300">
            {WASTE_SEGREGATION_DATA.slice(0, 4).map(item => (
              <div key={item.name} className="flex items-center space-x-1.5 truncate">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                <span className="truncate">{item.name}: <strong className="text-white">{item.value} kg</strong></span>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-2 border-t border-white/5">
            <Link
              to="/waste-analyzer"
              className="text-xs text-eco-cyan hover:underline font-semibold flex items-center justify-between"
            >
              <span>Test Optical Waste AI Scanner →</span>
              <ScanLine className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

      {/* Second Row: Water Consumption Bar Chart & Campus Issue Alerts & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Water Breakdown Chart (6 cols) */}
        <div className="lg:col-span-6 glass-panel rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
          <div className="pb-3 border-b border-white/10 flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center space-x-2">
                <Droplets className="w-4 h-4 text-sky-400" />
                <span>Water Consumption by Facility (Litres/Day)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Simulated sub-meter allocations across campus sectors
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-sky-400">
              {metrics.totalWaterLitres.toLocaleString()} L Total
            </span>
          </div>

          <div className="h-56 w-full mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WATER_USAGE_BREAKDOWN} layout="vertical" margin={{ top: 5, right: 20, left: 60, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" horizontal={false} />
                <XAxis type="number" stroke="#6B7280" fontSize={10} />
                <YAxis dataKey="category" type="category" stroke="#94A3B8" fontSize={10} width={90} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#374151',
                    borderRadius: '8px',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="litres" fill="#06B6D4" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
            <span>Primary Sink: <strong className="text-white">Hostels (32%) & Canteen (27%)</strong></span>
            <Link to="/water" className="text-eco-cyan hover:underline font-medium">
              View Leak Log →
            </Link>
          </div>
        </div>

        {/* Real-time Alerts & AI Insights (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Active Campus Alerts Card */}
          <div className="glass-panel rounded-2xl p-5 border border-white/10">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
                <span>Active Sustainability Alerts</span>
              </span>
              <Link to="/issues" className="text-xs text-eco-green hover:underline font-medium">
                View All ({issues.length}) →
              </Link>
            </div>

            <div className="mt-3 space-y-2.5">
              {pendingIssues.map(issue => (
                <div
                  key={issue.id}
                  className="p-3 rounded-xl bg-campus-darkest/60 border border-white/5 hover:border-eco-green/30 transition-colors flex items-start justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white">{issue.category}</span>
                      <span className="text-[10px] text-slate-400">• {issue.locationName}</span>
                    </div>
                    <p className="text-slate-300 text-[11px] line-clamp-1">{issue.description}</p>
                    <span className="text-[10px] text-eco-amber font-mono">
                      Impact: {issue.estimatedWasteImpact}
                    </span>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      issue.priority === 'High' || issue.priority === 'Critical'
                        ? 'bg-eco-red/20 text-eco-red'
                        : 'bg-eco-amber/20 text-eco-amber'
                    }`}
                  >
                    {issue.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI-Generated Real-time Insights Card */}
          <div className="glass-panel-glow rounded-2xl p-5 border border-eco-green/30 space-y-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-eco-green animate-spin" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Eco AI Sentinel Real-Time Directive
              </h4>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed">
              <strong>Optimization Opportunity:</strong> Central Library has achieved an 82% recycling rate with daylight harvesting. Replicating its automated lighting cutoff protocol in the Academic Block can save an estimated <strong>51 kWh/day</strong> and avert ₹1.5 Lakhs in annual cooling overhead.
            </p>

            <div className="pt-2 flex items-center justify-between text-xs">
              <Link
                to="/digital-twin"
                className="inline-flex items-center space-x-1 text-eco-green hover:underline font-bold"
              >
                <span>Launch Digital Twin Simulation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/assistant"
                className="text-eco-cyan hover:underline font-medium"
              >
                Consult Assistant →
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* Quick Launchpad Footer */}
      <div className="p-4 rounded-2xl glass-panel border border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2 text-slate-300">
          <Activity className="w-4 h-4 text-eco-green" />
          <span>Quick Launchpad:</span>
          <span className="text-slate-400 hidden sm:inline">Jump straight into demo modules</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            to="/digital-twin"
            className="px-3 py-1.5 rounded-lg bg-campus-card hover:bg-campus-surface border border-white/10 text-slate-200 hover:text-white transition-colors flex items-center space-x-1.5"
          >
            <Cpu className="w-3.5 h-3.5 text-eco-green" />
            <span>Interactive Map</span>
          </Link>
          <Link
            to="/waste-analyzer"
            className="px-3 py-1.5 rounded-lg bg-campus-card hover:bg-campus-surface border border-white/10 text-slate-200 hover:text-white transition-colors flex items-center space-x-1.5"
          >
            <ScanLine className="w-3.5 h-3.5 text-eco-cyan" />
            <span>Waste Classifier</span>
          </Link>
          <Link
            to="/carbon"
            className="px-3 py-1.5 rounded-lg bg-campus-card hover:bg-campus-surface border border-white/10 text-slate-200 hover:text-white transition-colors flex items-center space-x-1.5"
          >
            <Footprints className="w-3.5 h-3.5 text-purple-400" />
            <span>Carbon Calculator</span>
          </Link>
          <Link
            to="/leaderboard"
            className="px-3 py-1.5 rounded-lg bg-campus-card hover:bg-campus-surface border border-white/10 text-slate-200 hover:text-white transition-colors flex items-center space-x-1.5"
          >
            <Award className="w-3.5 h-3.5 text-yellow-400" />
            <span>Green Leaderboard</span>
          </Link>
        </div>
      </div>

      {/* Report Issue Modal */}
      <ReportIssueModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

    </div>
  );
};
