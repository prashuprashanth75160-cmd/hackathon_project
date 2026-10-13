import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import {
  Sliders,
  RotateCcw,
  CheckCircle2,
  Info,
  Server,
  Save,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { resetAllDemoData, isJudgeScenarioActive, toggleJudgeScenario } = useCampus();

  const [elecThreshold, setElecThreshold] = useState(250);
  const [waterThreshold, setWaterThreshold] = useState(6000);
  const [wasteThreshold, setWasteThreshold] = useState(200);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveThresholds = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Sliders className="w-5 h-5 text-eco-green" />
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                Platform Admin, Thresholds & Integration Status
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-eco-green/20 text-eco-green font-bold border border-eco-green/30">
                Sandbox Admin
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Configure telemetry thresholds, audit mock hardware integration status, and manage simulated hackathon state for Dayananda Sagar University.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={resetAllDemoData}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-eco-red/20 hover:bg-eco-red/30 text-eco-red border border-eco-red/30 text-xs font-semibold transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset All Demo Data to Defaults</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Anomaly Detection Thresholds Form (7 cols) */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-5 border border-white/10">
          <div className="pb-3 border-b border-white/10 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Configurable Sustainability Anomaly Thresholds
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Triggers visual status alerts on 2D digital twin map when exceeded
              </p>
            </div>
            {isSaved && (
              <span className="text-xs font-bold text-eco-green flex items-center space-x-1 animate-pulse">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Thresholds Saved</span>
              </span>
            )}
          </div>

          <form onSubmit={handleSaveThresholds} className="mt-4 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Electricity Warning Threshold (kWh/facility/day)
              </label>
              <input
                type="number"
                value={elecThreshold}
                onChange={e => setElecThreshold(Number(e.target.value))}
                className="w-full bg-campus-darkest border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-eco-green"
              />
              <span className="text-[10px] text-slate-500 font-mono">
                Buildings exceeding this will enter "Warning" status
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Water Draw Critical Threshold (Litres/facility/day)
              </label>
              <input
                type="number"
                value={waterThreshold}
                onChange={e => setWaterThreshold(Number(e.target.value))}
                className="w-full bg-campus-darkest border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-eco-green"
              />
              <span className="text-[10px] text-slate-500 font-mono">
                Flags potential continuous pipe leakage or washroom overflow
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Solid Waste Volume Threshold (kg/facility/day)
              </label>
              <input
                type="number"
                value={wasteThreshold}
                onChange={e => setWasteThreshold(Number(e.target.value))}
                className="w-full bg-campus-darkest border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-eco-green"
              />
              <span className="text-[10px] text-slate-500 font-mono">
                Alerts campus sanitation team for urgent container pickup
              </span>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-eco-green hover:bg-eco-greenDark text-campus-darkest font-bold text-xs shadow-glow-green transition-all"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Platform Thresholds</span>
              </button>
            </div>
          </form>
        </div>

        {/* Integration Architecture & Service Health (5 cols) */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-5 border border-white/10 space-y-4">
          <div className="pb-3 border-b border-white/10">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
              <Server className="w-4 h-4 text-eco-cyan" />
              <span>Data Source & Architecture Status</span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Live status of simulated campus microservices
            </p>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-campus-darkest/70 border border-white/5 flex items-center justify-between">
              <div>
                <p className="font-bold text-white">Computer Vision Waste Classifier</p>
                <span className="text-[10px] text-slate-400">YOLOv8 Edge Model Protocol</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-eco-green/20 text-eco-green">
                Simulated Ready
              </span>
            </div>

            <div className="p-3 rounded-xl bg-campus-darkest/70 border border-white/5 flex items-center justify-between">
              <div>
                <p className="font-bold text-white">Digital Twin Physics Simulation</p>
                <span className="text-[10px] text-slate-400">Energy & Water Parametric Engine</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-eco-green/20 text-eco-green">
                Active In-Browser
              </span>
            </div>

            <div className="p-3 rounded-xl bg-campus-darkest/70 border border-white/5 flex items-center justify-between">
              <div>
                <p className="font-bold text-white">Eco AI Assistant Service Layer</p>
                <span className="text-[10px] text-slate-400">Contextual Rule & LLM Fallback</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-eco-cyan/20 text-eco-cyan">
                Demo Engine Active
              </span>
            </div>

            <div className="p-3 rounded-xl bg-campus-darkest/70 border border-white/5 flex items-center justify-between">
              <div>
                <p className="font-bold text-white">Local Storage & State Persistence</p>
                <span className="text-[10px] text-slate-400">Browser HTML5 WebStorage</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-eco-green/20 text-eco-green">
                Synchronized
              </span>
            </div>
          </div>

          {/* Quick Judge Demo Trigger */}
          <div className="p-3 rounded-xl bg-campus-darkest/90 border border-eco-green/30 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-white block">Hackathon Judge Scenario</span>
              <span className="text-[11px] text-slate-400">15% Energy Cut & Water Fixes</span>
            </div>
            <button
              onClick={toggleJudgeScenario}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                isJudgeScenarioActive
                  ? 'bg-eco-green text-campus-darkest font-extrabold'
                  : 'bg-campus-surface border border-white/10 text-slate-300'
              }`}
            >
              {isJudgeScenarioActive ? 'Active' : 'Toggle'}
            </button>
          </div>
        </div>

      </div>

      {/* Disclaimers & Security policy */}
      <div className="p-4 rounded-xl bg-campus-card/50 border border-white/5 flex items-start space-x-2.5 text-xs text-slate-400">
        <Info className="w-4 h-4 text-eco-cyan flex-shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-200">Security & Privacy Protocol:</strong> This platform is designed as an open hackathon demonstrator. Client-side state operates without storing sensitive credentials or fake authentication barriers. All backend API connections use environment variables for key management.
        </p>
      </div>

    </div>
  );
};
