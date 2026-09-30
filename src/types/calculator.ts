export interface CostSettings {
  machineCostPerHour: number;
  filamentPricePerKg: number;
  extraCostPerPiece: number;
  profitMarkupPercent: number;
}

export interface PrintData {
  quantity: number;
  filamentGramsPerPiece: number;
  hours: number;
  minutes: number;
  extraCostPerPiece: number;
}

export interface CalculationResult {
  printTimeHours: number;
  machineCost: number;
  filamentCostPerPiece: number;
  filamentCostTotal: number;
  extraCostTotal: number;
  totalCost: number;
  costPerPiece: number;
  sellingPriceTotal: number;
  sellingPricePerPiece: number;
  profitTotal: number;
  profitPerPiece: number;
}

export type ThemeMode = 'light' | 'dark';
