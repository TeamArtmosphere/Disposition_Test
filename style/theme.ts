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
      desktop: 1200,
    },
  },
  palette: {
    primary: {
      main: '#FFDE3C',
      contrastText: '#fff',
    },
    secondary: {
      main: '#FFF9DA',
    },
    grey: {
      '500': '#212325',
      '400': '#333639',
      '300': '#5C6471',
      '200': '#8B93A6',
      '100': '#C9CDD6',
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
          color: '#8B93A6',
          border: '1px solid #FFDE3B',
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
        fontSize: '72px',
        lineHeight: '94px',
        fontWeight: 700,
      },
      '@media (max-width:640px)': {
        fontSize: '24px',
        lineHeight: '38px',
        fontWeight: 700,
      },
    },
    h2: {
      '@media (max-width:1200px)': {
        fontSize: '64px',
        lineHeight: '90px',
        fontWeight: 700,
      },
      '@media (max-width:640px)': {
        fontSize: '24px',
        lineHeight: '38px',
        fontWeight: 700,
      },
    },
    h3: {
      '@media (max-width:1200px)': {
        fontSize: '48px',
        lineHeight: '62px',
        fontWeight: 700,
      },
      '@media (max-width:640px)': {
        fontSize: '20px',
        lineHeight: '26px',
        fontWeight: 700,
      },
    },
    h4: {
      '@media (max-width:1200px)': {
        fontSize: '36px',
        lineHeight: '47px',
        fontWeight: 700,
      },
      '@media (max-width:640px)': {
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: 700,
      },
    },
    h5: {
      '@media (max-width:1200px)': {
        fontSize: '24px',
        lineHeight: '31px',
        fontWeight: 700,
      },
      '@media (max-width:640px)': {
        fontSize: '14px',
        lineHeight: '20px',
        fontWeight: 700,
      },
    },
    h6: { fontSize: '12px', lineHeight: '18px', fontWeight: 400 },
    body1: {
      '@media (max-width:1200px)': {
        fontSize: '24px',
        lineHeight: '31px',
        fontWeight: 700,
      },
      '@media (max-width:640px)': {
        fontSize: '14px',
        lineHeight: '38px',
        fontWeight: 700,
      },
    },
    body2: {
      '@media (max-width:1200px)': {
        fontSize: '24px',
        fontWeight: 700,
      },
      '@media (max-width:640px)': {
        fontSize: '12px',
        fontWeight: 700,
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
