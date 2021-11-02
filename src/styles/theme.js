import { createTheme } from '@mui/material/styles';

export const COLORS = {
  GOLD: '#edb32a',
  PURPLE: '#fccec9',
  LIGHT_GREY: 'rgba(251,242,223,0.75)',
  LIGHT_GREY_SECONDARY: 'rgba(255,245,255,0.4)',
  SILVER: 'silver',
  GREY: 'grey',
  WHITE: 'white',
  SECONDARY_BLACK: '#333333',
  ERROR: '#d32f2f',
  SUCCESS: '#28a745',
  BLUE: '#1976d2',
};

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  components: {
    MuiCircularProgress: {
      styleOverrides: {
        colorPrimary: {
          color: COLORS.GOLD,
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginTop: '-20px',
          marginLeft: '-20px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          color: COLORS.SECONDARY_BLACK,
        },
        contained: {
          border: 'none',
          boxShadow: 'none',
          color: COLORS.WHITE,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: COLORS.GOLD,
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          padding: 6,
        },
      },
    },
  },
  backgrounds: {
    mainBackground: `linear-gradient(150deg, ${COLORS.GOLD} 10%, ${COLORS.PURPLE} 80%)`,
    backgroundTransparent: COLORS.LIGHT_GREY_SECONDARY,
  },
  colors: {
    gold: COLORS.GOLD,
    purple: COLORS.PURPLE,
    grey: COLORS.GREY,
    lightGrey: COLORS.LIGHT_GREY,
    lightGreySecondary: COLORS.LIGHT_GREY_SECONDARY,
    silver: COLORS.SILVER,
    white: COLORS.WHITE,
    secondaryBlack: COLORS.SECONDARY_BLACK,
    error: COLORS.ERROR,
    success: COLORS.SUCCESS,
  },
  fontSize: {
    h1: '32px',
    h2: '26px',
    h3: '20px',
    normal: '16px',
    small: '14px',
    smallest: '12px',
  },
  borderRadius: {
    none: '0',
    small: '5px',
    medium: '12px',
  },
});
