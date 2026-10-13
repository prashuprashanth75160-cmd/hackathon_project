import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import {
  Footprints,
  Zap,
  Bus,
  Trash2,
  Info,
  CheckCircle2,
  Sliders,
  RotateCcw,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';

export const CarbonCalculatorPage: React.FC = () => {
  const { metrics } = useCampus();

  // Configurable emission factors (with standard Indian grid & GHG protocol defaults)
  const [gridFactor, setGridFactor] = useState(0.82); // kg CO2e per kWh (CEA average)
  const [transportFactor, setTransportFactor] = useState(0.14); // kg CO2e per passenger-km
  const [wasteFactor, setWasteFactor] = useState(1.15); // kg CO2e per kg unsegregated landfill waste

  // Activity data
  const [dailyCommuterKm, setDailyCommuterKm] = useState(1850); // total estimated student/faculty transit km
  const [solarOffsetKwh] = useState(345);

  // Calculations
  const electricityEmissions = Math.round(metrics.totalElectricityKwh * gridFactor);
  const transportEmissions = Math.round(dailyCommuterKm * transportFactor);
  const unsegregatedWasteKg = Math.round(metrics.totalWasteKg * (1 - metrics.wasteRecycledPct / 100));
  const wasteEmissions = Math.round(unsegregatedWasteKg * wasteFactor);
  const solarAvoidedEmissions = Math.round(solarOffsetKwh * gridFactor);

  const totalCalculatedCarbon = electricityEmissions + transportEmissions + wasteEmissions;

  // Proposed optimized scenario (simulated reductions)
  const proposedElecEmissions = Math.round(electricityEmissions * 0.82);
  const proposedTransEmissions = Math.round(transportEmissions * 0.75);
  const proposedWasteEmissions = Math.round(wasteEmissions * 0.50);
  const proposedTotalCarbon = proposedElecEmissions + proposedTransEmissions + proposedWasteEmissions;
  const totalAvoidableCarbon = totalCalculatedCarbon - proposedTotalCarbon;

  const comparisonData = [
    { category: 'Grid Electricity', Baseline: electricityEmissions, Proposed: proposedElecEmissions },
    { category: 'Commuter Transit', Baseline: transportEmissions, Proposed: proposedTransEmissions },
    { category: 'Solid Waste', Baseline: wasteEmissions, Proposed: proposedWasteEmissions },
  ];

  const handleResetFactors = () => {
    setGridFactor(0.82);
    setTransportFactor(0.14);
    setWasteFactor(1.15);
    setDailyCommuterKm(1850);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 border border-purple-400/20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Footprints className="w-5 h-5 text-purple-400" />
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                DSU Campus Carbon Footprint & GHG Protocol Calculator
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-400/20 text-purple-400 font-bold border border-purple-400/30">
                Transparent Estimation Model
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Calculates daily equivalent greenhouse gas emissions (kg CO2e) with transparent, user-configurable conversion factors for Dayananda Sagar University.
            </p>
          </div>

          <button
            onClick={handleResetFactors}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-campus-darkest hover:bg-campus-surface border border-white/10 text-xs text-slate-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Factors to CEA Benchmarks</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel rounded-xl p-4 border border-white/10">
          <span className="text-xs text-slate-400 font-medium">Total Daily Carbon Footprint</span>
          <p className="text-2xl font-extrabold text-white font-mono mt-1">
            {totalCalculatedCarbon.toLocaleString()} <span className="text-xs text-slate-400">kg CO2e/d</span>
          </p>
          <span className="text-[10px] text-slate-500 font-mono mt-1 block">Scope 2 & 3 Combined</span>
        </div>

        <div className="glass-panel rounded-xl p-4 border border-white/10">
          <span className="text-xs text-slate-400 font-medium">Solar Array Avoidance</span>
          <p className="text-2xl font-extrabold text-eco-green font-mono mt-1">
            -{solarAvoidedEmissions} <span className="text-xs text-slate-400">kg CO2e/d</span>
          </p>
          <span className="text-[10px] text-eco-green font-mono mt-1 block">Rooftop Clean Energy Offset</span>
        </div>

        <div className="glass-panel rounded-xl p-4 border border-white/10">
          <span className="text-xs text-slate-400 font-medium">Achievable Reduction Target</span>
          <p className="text-2xl font-extrabold text-eco-cyan font-mono mt-1">
            {totalAvoidableCarbon} <span className="text-xs text-slate-400">kg/d (-24%)</span>
          </p>
          <span className="text-[10px] text-eco-cyan font-mono mt-1 block">Via 2028 Campus Roadmap</span>
        </div>

        <div className="glass-panel rounded-xl p-4 border border-white/10">
          <span className="text-xs text-slate-400 font-medium">Annual Equivalent Metric</span>
          <p className="text-2xl font-extrabold text-purple-400 font-mono mt-1">
            {Math.round((totalCalculatedCarbon * 365) / 1000)} <span className="text-xs text-slate-400">tonnes/yr</span>
          </p>
          <span className="text-[10px] text-slate-400 mt-1 block">Estimated Annualized Pace</span>
        </div>
      </div>

      {/* Configurable Emission Factors & Scenario Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sliders for Emission Factors (6 cols) */}
        <div className="lg:col-span-6 glass-panel rounded-2xl p-5 border border-white/10 space-y-4">
          <div className="pb-3 border-b border-white/10">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
              <Sliders className="w-4 h-4 text-purple-400" />
              <span>Configurable Emission Factors & Activity Assumptions</span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Adjust variables to reflect updated CEA grid carbon intensities and campus transportation
            </p>
          </div>

          {/* Factor 1: Grid Electricity */}
          <div className="p-3.5 rounded-xl bg-campus-darkest/60 border border-white/5 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200 flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Southern Regional Grid Emission Factor</span>
              </span>
              <span className="font-mono font-bold text-amber-300">
                {gridFactor} kg CO2e / kWh
              </span>
            </div>
            <input
              type="range"
              min="0.50"
              max="1.10"
              step="0.02"
              value={gridFactor}
              onChange={e => setGridFactor(Number(e.target.value))}
              className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0.50 (Renewables Heavy)</span>
              <span>0.82 (CEA India Average)</span>
              <span>1.10 (Thermal Heavy)</span>
            </div>
          </div>

          {/* Factor 2: Commuting Distance */}
          <div className="p-3.5 rounded-xl bg-campus-darkest/60 border border-white/5 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200 flex items-center space-x-1.5">
                <Bus className="w-3.5 h-3.5 text-sky-400" />
                <span>Daily Campus Shuttle & Commuter Mileage</span>
              </span>
              <span className="font-mono font-bold text-sky-300">
                {dailyCommuterKm} pass-km/day
              </span>
            </div>
            <input
              type="range"
              min="500"
              max="5000"
              step="100"
              value={dailyCommuterKm}
              onChange={e => setDailyCommuterKm(Number(e.target.value))}
              className="w-full accent-sky-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>500 km</span>
              <span>1,850 km (Baseline)</span>
              <span>5,000 km (Peak Days)</span>
            </div>
          </div>

          {/* Factor 3: Solid Waste Landfill Decomposition */}
          <div className="p-3.5 rounded-xl bg-campus-darkest/60 border border-white/5 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200 flex items-center space-x-1.5">
                <Trash2 className="w-3.5 h-3.5 text-eco-red" />
                <span>Landfill Methane & Decomposition Factor</span>
              </span>
              <span className="font-mono font-bold text-eco-red">
                {wasteFactor} kg CO2e / kg waste
              </span>
            </div>
            <input
              type="range"
              min="0.50"
              max="2.00"
              step="0.05"
              value={wasteFactor}
              onChange={e => setWasteFactor(Number(e.target.value))}
              className="w-full accent-eco-red h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0.50 (High Composting)</span>
              <span>1.15 (Default Landfill)</span>
              <span>2.00 (Uncontrolled Dump)</span>
            </div>
          </div>
        </div>

        {/* Breakdown Chart & Comparison (6 cols) */}
        <div className="lg:col-span-6 glass-panel rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
          <div className="pb-3 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
              <Footprints className="w-4 h-4 text-purple-400" />
              <span>Emissions by Category & Potential Avoidance</span>
            </h3>
            <span className="text-[10px] font-mono text-eco-green font-bold">
              -24% Roadmap
            </span>
          </div>

          <div className="h-60 w-full my-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
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
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="Baseline" fill="#64748B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Proposed" fill="#A855F7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Reduction Strategy Checklist */}
          <div className="p-3.5 rounded-xl bg-campus-darkest/70 border border-white/5 space-y-2 text-xs">
            <span className="font-bold text-white block">Key Avoidance Interventions:</span>
            <div className="space-y-1 text-[11px] text-slate-300">
              <div className="flex items-center space-x-1.5 text-eco-green">
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Expand Kudlu Gate EV campus shuttle (Cuts 65 kg CO2e/day)</span>
              </div>
              <div className="flex items-center space-x-1.5 text-eco-green">
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                <span>100% Canteen organic composting (Eliminates 115 kg CO2e landfill methane)</span>
              </div>
              <div className="flex items-center space-x-1.5 text-eco-green">
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                <span>PIR sensors + rooftop solar expansion (Avoids ~195 kg CO2e/day)</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Transparent Disclaimer */}
      <div className="p-3 rounded-xl bg-campus-card/50 border border-white/5 flex items-start space-x-2 text-[11px] text-slate-400">
        <Info className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
        <p>
          <strong>Methodological Transparency:</strong> Carbon calculations employ emission factors aligned with the GHG Protocol Corporate Standard and Central Electricity Authority (CEA) of India Baseline Carbon Database Version 19. All values represent educational hackathon estimates.
        </p>
      </div>

    </div>
  );
};
