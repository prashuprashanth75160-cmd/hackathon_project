import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import {
  AlertTriangle,
  Plus,
  CheckCircle2,
  MapPin,
  Check,
  Search,
  User,
} from 'lucide-react';
import { IssueStatus } from '../types/campus';
import { ReportIssueModal } from '../components/issues/ReportIssueModal';

export const IssueManagementPage: React.FC = () => {
  const { issues, updateIssueStatus } = useCampus();

  const [statusFilter, setStatusFilter] = useState<IssueStatus | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredIssues = issues.filter(issue => {
    if (statusFilter !== 'All' && issue.status !== statusFilter) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        issue.category.toLowerCase().includes(term) ||
        issue.locationName.toLowerCase().includes(term) ||
        issue.description.toLowerCase().includes(term) ||
        issue.reporterName.toLowerCase().includes(term)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 border border-eco-amber/20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-eco-amber" />
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                Campus Sustainability Issue & Dispatch Hub
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-eco-amber/20 text-eco-amber font-bold border border-eco-amber/30">
                Action Registry
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Track and resolve water leaks, energy wastage, lighting left ON, and cafeteria waste segregation anomalies across Dayananda Sagar University.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-eco-green hover:bg-eco-greenDark text-campus-darkest font-bold text-xs shadow-glow-green transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Report New Campus Anomaly</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel rounded-2xl p-4 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Status tabs */}
        <div className="flex items-center space-x-1 bg-campus-darkest/70 p-1 rounded-xl border border-white/5">
          {(['All', 'Pending', 'In Progress', 'Resolved'] as const).map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-campus-surface text-eco-green font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative flex-1 max-w-xs min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search by building, category, keyword..."
            className="w-full bg-campus-darkest/80 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-eco-green"
          />
        </div>

        <span className="text-[11px] text-slate-400 font-mono">
          Showing {filteredIssues.length} of {issues.length} records
        </span>
      </div>

      {/* Issues Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIssues.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-400 glass-panel rounded-2xl border border-white/5">
            <CheckCircle2 className="w-10 h-10 text-eco-green mx-auto mb-2 opacity-60" />
            <p className="text-sm font-semibold text-slate-300">
              No issue tickets matching current filter criteria.
            </p>
          </div>
        ) : (
          filteredIssues.map(issue => (
            <div
              key={issue.id}
              className="glass-panel rounded-2xl p-5 border border-white/10 flex flex-col justify-between space-y-4 hover:border-eco-green/40 transition-all group"
            >
              <div className="space-y-2.5">
                {/* Header: Priority & Status badge */}
                <div className="flex items-center justify-between text-xs">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      issue.priority === 'Critical' || issue.priority === 'High'
                        ? 'bg-eco-red/20 text-eco-red border border-eco-red/30'
                        : 'bg-eco-amber/20 text-eco-amber border border-eco-amber/30'
                    }`}
                  >
                    {issue.priority} Priority
                  </span>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      issue.status === 'Resolved'
                        ? 'bg-eco-green/20 text-eco-green border border-eco-green/30'
                        : issue.status === 'In Progress'
                        ? 'bg-sky-400/20 text-sky-400 border border-sky-400/30'
                        : 'bg-amber-400/20 text-amber-400 border border-amber-400/30'
                    }`}
                  >
                    {issue.status}
                  </span>
                </div>

                {/* Category & Location */}
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-eco-green transition-colors">
                    {issue.category}
                  </h3>
                  <div className="flex items-center space-x-1.5 text-xs text-slate-400 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-eco-cyan flex-shrink-0" />
                    <span>{issue.locationName}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed bg-campus-darkest/40 p-2.5 rounded-xl border border-white/5">
                  {issue.description}
                </p>

                {/* Impact estimate */}
                <div className="text-[11px] font-mono text-eco-amber flex items-center justify-between">
                  <span>Waste Factor:</span>
                  <span className="font-bold">{issue.estimatedWasteImpact}</span>
                </div>
              </div>

              {/* Footer: Metadata & Status Controls */}
              <div className="pt-3 border-t border-white/5 space-y-2">
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span className="flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span className="truncate max-w-[120px]">{issue.reporterName}</span>
                  </span>
                  <span>{issue.reportedAt}</span>
                </div>

                {/* State Machine Action Buttons */}
                <div className="flex items-center space-x-1.5 pt-1">
                  {issue.status === 'Pending' && (
                    <button
                      onClick={() => updateIssueStatus(issue.id, 'In Progress')}
                      className="w-full py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 text-xs font-semibold border border-sky-500/30 transition-colors"
                    >
                      Dispatch Team (In Progress)
                    </button>
                  )}

                  {issue.status === 'In Progress' && (
                    <button
                      onClick={() => updateIssueStatus(issue.id, 'Resolved')}
                      className="w-full py-1.5 rounded-lg bg-eco-green/20 hover:bg-eco-green/30 text-eco-green text-xs font-semibold border border-eco-green/30 transition-colors flex items-center justify-center space-x-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Mark Resolved</span>
                    </button>
                  )}

                  {issue.status === 'Resolved' && (
                    <button
                      onClick={() => updateIssueStatus(issue.id, 'In Progress')}
                      className="w-full py-1.5 rounded-lg bg-campus-card hover:bg-campus-surface text-slate-400 hover:text-white text-xs font-medium border border-white/10 transition-colors"
                    >
                      Reopen Ticket
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Modal for reporting */}
      <ReportIssueModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </div>
  );
};
