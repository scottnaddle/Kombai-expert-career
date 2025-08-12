import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563EB',
      light: '#60A5FA',
      dark: '#1D4ED8',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#7C3AED',
      light: '#A78BFA',
      dark: '#5B21B6',
      contrastText: '#FFFFFF'
    },
    success: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
      contrastText: '#FFFFFF'
    },
    warning: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
      contrastText: '#FFFFFF'
    },
    info: {
      main: '#06B6D4',
      light: '#22D3EE',
      dark: '#0891B2',
      contrastText: '#FFFFFF'
    },
    text: {
      primary: '#1F2937',
      secondary: '#6B7280',
      disabled: '#9CA3AF'
    },
    background: {
      default: '#FAFBFC',
      paper: '#FFFFFF'
    },
    grey: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827'
    },
    divider: '#E5E7EB'
  },
  typography: {
    fontFamily: '"Inter", "Playfair Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em'
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: '2.5rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em'
    },
    h3: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '1.875rem',
      lineHeight: 1.4
    },
    h4: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4
    },
    h5: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.5
    },
    h6: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 500,
      fontSize: '1.125rem',
      lineHeight: 1.5
    },
    body1: {
      fontFamily: '"Inter", sans-serif',
      fontSize: '1rem',
      lineHeight: 1.6
    },
    body2: {
      fontFamily: '"Inter", sans-serif',
      fontSize: '0.875rem',
      lineHeight: 1.6
    },
    button: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 500,
      textTransform: 'none'
    }
  },
  shape: {
    borderRadius: 12
  },
  shadows: [
    'none',
    '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)',
    '0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)',
    '0px 10px 20px rgba(0, 0, 0, 0.19), 0px 6px 6px rgba(0, 0, 0, 0.23)',
    '0px 14px 28px rgba(0, 0, 0, 0.25), 0px 10px 10px rgba(0, 0, 0, 0.22)',
    '0px 19px 38px rgba(0, 0, 0, 0.30), 0px 15px 12px rgba(0, 0, 0, 0.22)',
    '0px 24px 48px rgba(0, 0, 0, 0.35), 0px 19px 19px rgba(0, 0, 0, 0.22)',
    '0px 30px 60px rgba(0, 0, 0, 0.40), 0px 24px 24px rgba(0, 0, 0, 0.22)',
    '0px 36px 72px rgba(0, 0, 0, 0.45), 0px 30px 30px rgba(0, 0, 0, 0.22)',
    '0px 42px 84px rgba(0, 0, 0, 0.50), 0px 36px 36px rgba(0, 0, 0, 0.22)',
    '0px 48px 96px rgba(0, 0, 0, 0.55), 0px 42px 42px rgba(0, 0, 0, 0.22)',
    '0px 54px 108px rgba(0, 0, 0, 0.60), 0px 48px 48px rgba(0, 0, 0, 0.22)',
    '0px 60px 120px rgba(0, 0, 0, 0.65), 0px 54px 54px rgba(0, 0, 0, 0.22)',
    '0px 66px 132px rgba(0, 0, 0, 0.70), 0px 60px 60px rgba(0, 0, 0, 0.22)',
    '0px 72px 144px rgba(0, 0, 0, 0.75), 0px 66px 66px rgba(0, 0, 0, 0.22)',
    '0px 78px 156px rgba(0, 0, 0, 0.80), 0px 72px 72px rgba(0, 0, 0, 0.22)',
    '0px 84px 168px rgba(0, 0, 0, 0.85), 0px 78px 78px rgba(0, 0, 0, 0.22)',
    '0px 90px 180px rgba(0, 0, 0, 0.90), 0px 84px 84px rgba(0, 0, 0, 0.22)',
    '0px 96px 192px rgba(0, 0, 0, 0.95), 0px 90px 90px rgba(0, 0, 0, 0.22)',
    '0px 102px 204px rgba(0, 0, 0, 1.00), 0px 96px 96px rgba(0, 0, 0, 0.22)',
    '0px 108px 216px rgba(0, 0, 0, 1.00), 0px 102px 102px rgba(0, 0, 0, 0.22)',
    '0px 114px 228px rgba(0, 0, 0, 1.00), 0px 108px 108px rgba(0, 0, 0, 0.22)',
    '0px 120px 240px rgba(0, 0, 0, 1.00), 0px 114px 114px rgba(0, 0, 0, 0.22)',
    '0px 126px 252px rgba(0, 0, 0, 1.00), 0px 120px 120px rgba(0, 0, 0, 0.22)',
    '0px 132px 264px rgba(0, 0, 0, 1.00), 0px 126px 126px rgba(0, 0, 0, 0.22)'
  ]
});

export default theme;