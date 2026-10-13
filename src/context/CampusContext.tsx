import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  CampusLocation,
  SustainabilityMetrics,
  SustainabilityIssue,
  WasteAnalysisResult,
  SimulationParams,
  SimulationResult,
  LeaderboardEntry,
  IssueStatus,
} from '../types/campus';
import {
  INITIAL_LOCATIONS,
  INITIAL_ISSUES,
  INITIAL_LEADERBOARD,
} from '../data/mockCampusData';

interface CampusContextType {
  locations: CampusLocation[];
  selectedLocation: CampusLocation | null;
  setSelectedLocation: (location: CampusLocation | null) => void;
  metrics: SustainabilityMetrics;
  issues: SustainabilityIssue[];
  addIssue: (issue: Omit<SustainabilityIssue, 'id' | 'reportedAt'>) => void;
  updateIssueStatus: (id: string, status: IssueStatus) => void;
  wasteHistory: WasteAnalysisResult[];
  addWasteScan: (scan: WasteAnalysisResult) => void;
  simulationParams: SimulationParams;
  setSimulationParams: React.Dispatch<React.SetStateAction<SimulationParams>>;
  simulationResult: SimulationResult;
  isJudgeScenarioActive: boolean;
  toggleJudgeScenario: () => void;
  resetAllDemoData: () => void;
  leaderboard: LeaderboardEntry[];
  runGreenChallenge: () => void;
  selectedCampusCampusName: string;
  setSelectedCampusName: (name: string) => void;
  currentDateFilter: 'Today' | 'This Week' | 'This Month';
  setCurrentDateFilter: (filter: 'Today' | 'This Week' | 'This Month') => void;
}

const DEFAULT_SIMULATION_PARAMS: SimulationParams = {
  electricityOptimizationPct: 0,
  lightingEfficiencyPct: 0,
  occupancyAdjustmentPct: 0,
  waterConservationPct: 0,
  wasteSegregationPct: 0,
};

const CampusContext = createContext<CampusContextType | undefined>(undefined);

export const CampusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCampusCampusName, setSelectedCampusName] = useState('DSU Main Campus — Kudlu Gate / Harohalli');
  const [currentDateFilter, setCurrentDateFilter] = useState<'Today' | 'This Week' | 'This Month'>('Today');

  // Load from localStorage or defaults
  const [locations, setLocations] = useState<CampusLocation[]>(() => {
    const saved = localStorage.getItem('ecocampus_locations');
    return saved ? JSON.parse(saved) : INITIAL_LOCATIONS;
  });

  const [selectedLocation, setSelectedLocation] = useState<CampusLocation | null>(null);

  const [issues, setIssues] = useState<SustainabilityIssue[]>(() => {
    const saved = localStorage.getItem('ecocampus_issues');
    return saved ? JSON.parse(saved) : INITIAL_ISSUES;
  });

  const [wasteHistory, setWasteHistory] = useState<WasteAnalysisResult[]>(() => {
    const saved = localStorage.getItem('ecocampus_waste_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() => {
    const saved = localStorage.getItem('ecocampus_leaderboard');
    return saved ? JSON.parse(saved) : INITIAL_LEADERBOARD;
  });

  const [simulationParams, setSimulationParams] = useState<SimulationParams>(DEFAULT_SIMULATION_PARAMS);
  const [isJudgeScenarioActive, setIsJudgeScenarioActive] = useState<boolean>(false);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('ecocampus_locations', JSON.stringify(locations));
  }, [locations]);

  useEffect(() => {
    localStorage.setItem('ecocampus_issues', JSON.stringify(issues));
  }, [issues]);

  useEffect(() => {
    localStorage.setItem('ecocampus_waste_history', JSON.stringify(wasteHistory));
  }, [wasteHistory]);

  useEffect(() => {
    localStorage.setItem('ecocampus_leaderboard', JSON.stringify(leaderboard));
  }, [leaderboard]);

  // Dynamic simulation calculations
  const simulationResult = useMemo<SimulationResult>(() => {
    const baselineElectricity = locations.reduce((sum, loc) => sum + loc.electricityKwh, 0);
    const baselineWater = locations.reduce((sum, loc) => sum + loc.waterLitres, 0);
    const baselineCarbon = locations.reduce((sum, loc) => sum + loc.carbonKg, 0);

    // Compound efficiency effect
    const elecFraction = 
      (simulationParams.electricityOptimizationPct / 100) * 0.65 +
      (simulationParams.lightingEfficiencyPct / 100) * 0.25 +
      Math.max(0, -simulationParams.occupancyAdjustmentPct / 100) * 0.10;

    const electricitySaved = Math.round(baselineElectricity * Math.min(elecFraction, 0.45));
    const simulatedElectricity = Math.max(0, baselineElectricity - electricitySaved);

    const waterFraction = 
      (simulationParams.waterConservationPct / 100) * 0.80 +
      Math.max(0, -simulationParams.occupancyAdjustmentPct / 100) * 0.20;

    const waterSaved = Math.round(baselineWater * Math.min(waterFraction, 0.45));
    const simulatedWater = Math.max(0, baselineWater - waterSaved);

    // Carbon reduction assumptions: 0.82 kg CO2 per kWh grid electricity in India, 0.00035 kg per litre water
    const carbonReduced = Math.round(
      electricitySaved * 0.82 + 
      waterSaved * 0.00035 + 
      (simulationParams.wasteSegregationPct * 2.1)
    );
    const simulatedCarbon = Math.max(0, Math.round(baselineCarbon - carbonReduced));

    // Commercial tariffs in Bengaluru: ~Rs 8.20/kWh, Rs 0.065 per L water
    const estimatedCostSavingsInr = Math.round((electricitySaved * 8.2) + (waterSaved * 0.065));

    // Dynamic sustainability score calculation
    const efficiencyBoost = (electricitySaved / (baselineElectricity || 1)) * 30 + (waterSaved / (baselineWater || 1)) * 25;
    const newSustainabilityScore = Math.min(99, Math.round(76 + efficiencyBoost));

    return {
      baselineElectricity,
      simulatedElectricity,
      electricitySaved,
      baselineWater,
      simulatedWater,
      waterSaved,
      baselineCarbon,
      simulatedCarbon,
      carbonReduced,
      estimatedCostSavingsInr,
      newSustainabilityScore,
    };
  }, [locations, simulationParams]);

  // Overall metrics
  const metrics = useMemo<SustainabilityMetrics>(() => {
    const isSimulated = simulationResult.electricitySaved > 0;
    const totalElectricityKwh = isSimulated ? simulationResult.simulatedElectricity : locations.reduce((acc, loc) => acc + loc.electricityKwh, 0);
    const totalWaterLitres = isSimulated ? simulationResult.simulatedWater : locations.reduce((acc, loc) => acc + loc.waterLitres, 0);
    const totalWasteKg = locations.reduce((acc, loc) => acc + loc.wasteKg, 0);
    const avgRecycled = Math.round(locations.reduce((acc, loc) => acc + loc.wasteRecycledPct, 0) / (locations.length || 1));
    const totalCarbonKg = isSimulated ? simulationResult.simulatedCarbon : locations.reduce((acc, loc) => acc + loc.carbonKg, 0);
    const sustainabilityScore = isSimulated ? simulationResult.newSustainabilityScore : 78;
    const activeIssuesCount = issues.filter(i => i.status !== 'Resolved').length;

    return {
      totalElectricityKwh,
      totalWaterLitres,
      totalWasteKg,
      wasteRecycledPct: isJudgeScenarioActive ? Math.min(95, avgRecycled + 16) : avgRecycled,
      totalCarbonKg,
      sustainabilityScore,
      activeIssuesCount,
      solarGenerationKwh: 345, // rooftop solar telemetry
    };
  }, [locations, simulationResult, issues, isJudgeScenarioActive]);

  // Add issue
  const addIssue = (newIssue: Omit<SustainabilityIssue, 'id' | 'reportedAt'>) => {
    const issueWithId: SustainabilityIssue = {
      ...newIssue,
      id: `iss-${Date.now().toString().slice(-4)}`,
      reportedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };
    setIssues(prev => [issueWithId, ...prev]);
  };

  // Update issue status
  const updateIssueStatus = (id: string, status: IssueStatus) => {
    setIssues(prev =>
      prev.map(issue => {
        if (issue.id === id) {
          return {
            ...issue,
            status,
            resolvedAt: status === 'Resolved' ? new Date().toISOString().replace('T', ' ').slice(0, 16) : undefined,
          };
        }
        return issue;
      })
    );
  };

  // Add waste scan to history
  const addWasteScan = (scan: WasteAnalysisResult) => {
    setWasteHistory(prev => [scan, ...prev].slice(0, 30));
  };

  // Toggle Judge 1-Click Scenario
  const toggleJudgeScenario = () => {
    if (!isJudgeScenarioActive) {
      // Activate Hackathon 15% Energy Cut & Smart Water Reduction
      setSimulationParams({
        electricityOptimizationPct: 15,
        lightingEfficiencyPct: 22,
        occupancyAdjustmentPct: 0,
        waterConservationPct: 18,
        wasteSegregationPct: 25,
      });

      // Update locations status
      setLocations(prev =>
        prev.map(loc => {
          if (loc.id === 'loc-academic') {
            return {
              ...loc,
              status: 'optimal',
              electricityKwh: 289, // 15% drop from 340
              activeAlerts: ['Smart lighting timetable applied across lecture halls'],
            };
          }
          if (loc.id === 'loc-canteen') {
            return {
              ...loc,
              status: 'warning',
              waterLitres: 6200, // Reduced from 7600
              wasteRecycledPct: 65, // Boosted segregation
              activeAlerts: ['Aerator valve retrofitted on secondary wash basin'],
            };
          }
          return loc;
        })
      );
      setIsJudgeScenarioActive(true);
    } else {
      // Revert back
      setSimulationParams(DEFAULT_SIMULATION_PARAMS);
      setLocations(INITIAL_LOCATIONS);
      setIsJudgeScenarioActive(false);
    }
  };

  // Reset all demo data
  const resetAllDemoData = () => {
    localStorage.removeItem('ecocampus_locations');
    localStorage.removeItem('ecocampus_issues');
    localStorage.removeItem('ecocampus_waste_history');
    localStorage.removeItem('ecocampus_leaderboard');
    setLocations(INITIAL_LOCATIONS);
    setIssues(INITIAL_ISSUES);
    setWasteHistory([]);
    setLeaderboard(INITIAL_LEADERBOARD);
    setSimulationParams(DEFAULT_SIMULATION_PARAMS);
    setIsJudgeScenarioActive(false);
    setSelectedLocation(null);
  };

  // Green Challenge execution
  const runGreenChallenge = () => {
    setLeaderboard(prev =>
      prev.map(item => {
        const bonus = Math.floor(Math.random() * 45) + 20;
        return {
          ...item,
          greenPoints: item.greenPoints + bonus,
          energyScore: Math.min(99, item.energyScore + 2),
          waterScore: Math.min(99, item.waterScore + 2),
          recyclingScore: Math.min(99, item.recyclingScore + 3),
          trend: 'up' as const,
        };
      }).sort((a, b) => b.greenPoints - a.greenPoints).map((item, index) => ({ ...item, rank: index + 1 }))
    );
  };

  return (
    <CampusContext.Provider
      value={{
        locations,
        selectedLocation,
        setSelectedLocation,
        metrics,
        issues,
        addIssue,
        updateIssueStatus,
        wasteHistory,
        addWasteScan,
        simulationParams,
        setSimulationParams,
        simulationResult,
        isJudgeScenarioActive,
        toggleJudgeScenario,
        resetAllDemoData,
        leaderboard,
        runGreenChallenge,
        selectedCampusCampusName,
        setSelectedCampusName,
        currentDateFilter,
        setCurrentDateFilter,
      }}
    >
      {children}
    </CampusContext.Provider>
  );
};

export const useCampus = (): CampusContextType => {
  const context = useContext(CampusContext);
  if (!context) {
    throw new Error('useCampus must be used within a CampusProvider');
  }
  return context;
};
