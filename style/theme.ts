'use client';

import { createTheme, useMediaQuery, useTheme } from '@mui/material';
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
      main: '#67309B',
      contrastText: '#fff',
    },
    secondary: {
      main: '#D5B6F2',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: 'white',
          fontSize: '16px',
        },
        containedSecondary: {
          color: 'black',
          backgroundColor: '#EDF0F3',
        },
        outlinedPrimary: {
          color: '#767676',
          border: '1px solid #136ea6',
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
    // MuiOutlinedInput: {
    //   styleOverrides: {
    //     notchedOutline: {
    //       borderColor: 'red'
    //     }
    //   }
    // },
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
        fontSize: '14px',
        lineHeight: '38px',
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
        lineHeight: '38px',
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
        lineHeight: '38px',
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
      '100': '#f2f2f2',
      '200': '#E0E0E0',
      '300': '#c4c4c4',
      '400': '#767676',
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
