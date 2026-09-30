import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Collapse, Divider, IconButton, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
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
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Paper
      elevation={0}
      sx={{
        height: { xs: '100%', md: '100%' },
        pb: { xs: 'env(safe-area-inset-bottom)', md: 0 },
        borderRadius: { xs: 0, md: 3 },
        border: 1,
        borderColor: 'primary.main',
        bgcolor: { xs: '#17132f', md: 'background.paper' },
        backgroundImage: 'none',
        color: { xs: 'primary.contrastText', md: 'text.primary' },
        boxShadow: { xs: '0 -4px 18px rgba(0, 0, 0, 0.12)', md: 'none' },
      }}
    >
      <Stack spacing={0}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 2, py: 1 }}>
          <Box>
            <Typography
              variant="overline"
              sx={{ color: { xs: 'rgba(255,255,255,0.76)', md: 'primary.main' } }}
              fontWeight={800}
              letterSpacing="0.12em"
            >
            RESULTADO
            </Typography>
            <Stack direction="row" spacing={1} alignItems="baseline">
              <Typography variant="body2" sx={{ color: { xs: 'rgba(255,255,255,0.76)', md: 'text.secondary' } }}>
                Custo total
              </Typography>
              <Typography variant="h6" fontWeight={800}>
                {money(result.totalCost)}
              </Typography>
            </Stack>
          </Box>
          <IconButton
            aria-label={expanded ? 'Ocultar detalhes do resultado' : 'Mostrar detalhes do resultado'}
            aria-expanded={!isMobile || expanded}
            aria-controls="results-details"
            onClick={() => setExpanded((value) => !value)}
            sx={{ display: { xs: 'inline-flex', md: 'none' }, color: 'inherit' }}
          >
            {expanded ? <ExpandMore /> : <ExpandLess />}
          </IconButton>
        </Stack>

        <Collapse in={!isMobile || expanded} timeout="auto" unmountOnExit>
          <Stack id="results-details" spacing={2.3} sx={{ p: { xs: 2, sm: 3 }, pt: 1 }}>
            <Stack spacing={1.15}>
              <CostRow label="Máquina" value={money(result.machineCost)} />
              <CostRow label="Filamento" value={money(result.filamentCostTotal)} />
              <CostRow label="Extras" value={money(result.extraCostTotal)} />
            </Stack>

            <Divider sx={{ borderColor: { xs: 'rgba(255,255,255,0.2)', md: 'divider' } }} />

            <Box>
              <Typography variant="subtitle2" sx={{ color: { xs: 'rgba(255,255,255,0.72)', md: 'text.secondary' } }}>
                Produção
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                {result.printTimeHours > 0 ? formatDuration(result.printTimeHours) : 'Sem tempo definido'}
              </Typography>
            </Box>

            <Paper
              variant="outlined"
              sx={{
                p: 1.75,
                borderRadius: 2.5,
                borderColor: { xs: 'rgba(255,255,255,0.22)', md: 'divider' },
                bgcolor: { xs: '#221d40', md: 'transparent' },
              }}
            >
              <Typography variant="subtitle2" sx={{ color: { xs: 'rgba(255,255,255,0.72)', md: 'text.secondary' } }}>
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
                  bgcolor: { xs: '#221d40', md: 'transparent' },
                }}
              >
                <Typography variant="subtitle2" sx={{ color: { xs: 'rgba(255,255,255,0.72)', md: 'text.secondary' } }}>
                  Preço de venda sugerido
                </Typography>
                <Typography variant="h5" fontWeight={800} color="secondary.main">
                  {money(result.sellingPricePerPiece)} / peça
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 0.5, color: { xs: 'rgba(255,255,255,0.72)', md: 'text.secondary' } }}
                >
                  Lucro: {money(result.profitPerPiece)} / peça · {money(result.profitTotal)} no total
                </Typography>
              </Paper>
            ) : null}
          </Stack>
        </Collapse>
      </Stack>
    </Paper>
  );
}

function CostRow({ label, value }: { label: string; value: string }) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="body2" sx={{ color: { xs: 'rgba(255,255,255,0.72)', md: 'text.secondary' } }}>
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
