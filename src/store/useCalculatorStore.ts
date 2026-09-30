import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CostSettings, PrintData, ThemeMode } from '../types/calculator';

export const DEFAULT_SETTINGS: CostSettings = {
  machineCostPerHour: 0.30,
  filamentPricePerKg: 20,
  profitMarkupPercent: 30,
};

export const DEFAULT_PRINT: PrintData = {
  quantity: 1,
  filamentGramsPerPiece: 25,
  hours: 0,
  minutes: 30,
  extraCostPerPiece: 0,
};

interface CalculatorState {
  settings: CostSettings;
  print: PrintData;
  saleEnabled: boolean;
  theme: ThemeMode;
  setSetting: <K extends keyof CostSettings>(key: K, value: CostSettings[K]) => void;
  setPrintField: <K extends keyof PrintData>(key: K, value: PrintData[K]) => void;
  setSaleEnabled: (enabled: boolean) => void;
  setTheme: (theme: ThemeMode) => void;
  resetSettings: () => void;
  resetPrint: () => void;
}

export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set) => ({
      settings: DEFAULT_SETTINGS,
      print: DEFAULT_PRINT,
      saleEnabled: true,
      theme: 'dark',
      setSetting: (key, value) => set((state) => ({ settings: { ...state.settings, [key]: value } })),
      setPrintField: (key, value) => set((state) => ({ print: { ...state.print, [key]: value } })),
      setSaleEnabled: (enabled) => set({ saleEnabled: enabled }),
      setTheme: (theme) => set({ theme }),
      resetSettings: () => set({ settings: DEFAULT_SETTINGS }),
      resetPrint: () => set({ print: DEFAULT_PRINT }),
    }),
    {
      name: '3d-cost-calculator',
      partialize: (state) => ({
        settings: state.settings,
        theme: state.theme,
      }),
    },
  ),
);
