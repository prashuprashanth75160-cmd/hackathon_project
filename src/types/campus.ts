export type LocationStatus = 'optimal' | 'warning' | 'critical';

export interface CampusLocation {
  id: string;
  name: string;
  code: string;
  category: 'Academic' | 'Administrative' | 'Recreation' | 'Residential' | 'Utility';
  electricityKwh: number; // kWh/day
  waterLitres: number; // litres/day
  occupancy: number; // current headcount estimate
  maxCapacity: number;
  wasteKg: number; // kg/day
  wasteRecycledPct: number; // 0-100%
  status: LocationStatus;
  carbonKg: number; // kg CO2e/day
  mapCoordinates: { x: number; y: number }; // Percentage for 2D map
  activeAlerts: string[];
  recommendation: string;
  sensorHealth: 'Normal' | 'Calibrating' | 'Simulated Active';
}

export interface SustainabilityMetrics {
  totalElectricityKwh: number;
  totalWaterLitres: number;
  totalWasteKg: number;
  wasteRecycledPct: number;
  totalCarbonKg: number;
  sustainabilityScore: number; // 0 - 100
  activeIssuesCount: number;
  solarGenerationKwh: number;
}

export type IssueCategory = 
  | 'Water Leakage'
  | 'Lights Left ON'
  | 'AC Running Unnecessarily'
  | 'Overflowing Dustbin'
  | 'Poor Waste Segregation'
  | 'Excessive Resource Consumption';

export type IssuePriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type IssueStatus = 'Pending' | 'In Progress' | 'Resolved';

export interface SustainabilityIssue {
  id: string;
  category: IssueCategory;
  locationId: string;
  locationName: string;
  description: string;
  priority: IssuePriority;
  status: IssueStatus;
  reportedAt: string;
  resolvedAt?: string;
  imageUrl?: string;
  reporterName: string;
  estimatedWasteImpact: string;
}

export interface WasteAnalysisResult {
  id: string;
  timestamp: string;
  category: 'Plastic' | 'Paper' | 'Metal' | 'Glass' | 'Organic' | 'Hazardous';
  confidence: number; // 0 to 1
  materialDetected: string;
  binColor: 'Blue' | 'Green' | 'Yellow' | 'Red';
  binName: string;
  disposalRecommendation: string;
  recyclingInstructions: string[];
  carbonOffsetKg: number;
  imageUrl: string;
}

export interface SimulationParams {
  electricityOptimizationPct: number; // 0 to 40%
  lightingEfficiencyPct: number; // 0 to 50%
  occupancyAdjustmentPct: number; // -30% to +30%
  waterConservationPct: number; // 0 to 40%
  wasteSegregationPct: number; // 0 to 50%
}

export interface SimulationResult {
  baselineElectricity: number;
  simulatedElectricity: number;
  electricitySaved: number;
  baselineWater: number;
  simulatedWater: number;
  waterSaved: number;
  baselineCarbon: number;
  simulatedCarbon: number;
  carbonReduced: number;
  estimatedCostSavingsInr: number;
  newSustainabilityScore: number;
}

export interface LeaderboardEntry {
  id: string;
  locationName: string;
  department: string;
  rank: number;
  greenPoints: number;
  energyScore: number;
  waterScore: number;
  recyclingScore: number;
  trend: 'up' | 'down' | 'neutral';
  badges: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  structuredData?: {
    identifiedIssue?: string;
    recommendedActions?: string[];
    priority?: 'Low' | 'Medium' | 'High' | 'Immediate';
    environmentalBenefit?: string;
    estimatedSavings?: string;
  };
}
