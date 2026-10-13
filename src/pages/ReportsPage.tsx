import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import {
  FileText,
  Download,
  Printer,
  Award,
  Info,
} from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const { locations, metrics, simulationResult } = useCampus();

  const [reportPeriod, setReportPeriod] = useState<'Daily' | 'Monthly'>('Daily');
  const [selectedMonth] = useState('October 2026');

  // CSV Export feature
  const handleExportCSV = () => {
    const headers = [
      'Location Code',
      'Facility Name',
      'Category',
      'Electricity (kWh/day)',
      'Water (Litres/day)',
      'Waste (kg/day)',
      'Recycled (%)',
      'Est Carbon (kg CO2e)',
      'Status',
    ];

    const rows = locations.map(loc => [
      loc.code,
      `"${loc.name}"`,
      loc.category,
      loc.electricityKwh,
      loc.waterLitres,
      loc.wasteKg,
      loc.wasteRecycledPct,
      loc.carbonKg,
      loc.status,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `EcoCampus_DSU_Sustainability_Report_${reportPeriod}_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 border border-eco-cyan/20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-eco-cyan" />
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                DSU Campus Sustainability Audits & Executive Reports
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-eco-cyan/20 text-eco-cyan font-bold border border-eco-cyan/30">
                Compliance Auditing
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Official hackathon synthesis report of resource consumption, carbon footprint, and digital twin simulation benchmarks across Dayananda Sagar University.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-campus-card hover:bg-campus-surface border border-white/10 text-xs font-semibold text-white transition-colors"
            >
              <Download className="w-4 h-4 text-eco-green" />
              <span>Export CSV Dataset</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-eco-cyan hover:bg-eco-cyanDark text-campus-darkest font-bold text-xs shadow-glow-cyan transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF Report</span>
            </button>
          </div>
        </div>

        {/* Period Selector */}
        <div className="mt-4 pt-4 border-t border-white/10 flex items-center space-x-3 text-xs">
          <span className="text-slate-400 font-medium">Reporting Interval:</span>
          <div className="flex bg-campus-darkest p-1 rounded-lg border border-white/10">
            {(['Daily', 'Monthly'] as const).map(period => (
              <button
                key={period}
                onClick={() => setReportPeriod(period)}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  reportPeriod === period
                    ? 'bg-campus-surface text-eco-cyan font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {period} Report
              </button>
            ))}
          </div>
          <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
            Generated for {selectedMonth}
          </span>
        </div>
      </div>

      {/* Printable Report Document Card */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6">
        
        {/* Document Header Branding */}
        <div className="flex items-start justify-between pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-bold font-mono uppercase text-eco-cyan tracking-wider">
              EcoCampus AI Intelligence Platform • Hackathon Demo Report
            </span>
            <h2 className="text-2xl font-extrabold text-white mt-1">
              Dayananda Sagar University (DSU) Environmental Performance Audit
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Report Date: 13 October 2026 • Scope: Main Campus (Kudlu Gate / Harohalli) • Mode: Simulated Data
            </p>
          </div>

          <div className="text-right hidden sm:block">
            <span className="px-3 py-1 rounded-full bg-eco-green/15 text-eco-green text-xs font-bold border border-eco-green/30">
              Audit Verified: Grade A
            </span>
            <p className="text-[10px] text-slate-500 font-mono mt-1">
              Doc ID: DSU-ECO-2026-Q4
            </p>
          </div>
        </div>

        {/* Executive Summary Cards */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            1. Executive Macro Resource Totals ({reportPeriod} Aggregate)
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-campus-darkest/70 border border-white/5">
              <span className="text-xs text-slate-400">Total Electricity</span>
              <p className="text-xl font-bold font-mono text-amber-300 mt-1">
                {metrics.totalElectricityKwh.toLocaleString()} kWh
              </p>
              <span className="text-[10px] text-slate-500">Solar Offset: 345 kWh</span>
            </div>

            <div className="p-3.5 rounded-xl bg-campus-darkest/70 border border-white/5">
              <span className="text-xs text-slate-400">Total Water Intake</span>
              <p className="text-xl font-bold font-mono text-sky-400 mt-1">
                {metrics.totalWaterLitres.toLocaleString()} L
              </p>
              <span className="text-[10px] text-slate-500">Greywater: 4,850 L recycled</span>
            </div>

            <div className="p-3.5 rounded-xl bg-campus-darkest/70 border border-white/5">
              <span className="text-xs text-slate-400">Solid Waste Generated</span>
              <p className="text-xl font-bold font-mono text-emerald-400 mt-1">
                {metrics.totalWasteKg} kg
              </p>
              <span className="text-[10px] text-eco-green font-mono">{metrics.wasteRecycledPct}% segregation rate</span>
            </div>

            <div className="p-3.5 rounded-xl bg-campus-darkest/70 border border-white/5">
              <span className="text-xs text-slate-400">Carbon Equivalency</span>
              <p className="text-xl font-bold font-mono text-purple-400 mt-1">
                {metrics.totalCarbonKg} kg CO2e
              </p>
              <span className="text-[10px] text-slate-500">Scope 2 & 3</span>
            </div>
          </div>
        </div>

        {/* Location Performance Table */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            2. Campus Facility Telemetry Breakdown (DSU Blocks)
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 font-mono text-[11px]">
                  <th className="pb-2">Block Code</th>
                  <th className="pb-2">Facility Name</th>
                  <th className="pb-2">Domain</th>
                  <th className="pb-2">Electricity</th>
                  <th className="pb-2">Water</th>
                  <th className="pb-2">Waste</th>
                  <th className="pb-2">Recycled</th>
                  <th className="pb-2">Carbon Footprint</th>
                  <th className="pb-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {locations.map(loc => (
                  <tr key={loc.id} className="hover:bg-white/5">
                    <td className="py-2 text-eco-cyan font-bold">{loc.code}</td>
                    <td className="py-2 font-sans font-bold text-white">{loc.name}</td>
                    <td className="py-2 font-sans text-slate-400">{loc.category}</td>
                    <td className="py-2 text-amber-300">{loc.electricityKwh} kWh</td>
                    <td className="py-2 text-sky-300">{loc.waterLitres.toLocaleString()} L</td>
                    <td className="py-2 text-slate-200">{loc.wasteKg} kg</td>
                    <td className="py-2 text-eco-green">{loc.wasteRecycledPct}%</td>
                    <td className="py-2 text-purple-300">{loc.carbonKg} kg</td>
                    <td className="py-2 text-right">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          loc.status === 'optimal'
                            ? 'bg-eco-green/20 text-eco-green'
                            : loc.status === 'warning'
                            ? 'bg-eco-amber/20 text-eco-amber'
                            : 'bg-eco-red/20 text-eco-red'
                        }`}
                      >
                        {loc.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Digital Twin Simulation Savings Section */}
        <div className="p-4 rounded-xl bg-campus-darkest/70 border border-eco-green/20 space-y-2">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
            <Award className="w-4 h-4 text-eco-green" />
            <span>3. Digital Twin Scenario Simulation Savings Audit</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
            <div className="p-3 rounded-lg bg-campus-card border border-white/5">
              <span className="text-slate-400">Electricity Potential Saved:</span>
              <p className="text-base font-bold text-eco-green font-mono">
                {simulationResult.electricitySaved} kWh/day
              </p>
              <span className="text-[10px] text-slate-500">Via smart sensor scheduling</span>
            </div>

            <div className="p-3 rounded-lg bg-campus-card border border-white/5">
              <span className="text-slate-400">Water Potential Conserved:</span>
              <p className="text-base font-bold text-sky-400 font-mono">
                {simulationResult.waterSaved.toLocaleString()} L/day
              </p>
              <span className="text-[10px] text-slate-500">Via aerators & leak alarms</span>
            </div>

            <div className="p-3 rounded-lg bg-campus-card border border-white/5">
              <span className="text-slate-400">Estimated Utility Cost Savings:</span>
              <p className="text-base font-bold text-amber-400 font-mono">
                ₹{simulationResult.estimatedCostSavingsInr.toLocaleString()} / day
              </p>
              <span className="text-[10px] text-slate-500">₹{(simulationResult.estimatedCostSavingsInr * 30).toLocaleString()} / month</span>
            </div>
          </div>
        </div>

        {/* Strategic AI Recommendations */}
        <div className="space-y-2 text-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            4. Recommended Campus Strategic Directives
          </h3>
          <ul className="space-y-1.5 pl-5 list-disc text-slate-300">
            <li>
              <strong>Canteen Food Court:</strong> Enforce separate bin stations and launch optical waste validation at return trays.
            </li>
            <li>
              <strong>Academic Block:</strong> Roll out classroom schedule automation to prevent empty room lighting between 02:00 PM and 05:00 PM.
            </li>
            <li>
              <strong>Sports Complex:</strong> Restrict grounds sprinkling to early morning before sunrise to prevent 40% evaporation loss.
            </li>
          </ul>
        </div>

      </div>

      {/* Transparent Disclaimer */}
      <div className="p-3 rounded-xl bg-campus-card/50 border border-white/5 flex items-start space-x-2 text-[11px] text-slate-400">
        <Info className="w-4 h-4 text-eco-cyan flex-shrink-0 mt-0.5" />
        <p>
          <strong>Simulated Report Disclosure:</strong> All figures and calculations are generated for the Dayananda Sagar University Hackathon demonstration. Measurements are illustrative and do not reflect certified external audits.
        </p>
      </div>

    </div>
  );
};
