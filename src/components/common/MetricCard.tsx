import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral'; // Note: in sustainability, negative energy/carbon is positive!
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  accentColor?: string;
  onClick?: () => void;
  badge?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  change,
  changeType = 'neutral',
  subtitle,
  icon: Icon,
  iconColor = 'text-eco-green',
  accentColor = 'border-eco-green/20',
  onClick,
  badge,
}) => {
  return (
    <div
      onClick={onClick}
      className={`glass-panel rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-glow-green border ${accentColor} ${
        onClick ? 'cursor-pointer hover:border-eco-green/50' : ''
      } relative overflow-hidden group`}
    >
      {/* Background glow decoration */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-eco-green/5 rounded-full blur-2xl group-hover:bg-eco-green/10 transition-colors pointer-events-none" />

      <div className="flex items-start justify-between relative z-10">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {title}
            </span>
            {badge && (
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-eco-cyan/20 text-eco-cyan border border-eco-cyan/30">
                {badge}
              </span>
            )}
          </div>

          <div className="mt-2 flex items-baseline space-x-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
              {value}
            </span>
            {unit && <span className="text-xs font-semibold text-slate-400">{unit}</span>}
          </div>
        </div>

        <div className={`p-2.5 rounded-xl bg-campus-darkest/70 border border-white/5 ${iconColor} group-hover:scale-110 transition-transform`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {(change || subtitle) && (
        <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs relative z-10">
          {change && (
            <div className="flex items-center space-x-1">
              {changeType === 'positive' ? (
                <span className="flex items-center text-eco-green font-semibold">
                  <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
                  {change}
                </span>
              ) : changeType === 'negative' ? (
                <span className="flex items-center text-eco-red font-semibold">
                  <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                  {change}
                </span>
              ) : (
                <span className="flex items-center text-slate-400">
                  <Minus className="w-3.5 h-3.5 mr-0.5" />
                  {change}
                </span>
              )}
              <span className="text-slate-400 text-[11px]">vs last week</span>
            </div>
          )}

          {subtitle && (
            <span className="text-[11px] text-slate-400 ml-auto truncate max-w-[170px]">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
