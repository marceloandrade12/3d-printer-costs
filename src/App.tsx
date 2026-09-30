import { CssBaseline, IconButton, Stack, ThemeProvider, Tooltip } from '@mui/material';
import LightModeRounded from '@mui/icons-material/LightModeRounded';
import DarkModeRounded from '@mui/icons-material/DarkModeRounded';
import { Calculator } from './features/calculator/Calculator';
import { buildTheme } from './theme/theme';
import { useCalculatorStore } from './store/useCalculatorStore';

export default function App() {
  const themeMode = useCalculatorStore((state) => state.theme);
  const setTheme = useCalculatorStore((state) => state.setTheme);
  const theme = buildTheme(themeMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack direction="row" justifyContent="flex-end" sx={{ position: 'fixed', zIndex: 10, top: 12, right: 12 }}>
        <Tooltip title={themeMode === 'dark' ? 'Mudar para light mode' : 'Mudar para dark mode'}>
          <IconButton
            aria-label="Alternar tema"
            onClick={() => setTheme(themeMode === 'dark' ? 'light' : 'dark')}
            sx={{
              bgcolor: 'background.paper',
              border: 1,
              borderColor: 'divider',
              boxShadow: 2,
              '&:hover': { bgcolor: 'background.paper' },
            }}
          >
            {themeMode === 'dark' ? <LightModeRounded /> : <DarkModeRounded />}
          </IconButton>
        </Tooltip>
      </Stack>
      <Calculator />
    </ThemeProvider>
  );
}
