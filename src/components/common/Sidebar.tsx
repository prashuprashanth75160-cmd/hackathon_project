import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Cpu,
  ScanLine,
  Zap,
  Droplets,
  AlertTriangle,
  Bot,
  Footprints,
  FileText,
  Trophy,
  Sliders,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { metrics, isJudgeScenarioActive } = useCampus();

  const navItems = [
    { to: '/', label: 'Overview Dashboard', icon: LayoutDashboard },
    { to: '/digital-twin', label: 'DSU Digital Twin', icon: Cpu, badge: 'Interactive' },
    { to: '/waste-analyzer', label: 'Waste AI Vision', icon: ScanLine, badge: 'CV Demo' },
    { to: '/energy', label: 'Energy Monitoring', icon: Zap },
    { to: '/water', label: 'Water & Leakages', icon: Droplets },
    { to: '/issues', label: 'Issue Management', icon: AlertTriangle, count: metrics.activeIssuesCount },
    { to: '/assistant', label: 'Eco AI Assistant', icon: Bot, badge: 'AI Chat' },
    { to: '/carbon', label: 'Carbon Calculator', icon: Footprints },
    { to: '/reports', label: 'Sustainability Reports', icon: FileText },
    { to: '/leaderboard', label: 'Green Leaderboard', icon: Trophy },
    { to: '/settings', label: 'Settings & Admin', icon: Sliders },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-16 z-40 h-full lg:h-[calc(100vh-4rem)] w-64 bg-campus-bg/95 border-r border-campus-border flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Navigation list */}
        <div className="py-4 px-3 flex-1 overflow-y-auto space-y-1">
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Platform Modules
          </div>

          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-eco-green/20 to-eco-cyan/10 text-white border-l-4 border-eco-green shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-campus-surface/60'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center space-x-3">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive
                            ? 'text-eco-green'
                            : 'text-slate-400 group-hover:text-eco-cyan'
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      {item.badge && (
                        <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-eco-cyan/15 text-eco-cyan border border-eco-cyan/30">
                          {item.badge}
                        </span>
                      )}
                      {typeof item.count === 'number' && item.count > 0 && (
                        <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-eco-amber/20 text-eco-amber">
                          {item.count}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Bottom Campus Health Widget */}
        <div className="p-3 border-t border-campus-border bg-campus-card/50">
          <div className="p-3 rounded-xl bg-campus-darkest/70 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-300">Campus Green Score</span>
              <span className="text-xs font-extrabold text-eco-green font-mono">
                {metrics.sustainabilityScore}/100
              </span>
            </div>

            {/* Score progress bar */}
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-eco-green to-eco-cyan h-1.5 rounded-full transition-all duration-700"
                style={{ width: `${metrics.sustainabilityScore}%` }}
              />
            </div>

            <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400">
              <span className="flex items-center space-x-1 text-eco-green">
                <CheckCircle2 className="w-3 h-3" />
                <span>Simulated Mode</span>
              </span>
              <span className="font-mono text-slate-400">
                {isJudgeScenarioActive ? 'Scenario: -15%' : 'Baseline'}
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
