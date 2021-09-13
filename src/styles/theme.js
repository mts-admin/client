import { createTheme } from '@material-ui/core/styles';

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
  overrides: {
    MuiCircularProgress: {
      colorPrimary: {
        color: '#edb32a',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-20px',
        marginLeft: '-20px',
      },
    },
    MuiButton: {
      root: {
        borderRadius: 12,
      },
      outlined: {
        borderColor: '#edb32a',
      },
      contained: {
        backgroundColor: 'rgba(251,242,223,0.75)',
        border: 'none',
        boxShadow: 'none',
      },
    },
    MuiTabs: {
      indicator: {
        backgroundColor: '#edb32a',
      },
    },
  },
  backgrounds: {
    background: 'linear-gradient(150deg, #edb32a 10%, #fccec9 80%)',
    backgroundTransparent: 'rgba(255,245,255,0.4)',
  },
  colors: {
    gold: '#edb32a',
    purple: '#fccec9',
    lightGrey: 'rgba(251,242,223,0.75)',
  },
  fontSize: {
    h1: '32px',
    h2: '26px',
    small: '14px',
    normal: '16px',
  },
});
