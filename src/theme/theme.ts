import { createTheme } from '@mui/material/styles';
import type { ThemeMode } from '../types/calculator';

export const buildTheme = (mode: ThemeMode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: mode === 'dark' ? '#8b5cf6' : '#6d28d9' },
      secondary: { main: mode === 'dark' ? '#22c55e' : '#16a34a' },
      background:
        mode === 'dark'
          ? { default: '#0b1120', paper: '#111827' }
          : { default: '#f5f7fb', paper: '#ffffff' },
    },
    shape: { borderRadius: 18 },
    typography: {
      fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      h1: { fontWeight: 800, letterSpacing: '-0.03em' },
      h2: { fontWeight: 800, letterSpacing: '-0.02em' },
      h3: { fontWeight: 750 },
      h4: { fontWeight: 800 },
      button: { textTransform: 'none', fontWeight: 700 },
    },
    components: {
      MuiTextField: {
        defaultProps: { size: 'small', fullWidth: true },
      },
      MuiCard: {
        styleOverrides: {
          root: { backgroundImage: 'none' },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none' },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
      },
      MuiDivider: {
        styleOverrides: { root: { opacity: 0.7 } },
      },
    },
  });
