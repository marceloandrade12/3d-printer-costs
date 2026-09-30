import { FormControlLabel, Stack, Switch, Typography } from '@mui/material';
import { NumberField } from '../../components/NumberField';
import { SectionCard } from '../../components/SectionCard';
import { useCalculatorStore } from '../../store/useCalculatorStore';

export function SalePanel() {
  const enabled = useCalculatorStore((state) => state.saleEnabled);
  const markup = useCalculatorStore((state) => state.settings.profitMarkupPercent);
  const setSaleEnabled = useCalculatorStore((state) => state.setSaleEnabled);
  const setSetting = useCalculatorStore((state) => state.setSetting);

  return (
    <SectionCard title="Preço de venda" subtitle="Opcional — usa um acréscimo sobre o custo total.">
      <Stack spacing={1.5}>
        <FormControlLabel
          control={<Switch checked={enabled} onChange={(event) => setSaleEnabled(event.target.checked)} />}
          label="Calcular preço de venda"
        />
        {enabled ? (
          <Stack spacing={1.25}>
            <NumberField
              label="Margem / acréscimo pretendido (%)"
              value={markup}
              onChange={(value) => setSetting('profitMarkupPercent', value)}
              min={0}
              step={1}
              endAdornment="%"
            />
            <Typography variant="caption" color="text.secondary">
              Ex.: 30% significa custo × 1,30.
            </Typography>
          </Stack>
        ) : null}
      </Stack>
    </SectionCard>
  );
}
