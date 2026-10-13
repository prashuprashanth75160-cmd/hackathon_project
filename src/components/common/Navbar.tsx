import React, { useState } from 'react';
import {
  Bell,
  ChevronDown,
  Layers,
  Sparkles,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onMobileMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onMobileMenuToggle, isMobileMenuOpen }) => {
  const {
    selectedCampusCampusName,
    setSelectedCampusName,
    currentDateFilter,
    setCurrentDateFilter,
    issues,
    metrics,
  } = useCampus();

  const [isCampusDropdownOpen, setIsCampusDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const campuses = [
    'DSU Main Campus — Kudlu Gate / Harohalli',
    'DSU Innovation & Tech Park Campus',
    'DSU City Campus — Kumaraswamy Layout',
  ];

  const pendingIssues = issues.filter(i => i.status !== 'Resolved');

  return (
    <header className="sticky top-0 z-30 bg-campus-bg/90 backdrop-blur-md border-b border-campus-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Mobile hamburger + Brand */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onMobileMenuToggle}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-campus-surface lg:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/" className="flex items-center space-x-3 group">
            {/* Clean DSU Identity Icon */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-eco-green via-eco-cyan to-blue-600 flex items-center justify-center shadow-glow-green group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-campus-darkest text-sm tracking-tighter">DSU</span>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold tracking-tight text-white group-hover:text-eco-green transition-colors">
                  EcoCampus <span className="text-eco-cyan">AI</span>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-campus-surface text-eco-cyan px-2 py-0.5 rounded border border-eco-cyan/30 hidden sm:inline-block">
                  DSU Smart Campus
                </span>
              </div>
              <p className="text-[11px] text-campus-muted font-medium tracking-tight hidden md:block">
                Dayananda Sagar University • AI-Powered Campus Sustainability Intelligence
              </p>
            </div>
          </Link>
        </div>

        {/* Center: Campus Selector */}
        <div className="hidden lg:flex items-center space-x-2">
          <div className="relative">
            <button
              onClick={() => setIsCampusDropdownOpen(!isCampusDropdownOpen)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-campus-card border border-campus-border hover:border-eco-green/40 text-xs font-medium text-slate-200 transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-eco-green" />
              <span className="max-w-[210px] truncate">{selectedCampusCampusName}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isCampusDropdownOpen && (
              <div className="absolute left-0 mt-2 w-72 rounded-xl glass-dropdown shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <p className="text-[10px] uppercase font-bold text-slate-400 px-3 py-1 tracking-wider">
                  Select Demonstration Campus
                </p>
                {campuses.map(campus => (
                  <button
                    key={campus}
                    onClick={() => {
                      setSelectedCampusName(campus);
                      setIsCampusDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      selectedCampusCampusName === campus
                        ? 'bg-eco-green/20 text-eco-green font-semibold'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {campus}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Date Filter */}
          <div className="flex bg-campus-card p-0.5 rounded-lg border border-campus-border text-xs">
            {(['Today', 'This Week', 'This Month'] as const).map(filter => (
              <button
                key={filter}
                onClick={() => setCurrentDateFilter(filter)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  currentDateFilter === filter
                    ? 'bg-campus-surface text-eco-green shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Telemetry status + Notification + Profile */}
        <div className="flex items-center space-x-3">
          {/* Active status pulse */}
          <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-eco-green/10 border border-eco-green/25 text-[11px] text-eco-green">
            <span className="w-2 h-2 rounded-full bg-eco-green animate-ping inline-block" />
            <span className="font-medium">AI Sentinels Active</span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-2 rounded-lg bg-campus-card hover:bg-campus-surface border border-campus-border text-slate-300 hover:text-white transition-colors"
              title="Recent Campus Sustainability Alerts"
            >
              <Bell className="w-4 h-4" />
              {pendingIssues.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-eco-red text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
                  {pendingIssues.length}
                </span>
              )}
            </button>

            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl glass-dropdown shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 border border-white/10">
                <div className="flex items-center justify-between pb-2 border-b border-campus-border mb-2">
                  <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-eco-cyan" />
                    <span>Real-time Sustainability Alerts</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {pendingIssues.length} active
                  </span>
                </div>

                <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                  {pendingIssues.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-4">
                      No active critical issues detected. Campus operating within green thresholds.
                    </p>
                  ) : (
                    pendingIssues.map(issue => (
                      <div
                        key={issue.id}
                        className="p-2.5 rounded-lg bg-campus-surface/50 border border-white/5 hover:border-eco-green/30 transition-colors"
                      >
                        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-200">
                          <span className="text-eco-cyan">{issue.category}</span>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                              issue.priority === 'High' || issue.priority === 'Critical'
                                ? 'bg-eco-red/20 text-eco-red'
                                : 'bg-eco-amber/20 text-eco-amber'
                            }`}
                          >
                            {issue.priority}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                          {issue.description}
                        </p>
                        <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400">
                          <span>{issue.locationName}</span>
                          <span className="font-mono">{issue.reportedAt.slice(11)}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="pt-2 border-t border-campus-border mt-2">
                  <Link
                    to="/issues"
                    onClick={() => setIsNotificationOpen(false)}
                    className="block text-center text-xs text-eco-green hover:underline font-medium"
                  >
                    View All Issue Reports & Dispatch Logs →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* DSU Profile avatar */}
          <div className="flex items-center space-x-2 pl-2 border-l border-campus-border">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-eco-green/40 to-eco-cyan/40 border border-eco-green/50 flex items-center justify-center text-xs font-bold text-white">
              DS
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-xs font-semibold text-white leading-tight">Hackathon Team</p>
              <p className="text-[10px] text-eco-green font-mono">Sustainability Admin</p>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};
