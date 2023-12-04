'use client';

import { createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1440,
    },
  },
  palette: {
    primary: {
      main: '#FFDE3C',
      contrastText: '#fff',
    },
    secondary: {
      main: '#FFF9DA',
      contrastText: '#821BE3',
    },
    grey: {
      '600': '#101010',
      '500': '#232323',
      '400': '#3A3A3A',
      '300': '#666666',
      '200': '#A9A9A9',
      '100': '#F1F1F1',
      '50': '#F0F0F0',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          boxShadow: 'none',
          color: '#625D44',
          fontSize: '16px',
        },
        containedSecondary: {
          boxShadow: 'none',
          color: 'black',
          backgroundColor: '#EDF0F3',
        },
        outlinedPrimary: {
          color: '#232323',
          border: '2px solid #E1E1E1',
        },
        outlinedSecondary: {
          color: '#232323',
          border: '2px solid red',
        },
        sizeLarge: {
          height: '48px',
          width: '400px',
        },
        sizeMedium: {
          height: '36px',
          width: '100%',
        },
        sizeSmall: {
          height: '24px',
          width: '200px',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontWeight: '500',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        colorPrimary: '#fff',
        colorSecondary: '#fff',
      },
    },
  },
  typography: {
    fontFamily: '"GmarketSansMedium", sans-serif',
    h1: {
      '@media (max-width:1200px)': {
        fontSize: '48px',
        lineHeight: '64px',
        fontWeight: 700,
      },
      '@media (max-width:640px)': {
        fontSize: '24px',
        lineHeight: '32px',
        fontWeight: 700,
      },
    },
    h2: {
      '@media (max-width:1200px)': {
        fontSize: '36px',
        lineHeight: '48px',
        fontWeight: 700,
      },
      '@media (max-width:640px)': {
        fontSize: '20px',
        lineHeight: '28px',
        fontWeight: 700,
      },
    },
    h3: {
      '@media (max-width:1200px)': {
        fontSize: '32px',
        lineHeight: '48px',
        fontWeight: 700,
      },
      '@media (max-width:640px)': {
        fontSize: '18px',
        lineHeight: '24px',
        fontWeight: 700,
      },
    },
    h4: {
      '@media (max-width:1200px)': {
        fontSize: '24px',
        lineHeight: '32px',
        fontWeight: 700,
      },
      '@media (max-width:640px)': {
        fontSize: '16px',
        lineHeight: '20px',
        fontWeight: 500,
      },
    },
    h5: {
      '@media (max-width:1200px)': {
        fontSize: '24px',
        lineHeight: '32px',
        fontWeight: 500,
      },
      '@media (max-width:640px)': {
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: 500,
      },
    },
    h6: {
      '@media (max-width:1200px)': {
        fontSize: '20px',
        lineHeight: '28px',
        fontWeight: 500,
      },
      '@media (max-width:640px)': {
        fontSize: '14px',
        lineHeight: '28px',
        fontWeight: 500,
      },
    },
    body1: {
      '@media (max-width:1200px)': {
        fontSize: '20px',
        lineHeight: '32px',
        fontWeight: 500,
      },
      '@media (max-width:640px)': {
        fontSize: '14px',
        lineHeight: '20px',
        fontWeight: 500,
      },
    },
    body2: {
      '@media (max-width:1200px)': {
        fontSize: '16px',
        lineHeight: '24px',
        fontWeight: 500,
      },
      '@media (max-width:640px)': {
        fontSize: '12px',
        lineHeight: '16px',
        fontWeight: 500,
      },
    },
  },
});

export default theme;

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: theme.palette.primary.main,
      light: theme.palette.primary.light,
      dark: theme.palette.primary.dark,
    },
    divider: grey[300],
    text: {
      primary: '#000',
      secondary: '#767676',
    },
    error: {
      main: '#eb5757',
    },
    grey: {
      '50': 'EDF0F3',
      '100': '#f2f2f2',
      '200': '#E0E0E0',
      '300': '#c4c4c4',
      '400': '#767676',
      '500': '#161A1E',
    },
    background: {
      default: '#fff',
    },
  },
  components: theme.components,
  typography: theme.typography,
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: theme.palette.primary,
    divider: grey[700],
    background: {
      default: grey[900],
      paper: grey[800],
    },
    text: {
      primary: '#fff',
      secondary: '#E0E0E0',
    },
    error: {
      main: '#eb5757',
    },
    grey: {
      '100': '#f2f2f2',
      '200': '#E0E0E0',
      '300': '#616161',
      '400': '#767676',
    },
  },
  components: theme.components,
  typography: theme.typography,
});
