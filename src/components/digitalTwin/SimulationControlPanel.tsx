import React from 'react';
import { useCampus } from '../../context/CampusContext';
import {
  Sliders,
  Zap,
  Droplets,
  Users,
  Sparkles,
  TrendingDown,
  RotateCcw,
  IndianRupee,
  Leaf,
  Info,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

export const SimulationControlPanel: React.FC = () => {
  const { simulationParams, setSimulationParams, simulationResult } = useCampus();

  const comparisonData = [
    {
      category: 'Electricity (kWh/day)',
      Current: simulationResult.baselineElectricity,
      Proposed: simulationResult.simulatedElectricity,
    },
    {
      category: 'Water (100 L/day)',
      Current: Math.round(simulationResult.baselineWater / 100),
      Proposed: Math.round(simulationResult.simulatedWater / 100),
    },
    {
      category: 'Carbon (kg CO2e/day)',
      Current: simulationResult.baselineCarbon,
      Proposed: simulationResult.simulatedCarbon,
    },
  ];

  const handleReset = () => {
    setSimulationParams({
      electricityOptimizationPct: 0,
      lightingEfficiencyPct: 0,
      occupancyAdjustmentPct: 0,
      waterConservationPct: 0,
      wasteSegregationPct: 0,
    });
  };

  const handleQuickOptimize = () => {
    setSimulationParams({
      electricityOptimizationPct: 15,
      lightingEfficiencyPct: 25,
      occupancyAdjustmentPct: 0,
      waterConservationPct: 20,
      wasteSegregationPct: 35,
    });
  };

  return (
    <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-eco-green/20">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <Sliders className="w-5 h-5 text-eco-green" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              DSU Digital Twin What-If Simulation Engine
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Model physical changes across Dayananda Sagar University to estimate energy, water, and carbon return on investment (ROI).
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleQuickOptimize}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-eco-green/20 hover:bg-eco-green/30 text-eco-green border border-eco-green/40 text-xs font-semibold transition-all hover:shadow-glow-green"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Preset: Target 2030 Campus Goals</span>
          </button>
          <button
            onClick={handleReset}
            className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-campus-card hover:bg-campus-surface text-slate-400 hover:text-white text-xs transition-colors"
            title="Reset simulation parameters to 0"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-5">
        {/* Sliders Area (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Slider 1: Electricity Scheduling */}
          <div className="p-3.5 rounded-xl bg-campus-darkest/60 border border-white/5 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200 flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Smart HVAC & Idle Power Cut</span>
              </span>
              <span className="font-mono font-bold text-eco-cyan text-sm">
                +{simulationParams.electricityOptimizationPct}% cut
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              step="5"
              value={simulationParams.electricityOptimizationPct}
              onChange={e =>
                setSimulationParams(prev => ({
                  ...prev,
                  electricityOptimizationPct: Number(e.target.value),
                }))
              }
              className="w-full accent-eco-green h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0% (As-is)</span>
              <span>20% (Automated Scheduling)</span>
              <span>40% (Aggressive Smart Grid)</span>
            </div>
          </div>

          {/* Slider 2: Lighting Efficiency */}
          <div className="p-3.5 rounded-xl bg-campus-darkest/60 border border-white/5 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>LED Daylight Harvesting & Sensor Retrofit</span>
              </span>
              <span className="font-mono font-bold text-eco-green text-sm">
                +{simulationParams.lightingEfficiencyPct}% efficiency
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={simulationParams.lightingEfficiencyPct}
              onChange={e =>
                setSimulationParams(prev => ({
                  ...prev,
                  lightingEfficiencyPct: Number(e.target.value),
                }))
              }
              className="w-full accent-eco-green h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0% Existing Fixtures</span>
              <span>25% Classroom PIR Sensors</span>
              <span>50% Full Campus Smart LED</span>
            </div>
          </div>

          {/* Slider 3: Water Conservation */}
          <div className="p-3.5 rounded-xl bg-campus-darkest/60 border border-white/5 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200 flex items-center space-x-1.5">
                <Droplets className="w-3.5 h-3.5 text-sky-400" />
                <span>Aerator Faucets & Smart Leak Cutoff</span>
              </span>
              <span className="font-mono font-bold text-sky-400 text-sm">
                +{simulationParams.waterConservationPct}% saved
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              step="5"
              value={simulationParams.waterConservationPct}
              onChange={e =>
                setSimulationParams(prev => ({
                  ...prev,
                  waterConservationPct: Number(e.target.value),
                }))
              }
              className="w-full accent-sky-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0% Baseline</span>
              <span>20% Low-flow Faucets</span>
              <span>40% Automated Solenoid Shutoffs</span>
            </div>
          </div>

          {/* Slider 4: Occupancy Scheduling */}
          <div className="p-3.5 rounded-xl bg-campus-darkest/60 border border-white/5 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200 flex items-center space-x-1.5">
                <Users className="w-3.5 h-3.5 text-purple-400" />
                <span>Timetable Consolidation & Peak Load Shifting</span>
              </span>
              <span className="font-mono font-bold text-purple-300 text-sm">
                {simulationParams.occupancyAdjustmentPct > 0 ? `+${simulationParams.occupancyAdjustmentPct}%` : `${simulationParams.occupancyAdjustmentPct}%`}
              </span>
            </div>
            <input
              type="range"
              min="-30"
              max="30"
              step="5"
              value={simulationParams.occupancyAdjustmentPct}
              onChange={e =>
                setSimulationParams(prev => ({
                  ...prev,
                  occupancyAdjustmentPct: Number(e.target.value),
                }))
              }
              className="w-full accent-purple-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>-30% Hybrid Classes</span>
              <span>0% Current Roster</span>
              <span>+30% Full Campus Events</span>
            </div>
          </div>

        </div>

        {/* Live Simulation Impact Summary (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          
          <div className="p-4 rounded-xl bg-campus-darkest/80 border border-eco-green/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                Estimated Simulation Impact
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-eco-green/20 text-eco-green font-bold">
                Live Model
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-2.5 rounded-lg bg-campus-card border border-white/5">
                <span className="text-[11px] text-slate-400 block">Electricity Saved</span>
                <span className="text-base sm:text-lg font-bold font-mono text-eco-green">
                  {simulationResult.electricitySaved} <span className="text-xs">kWh/day</span>
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-campus-card border border-white/5">
                <span className="text-[11px] text-slate-400 block">Water Conserved</span>
                <span className="text-base sm:text-lg font-bold font-mono text-sky-400">
                  {simulationResult.waterSaved.toLocaleString()} <span className="text-xs">L/day</span>
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-campus-card border border-white/5">
                <span className="text-[11px] text-slate-400 block">Carbon Avoided</span>
                <span className="text-base sm:text-lg font-bold font-mono text-purple-400">
                  {simulationResult.carbonReduced} <span className="text-xs">kg CO2e</span>
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-campus-card border border-white/5">
                <span className="text-[11px] text-slate-400 block">Est. Utility Savings</span>
                <span className="text-base sm:text-lg font-bold font-mono text-amber-400 flex items-center">
                  <IndianRupee className="w-3.5 h-3.5 mr-0.5" />
                  {simulationResult.estimatedCostSavingsInr.toLocaleString()}/d
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">New Campus Sustainability Score:</span>
              <span className="text-sm font-extrabold text-eco-green font-mono">
                {simulationResult.newSustainabilityScore} / 100
              </span>
            </div>
          </div>

          {/* Comparison Bar Chart */}
          <div className="p-3.5 rounded-xl bg-campus-darkest/60 border border-white/5">
            <p className="text-[11px] font-semibold text-slate-300 mb-2">
              Scenario Comparison: Current Baseline vs Proposed Simulation
            </p>
            <div className="h-36 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="category" stroke="#6B7280" fontSize={9} />
                  <YAxis stroke="#6B7280" fontSize={9} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      borderColor: '#374151',
                      borderRadius: '8px',
                      fontSize: '11px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '10px' }} />
                  <Bar dataKey="Current" fill="#64748B" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="Proposed" fill="#10B981" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>

      {/* Assumptions Footer */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-start space-x-2 text-[11px] text-slate-400">
        <Info className="w-4 h-4 text-eco-cyan flex-shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-300">Simulation Assumptions (Simulated Demo Model):</strong> Grid emission factor calibrated at 0.82 kg CO2e/kWh (Central Electricity Authority average). Commercial power tariff estimated at ₹8.20/kWh; municipal water tariff estimated at ₹0.065/L. All outputs are intended for hackathon demonstration.
        </p>
      </div>

    </div>
  );
};
