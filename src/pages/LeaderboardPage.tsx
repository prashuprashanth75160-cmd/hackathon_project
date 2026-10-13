import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import {
  Trophy,
  Medal,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Minus,
  Info,
} from 'lucide-react';

export const LeaderboardPage: React.FC = () => {
  const { leaderboard, runGreenChallenge } = useCampus();
  const [challengeTriggered, setChallengeTriggered] = useState(false);

  const handleChallenge = () => {
    runGreenChallenge();
    setChallengeTriggered(true);
    setTimeout(() => setChallengeTriggered(false), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 border border-yellow-400/20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                DSU Green Campus & Department Leaderboard
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-yellow-400/20 text-yellow-400 font-bold border border-yellow-400/30">
                Gamified Sustainability
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Fosters inter-departmental eco-stewardship across Dayananda Sagar University. Points rewarded for energy reduction, water audits, and waste recycling adherence.
            </p>
          </div>

          <button
            onClick={handleChallenge}
            className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-glow-green ${
              challengeTriggered
                ? 'bg-eco-green text-campus-darkest animate-bounce'
                : 'bg-gradient-to-r from-eco-green to-eco-cyan text-campus-darkest hover:opacity-90'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{challengeTriggered ? '🎉 Challenge Scores Updated!' : 'Run Inter-Block Green Challenge'}</span>
          </button>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {leaderboard.slice(0, 3).map((entry, idx) => (
          <div
            key={entry.id}
            className={`glass-panel rounded-2xl p-5 border relative overflow-hidden flex flex-col justify-between ${
              idx === 0
                ? 'border-yellow-400/40 bg-gradient-to-b from-yellow-400/10 to-transparent'
                : idx === 1
                ? 'border-slate-300/30'
                : 'border-amber-600/30'
            }`}
          >
            {/* Rank badge */}
            <div className="flex items-start justify-between">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-sm ${
                  idx === 0
                    ? 'bg-yellow-400 text-campus-darkest shadow-glow-amber'
                    : idx === 1
                    ? 'bg-slate-300 text-campus-darkest'
                    : 'bg-amber-600 text-white'
                }`}
              >
                #{entry.rank}
              </div>

              <div className="flex items-center space-x-1 text-xs">
                {entry.trend === 'up' ? (
                  <span className="flex items-center text-eco-green font-semibold">
                    <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> Rising
                  </span>
                ) : entry.trend === 'down' ? (
                  <span className="flex items-center text-eco-red font-semibold">
                    <TrendingDown className="w-3.5 h-3.5 mr-0.5" /> Lower
                  </span>
                ) : (
                  <span className="flex items-center text-slate-400">
                    <Minus className="w-3.5 h-3.5 mr-0.5" /> Steady
                  </span>
                )}
              </div>
            </div>

            <div className="my-3">
              <h3 className="text-base font-bold text-white truncate">{entry.locationName}</h3>
              <p className="text-xs text-slate-400">{entry.department}</p>
              
              <div className="mt-3 flex items-baseline space-x-1.5">
                <span className="text-3xl font-extrabold text-white font-mono">
                  {entry.greenPoints.toLocaleString()}
                </span>
                <span className="text-xs text-eco-green font-semibold">Green Points</span>
              </div>
            </div>

            {/* Badges list */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
              {entry.badges.map(b => (
                <span
                  key={b}
                  className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-campus-darkest/80 text-eco-cyan border border-eco-cyan/20"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Complete Leaderboard Table */}
      <div className="glass-panel rounded-2xl p-5 border border-white/10">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center space-x-1.5">
          <Medal className="w-4 h-4 text-yellow-400" />
          <span>Full Campus Sustainability Standings</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-mono text-[11px]">
                <th className="pb-2 w-12 text-center">Rank</th>
                <th className="pb-2">Department / Location</th>
                <th className="pb-2">Green Points</th>
                <th className="pb-2">Energy Score</th>
                <th className="pb-2">Water Score</th>
                <th className="pb-2">Recycling Score</th>
                <th className="pb-2">Trend</th>
                <th className="pb-2 text-right">Earned Badges</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leaderboard.map(entry => (
                <tr key={entry.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 text-center font-bold font-mono">
                    <span
                      className={`inline-block w-6 h-6 rounded-full text-center leading-6 text-xs ${
                        entry.rank === 1
                          ? 'bg-yellow-400 text-campus-darkest font-bold'
                          : entry.rank === 2
                          ? 'bg-slate-300 text-campus-darkest font-bold'
                          : entry.rank === 3
                          ? 'bg-amber-600 text-white font-bold'
                          : 'bg-campus-darkest text-slate-400'
                      }`}
                    >
                      {entry.rank}
                    </span>
                  </td>
                  <td className="py-3">
                    <p className="font-bold text-white">{entry.locationName}</p>
                    <p className="text-[11px] text-slate-400">{entry.department}</p>
                  </td>
                  <td className="py-3 font-mono font-bold text-eco-green text-sm">
                    {entry.greenPoints.toLocaleString()}
                  </td>
                  <td className="py-3 font-mono text-amber-300">
                    {entry.energyScore}/100
                  </td>
                  <td className="py-3 font-mono text-sky-300">
                    {entry.waterScore}/100
                  </td>
                  <td className="py-3 font-mono text-emerald-300">
                    {entry.recyclingScore}/100
                  </td>
                  <td className="py-3">
                    {entry.trend === 'up' ? (
                      <span className="text-eco-green flex items-center text-xs font-semibold">
                        <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +
                      </span>
                    ) : entry.trend === 'down' ? (
                      <span className="text-eco-red flex items-center text-xs font-semibold">
                        <TrendingDown className="w-3.5 h-3.5 mr-0.5" /> -
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center text-xs">
                        <Minus className="w-3.5 h-3.5 mr-0.5" />
                      </span>
                    )}
                  </td>
                  <td className="py-3 text-right">
                    <div className="flex flex-wrap justify-end gap-1">
                      {entry.badges.map(b => (
                        <span
                          key={b}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-campus-darkest text-slate-300 border border-white/5"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transparent Disclaimer */}
      <div className="p-3 rounded-xl bg-campus-card/50 border border-white/5 flex items-start space-x-2 text-[11px] text-slate-400">
        <Info className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
        <p>
          <strong>Leaderboard Disclosure:</strong> Departmental rankings and point scores are simulated for hackathon gamification. They do not represent official evaluation of Dayananda Sagar University faculties or student bodies.
        </p>
      </div>

    </div>
  );
};
