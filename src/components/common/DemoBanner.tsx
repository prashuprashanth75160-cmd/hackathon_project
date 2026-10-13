import React from 'react';
import { AlertCircle, Sparkles, RotateCcw } from 'lucide-react';
import { useCampus } from '../../context/CampusContext';

export const DemoBanner: React.FC = () => {
  const { isJudgeScenarioActive, toggleJudgeScenario, resetAllDemoData } = useCampus();

  return (
    <div className="bg-gradient-to-r from-campus-card via-campus-surface to-campus-card border-b border-eco-green/20 px-4 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-eco-green/20 text-eco-green border border-eco-green/30 tracking-wider uppercase">
            Hackathon Demo
          </span>
          <span className="text-slate-300 font-medium hidden sm:inline">
            Dayananda Sagar University (DSU) Prototype — All Campus Telemetry Simulated
          </span>
          <span className="text-slate-400 sm:hidden">
            DSU Prototype — Simulated Telemetry
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={toggleJudgeScenario}
            className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              isJudgeScenarioActive
                ? 'bg-eco-green text-campus-darkest font-semibold shadow-glow-green animate-pulse'
                : 'bg-campus-surface hover:bg-campus-card border border-white/10 text-slate-200 hover:border-eco-green/40'
            }`}
            title="Toggle pre-configured 15% energy & water reduction scenario for judges"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isJudgeScenarioActive ? 'Judge Demo Active (-15% Energy)' : '1-Click Judge Scenario'}</span>
          </button>

          <button
            onClick={resetAllDemoData}
            className="inline-flex items-center space-x-1 px-2 py-1 rounded-md text-xs text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors"
            title="Reset all demo metrics and issues to baseline"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden md:inline">Reset Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
