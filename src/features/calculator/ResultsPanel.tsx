import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import type { CalculationResult } from '../../types/calculator';

const euro = new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' });

function money(value: number): string {
  return euro.format(Number.isFinite(value) ? value : 0);
}

interface ResultsPanelProps {
  result: CalculationResult;
  saleEnabled: boolean;
}

export function ResultsPanel({ result, saleEnabled }: ResultsPanelProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.2, sm: 3 },
        height: '100%',
        borderRadius: 3,
        border: 1,
        borderColor: 'primary.main',
        bgcolor: 'background.paper',
      }}
    >
      <Stack spacing={2.3}>
        <Box>
          <Typography variant="overline" color="primary.main" fontWeight={800} letterSpacing="0.12em">
            RESULTADO
          </Typography>
          <Typography variant="h5" fontWeight={800}>
            Custo total
          </Typography>
          <Typography
            variant="h2"
            sx={{ mt: 0.25, fontSize: { xs: '2.25rem', sm: '3.2rem' }, lineHeight: 1.05 }}
          >
            {money(result.totalCost)}
          </Typography>
        </Box>

        <Stack spacing={1.15}>
          <CostRow label="Máquina" value={money(result.machineCost)} />
          <CostRow label="Filamento" value={money(result.filamentCostTotal)} />
          <CostRow label="Extras" value={money(result.extraCostTotal)} />
        </Stack>

        <Divider />

        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Produção
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            {result.printTimeHours > 0 ? formatDuration(result.printTimeHours) : 'Sem tempo definido'}
          </Typography>
        </Box>

        <Paper variant="outlined" sx={{ p: 1.75, borderRadius: 2.5 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Custo por peça
          </Typography>
          <Typography variant="h5" fontWeight={800}>
            {money(result.costPerPiece)}
          </Typography>
        </Paper>

        {saleEnabled ? (
          <Paper
            variant="outlined"
            sx={{
              p: 1.75,
              borderRadius: 2.5,
              borderColor: 'secondary.main',
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Preço de venda sugerido
            </Typography>
            <Typography variant="h5" fontWeight={800} color="secondary.main">
              {money(result.sellingPricePerPiece)} / peça
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Lucro: {money(result.profitPerPiece)} / peça · {money(result.profitTotal)} no total
            </Typography>
          </Paper>
        ) : null}
      </Stack>
    </Paper>
  );
}

function CostRow({ label, value }: { label: string; value: string }) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1" fontWeight={750}>
        {value}
      </Typography>
    </Stack>
  );
}

function formatDuration(totalHours: number): string {
  const totalMinutes = Math.round(totalHours * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes.toString().padStart(2, '0')}min de impressão`;
}
