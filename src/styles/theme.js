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
      },
    },
  },
  main: {
    background: 'linear-gradient(150deg, #edb32a 10%, #fccec9 80%)',
    backgroundTransparent: 'rgba(240, 240, 245, 0.35)',
  },
  colors: {
    gold: '#edb32a',
    purple: '#fccec9',
  },
});
