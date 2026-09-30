import { Stack, Typography } from '@mui/material';
import { NumberField } from '../../components/NumberField';
import { SectionCard } from '../../components/SectionCard';
import { DEFAULT_SETTINGS, useCalculatorStore } from '../../store/useCalculatorStore';

export function CostSettingsPanel() {
  const settings = useCalculatorStore((state) => state.settings);
  const setSetting = useCalculatorStore((state) => state.setSetting);
  const resetSettings = useCalculatorStore((state) => state.resetSettings);

  return (
    <SectionCard
      title="Configuração de custos"
      subtitle="Estes valores ficam guardados automaticamente no dispositivo."
    >
      <Stack spacing={2.2}>
        <NumberField
          label="Custo da máquina por hora (€)"
          value={settings.machineCostPerHour}
          onChange={(value) => setSetting('machineCostPerHour', value)}
          min={0}
          step={0.1}
          endAdornment="€/h"
          error={settings.machineCostPerHour < 0 ? 'Introduz um valor válido.' : undefined}
        />
        <NumberField
          label="Preço do filamento (€ / kg)"
          value={settings.filamentPricePerKg}
          onChange={(value) => setSetting('filamentPricePerKg', value)}
          min={0}
          step={0.1}
          endAdornment="€/kg"
        />
        <Typography
          component="button"
          onClick={resetSettings}
          sx={{
            alignSelf: 'flex-start',
            border: 0,
            p: 0,
            background: 'none',
            color: 'primary.main',
            cursor: 'pointer',
            font: 'inherit',
            fontWeight: 700,
          }}
        >
          Repor valores predefinidos
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Predefinidos: máquina {DEFAULT_SETTINGS.machineCostPerHour.toFixed(2)} €/h · filamento {DEFAULT_SETTINGS.filamentPricePerKg.toFixed(2)} €/kg
        </Typography>
      </Stack>
    </SectionCard>
  );
}
