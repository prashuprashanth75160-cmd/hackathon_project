import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { CampusMap2D } from '../components/digitalTwin/CampusMap2D';
import { LocationDetailModal } from '../components/digitalTwin/LocationDetailModal';
import { SimulationControlPanel } from '../components/digitalTwin/SimulationControlPanel';
import { LocationStatus } from '../types/campus';
import {
  Cpu,
  MapPin,
  Building2,
  Info,
  Filter,
} from 'lucide-react';

export const DigitalTwinPage: React.FC = () => {
  const { locations, selectedLocation, setSelectedLocation } = useCampus();
  const [filterStatus, setFilterStatus] = useState<LocationStatus | 'all'>('all');

  const filteredLocations = locations.filter(loc => {
    if (filterStatus === 'all') return true;
    return loc.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="glass-panel rounded-2xl p-6 border border-eco-green/20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Cpu className="w-5 h-5 text-eco-green" />
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                DSU Campus Digital Twin & Resource Simulation
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-eco-green/20 text-eco-green font-bold border border-eco-green/30">
                2D Interactive Sandbox
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl">
              Virtual spatial replica of Dayananda Sagar University (DSU) key blocks. Click any building node to inspect live simulated power, water, occupancy, and waste streams.
            </p>
          </div>

          {/* Status filter pill */}
          <div className="flex items-center space-x-2 bg-campus-darkest/70 p-1 rounded-xl border border-white/10 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400 ml-2" />
            {(['all', 'optimal', 'warning', 'critical'] as const).map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1 rounded-lg font-medium capitalize transition-colors ${
                  filterStatus === status
                    ? 'bg-campus-surface text-eco-green font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive 2D Campus Map Card */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
            <MapPin className="w-4 h-4 text-eco-cyan" />
            <span>Interactive Campus Telemetry Overlay (Click any node to inspect)</span>
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            Showing {filteredLocations.length} of {locations.length} Demo Blocks
          </span>
        </div>

        <CampusMap2D
          locations={filteredLocations}
          selectedLocation={selectedLocation}
          onSelectLocation={loc => setSelectedLocation(loc)}
        />
      </div>

      {/* Location Details Modal when node clicked */}
      <LocationDetailModal
        location={selectedLocation}
        onClose={() => setSelectedLocation(null)}
      />

      {/* What-If Digital Twin Simulation Engine Panel */}
      <SimulationControlPanel />

      {/* Buildings Quick Grid */}
      <div className="glass-panel rounded-2xl p-5 border border-white/10">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center space-x-1.5">
          <Building2 className="w-4 h-4 text-eco-green" />
          <span>All Monitored Campus Facilities</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {locations.map(loc => (
            <button
              key={loc.id}
              onClick={() => setSelectedLocation(loc)}
              className="p-3 rounded-xl bg-campus-darkest/60 border border-white/5 hover:border-eco-green/40 text-left transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-eco-cyan font-bold">
                  {loc.code}
                </span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    loc.status === 'optimal'
                      ? 'bg-eco-green'
                      : loc.status === 'warning'
                      ? 'bg-eco-amber'
                      : 'bg-eco-red animate-pulse'
                  }`}
                />
              </div>
              <p className="text-xs font-bold text-white mt-1 group-hover:text-eco-green transition-colors truncate">
                {loc.name}
              </p>
              <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>{loc.electricityKwh} kWh</span>
                <span>{loc.waterLitres} L</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Transparent Disclaimer */}
      <div className="p-3 rounded-xl bg-campus-card/50 border border-white/5 flex items-start space-x-2 text-[11px] text-slate-400">
        <Info className="w-4 h-4 text-eco-cyan flex-shrink-0 mt-0.5" />
        <p>
          <strong>Simulated Architecture Notice:</strong> Building coordinates and energy profiles represent prototype digital twin telemetry generated for hackathon benchmarking. Values calibrate continuously when linked to building automation protocols (BACnet/Modbus).
        </p>
      </div>

    </div>
  );
};
