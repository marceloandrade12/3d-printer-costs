import { Button, Stack, TextField } from '@mui/material';
import { NumberField } from '../../components/NumberField';
import { SectionCard } from '../../components/SectionCard';
import { DEFAULT_PRINT, useCalculatorStore } from '../../store/useCalculatorStore';

export function PrintInputPanel() {
  const print = useCalculatorStore((state) => state.print);
  const setPrintField = useCalculatorStore((state) => state.setPrintField);
  const resetPrint = useCalculatorStore((state) => state.resetPrint);

  return (
    <SectionCard title="Dados da impressão atual" subtitle="Valores específicos desta produção.">
      <Stack spacing={2.2}>
        <NumberField
          label="Quantidade de peças"
          value={print.quantity}
          onChange={(value) => setPrintField('quantity', Math.floor(value))}
          min={1}
          step={1}
          endAdornment="peças"
          error={print.quantity < 1 ? 'A quantidade deve ser pelo menos 1.' : undefined}
        />
        <NumberField
          label="Filamento utilizado por peça (g)"
          value={print.filamentGramsPerPiece}
          onChange={(value) => setPrintField('filamentGramsPerPiece', value)}
          min={0}
          step={0.1}
          endAdornment="g"
        />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <TextField
            label="Horas"
            type="number"
            value={print.hours}
            onChange={(event) => setPrintField('hours', Math.max(0, Math.floor(Number(event.target.value) || 0)))}
            inputProps={{ min: 0, step: 1, inputMode: 'numeric' }}
            helperText="Tempo total da impressão"
          />
          <TextField
            label="Minutos"
            type="number"
            value={print.minutes}
            onChange={(event) => setPrintField('minutes', Math.min(59, Math.max(0, Math.floor(Number(event.target.value) || 0))))}
            inputProps={{ min: 0, max: 59, step: 1, inputMode: 'numeric' }}
          />
        </Stack>
        <NumberField
          label="Custos adicionais (€ / peça)"
          value={print.extraCostPerPiece}
          onChange={(value) => setPrintField('extraCostPerPiece', value)}
          min={0}
          step={0.01}
          endAdornment="€"
          helperText={`Por defeito: ${DEFAULT_PRINT.extraCostPerPiece.toFixed(2)} € / peça`}
        />
        <Stack direction="row" justifyContent="flex-end">
          <Button variant="text" onClick={resetPrint} sx={{ px: 0.5 }}>
            Repor dados da impressão
          </Button>
        </Stack>
      </Stack>
    </SectionCard>
  );
}
