import React, { useState } from 'react';
import { X, AlertTriangle, Send, Upload, Check } from 'lucide-react';
import { useCampus } from '../../context/CampusContext';
import { IssueCategory, IssuePriority } from '../../types/campus';

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultLocationId?: string;
}

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({
  isOpen,
  onClose,
  defaultLocationId,
}) => {
  const { locations, addIssue } = useCampus();

  const [category, setCategory] = useState<IssueCategory>('Water Leakage');
  const [locationId, setLocationId] = useState<string>(defaultLocationId || locations[0]?.id || '');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<IssuePriority>('Medium');
  const [reporterName, setReporterName] = useState('Campus Green Warden / Student');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const categories: IssueCategory[] = [
    'Water Leakage',
    'Lights Left ON',
    'AC Running Unnecessarily',
    'Overflowing Dustbin',
    'Poor Waste Segregation',
    'Excessive Resource Consumption',
  ];

  const priorities: IssuePriority[] = ['Low', 'Medium', 'High', 'Critical'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    const loc = locations.find(l => l.id === locationId);

    // Calculate approximate estimated waste impact
    let wasteImpact = 'Resource alert';
    if (category === 'Water Leakage') wasteImpact = '~45 L water/day';
    else if (category === 'Lights Left ON') wasteImpact = '~12 kWh electricity';
    else if (category === 'AC Running Unnecessarily') wasteImpact = '~16.5 kWh wasted';
    else if (category === 'Poor Waste Segregation') wasteImpact = 'Recycling contamination';

    addIssue({
      category,
      locationId,
      locationName: loc ? loc.name : 'Dayananda Sagar University',
      description,
      priority,
      status: 'Pending',
      reporterName,
      estimatedWasteImpact: wasteImpact,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setDescription('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel-glow w-full max-w-lg rounded-2xl p-6 border border-white/20 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-eco-amber" />
            <h3 className="text-lg font-bold text-white">
              Report Campus Sustainability Anomaly
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-campus-surface transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-eco-green/20 text-eco-green mx-auto flex items-center justify-center animate-bounce">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">
              Incident Logged Successfully
            </h4>
            <p className="text-xs text-slate-400">
              Dispatched to DSU Facilities & Green Sentinel Dashboard.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            
            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Anomaly Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as IssueCategory)}
                className="w-full bg-campus-darkest border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-eco-green"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* DSU Location */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Campus Location (DSU Block)
              </label>
              <select
                value={locationId}
                onChange={e => setLocationId(e.target.value)}
                className="w-full bg-campus-darkest border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-eco-green"
              >
                {locations.map(loc => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name} ({loc.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Detailed Observation
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="e.g. 2nd floor restroom faucet running continuously, estimated 2L/min loss..."
                className="w-full bg-campus-darkest border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-eco-green placeholder:text-slate-600"
              />
            </div>

            {/* Priority and Reporter Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Urgency Level
                </label>
                <select
                  value={priority}
                  onChange={e => setPriority(e.target.value as IssuePriority)}
                  className="w-full bg-campus-darkest border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-eco-green"
                >
                  {priorities.map(p => (
                    <option key={p} value={p}>
                      {p} Priority
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Reporter Identifier
                </label>
                <input
                  type="text"
                  value={reporterName}
                  onChange={e => setReporterName(e.target.value)}
                  className="w-full bg-campus-darkest border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-eco-green"
                />
              </div>
            </div>

            {/* Image attachment simulation */}
            <div className="p-3 rounded-xl bg-campus-darkest/40 border border-dashed border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center space-x-2">
                <Upload className="w-4 h-4 text-eco-cyan" />
                <span>Optional Photo Evidence Attached (Simulated)</span>
              </span>
              <span className="text-[10px] text-eco-green font-mono">Ready</span>
            </div>

            {/* Submit buttons */}
            <div className="pt-2 flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-eco-green hover:bg-eco-greenDark text-campus-darkest font-bold text-xs shadow-glow-green transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Issue Report</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
