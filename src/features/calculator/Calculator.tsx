import { Alert, Box, Container, Grid, Portal, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useCalculatorStore } from '../../store/useCalculatorStore';
import { calculateResult } from '../../utils/calculations';
import { CostSettingsPanel } from './CostSettingsPanel';
import { PrintInputPanel } from './PrintInputPanel';
import { ResultsPanel } from './ResultsPanel';
import { SalePanel } from './SalePanel';

export function Calculator() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const settings = useCalculatorStore((state) => state.settings);
  const print = useCalculatorStore((state) => state.print);
  const saleEnabled = useCalculatorStore((state) => state.saleEnabled);

  const isInvalid =
    !Number.isFinite(settings.machineCostPerHour) ||
    settings.machineCostPerHour < 0 ||
    !Number.isFinite(settings.filamentPricePerKg) ||
    settings.filamentPricePerKg < 0 ||
    !Number.isFinite(settings.profitMarkupPercent) ||
    settings.profitMarkupPercent < 0 ||
    !Number.isFinite(print.quantity) ||
    print.quantity < 1 ||
    !Number.isFinite(print.filamentGramsPerPiece) ||
    print.filamentGramsPerPiece < 0 ||
    !Number.isFinite(print.hours) ||
    print.hours < 0 ||
    !Number.isFinite(print.minutes) ||
    print.minutes < 0 ||
    print.minutes > 59 ||
    !Number.isFinite(print.extraCostPerPiece) ||
    print.extraCostPerPiece < 0;

  const result = isInvalid
    ? calculateResult(
        {
          machineCostPerHour: 0,
          filamentPricePerKg: 0,
          profitMarkupPercent: 0,
        },
        { quantity: 1, filamentGramsPerPiece: 0, hours: 0, minutes: 0, extraCostPerPiece: 0 },
      )
    : calculateResult(settings, print);

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        py: { xs: 2, sm: 4, md: 6 },
        pb: { xs: 'calc(64px + env(safe-area-inset-bottom))', sm: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={{ xs: 2.5, md: 3.5 }}>
          <Box>
            <Typography variant="h3" sx={{ fontSize: { xs: '2rem', sm: '2.7rem', md: '3.3rem' } }}>
              Calculadora de Custos 3D
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 720 }}>
              Descobre quanto custa realmente produzir uma peça — e, opcionalmente, calcula um preço de venda com o acréscimo que definires.
            </Typography>
          </Box>

          {isInvalid ? (
            <Alert severity="error" variant="outlined">
              Corrige os valores inválidos para obter um resultado fiável. Não são permitidos números negativos, zero peças ou valores não numéricos.
            </Alert>
          ) : null}

          <Grid container spacing={{ xs: 2, md: 2.5 }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Stack spacing={{ xs: 2, md: 2.5 }}>
                <CostSettingsPanel />
                <PrintInputPanel />
                <SalePanel />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box sx={{ position: 'sticky', top: 24 }}>
                <ResultsPanel result={result} saleEnabled={saleEnabled && !isInvalid} />
              </Box>
            </Grid>
          </Grid>
        </Stack>
      </Container>
      {isMobile ? (
        <Portal>
          <Box
            sx={{
              position: 'fixed',
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: theme.zIndex.modal,
              maxHeight: '55dvh',
              overflowY: 'auto',
              bgcolor: '#17132f',
              isolation: 'isolate',
            }}
          >
            <ResultsPanel result={result} saleEnabled={saleEnabled && !isInvalid} />
          </Box>
        </Portal>
      ) : null}
    </Box>
  );
}
