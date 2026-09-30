import type { CalculationResult, CostSettings, PrintData } from '../types/calculator';

export function calculateMachineCost(timeHours: number, costPerHour: number): number {
  return timeHours * costPerHour;
}

export function calculateFilamentCost(grams: number, pricePerKg: number): number {
  return (grams / 1000) * pricePerKg;
}

export function calculateExtraCost(extraPerPiece: number, quantity: number): number {
  return extraPerPiece * quantity;
}

export function calculateTotalCost(machineCost: number, filamentTotal: number, extrasTotal: number): number {
  return machineCost + filamentTotal + extrasTotal;
}

export function calculateSellingPrice(totalCost: number, markupPercent: number): number {
  return totalCost * (1 + markupPercent / 100);
}

export function calculateResult(settings: CostSettings, print: PrintData): CalculationResult {
  const printTimeHours = print.hours + print.minutes / 60;
  const machineCost = calculateMachineCost(printTimeHours, settings.machineCostPerHour);
  const filamentCostPerPiece = calculateFilamentCost(
    print.filamentGramsPerPiece,
    settings.filamentPricePerKg,
  );
  const filamentCostTotal = filamentCostPerPiece * print.quantity;
  const extraCostTotal = calculateExtraCost(print.extraCostPerPiece, print.quantity);
  const totalCost = calculateTotalCost(machineCost, filamentCostTotal, extraCostTotal);
  const costPerPiece = totalCost / print.quantity;
  const sellingPriceTotal = calculateSellingPrice(totalCost, settings.profitMarkupPercent);
  const sellingPricePerPiece = sellingPriceTotal / print.quantity;
  const profitTotal = sellingPriceTotal - totalCost;
  const profitPerPiece = sellingPricePerPiece - costPerPiece;

  return {
    printTimeHours,
    machineCost,
    filamentCostPerPiece,
    filamentCostTotal,
    extraCostTotal,
    totalCost,
    costPerPiece,
    sellingPriceTotal,
    sellingPricePerPiece,
    profitTotal,
    profitPerPiece,
  };
}
