'use client';

import { createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#046EA7',
      contrastText: '#fff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: 'white',
          fontSize: '16px',
          borderRadius: '50px',
        },
        outlinedPrimary: {
          color: '#767676',
          border: '1px solid #136ea6',
          borderRadius: '50px',
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

    h1: { fontSize: '36px', lineHeight: '38px', fontWeight: 700 },
    h2: { fontSize: '36px', lineHeight: '38px', fontWeight: 400 },
    h3: { fontSize: '28px', lineHeight: '32px', fontWeight: 700 },
    h4: { fontSize: '24px', lineHeight: '22px', fontWeight: 400 },
    h5: { fontSize: '14px', lineHeight: '22px', fontWeight: 400 },
    h6: { fontSize: '12px', lineHeight: '18px', fontWeight: 400 },
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
