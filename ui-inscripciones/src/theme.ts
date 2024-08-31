import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      buttonWhiteText: string;
      buttonWhiteBorder: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      buttonWhiteText?: string;
      buttonWhiteBorder?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0b7077',
      dark: '#34495e',
      light: '#d2e6e4',
      contrastText: '#fff',
    },
    secondary: {
      main: '#fd661f',
    },
    background: {
      default: '#fffefe',
      paper: '#fefefe',
    },
    text: {
      primary: '#4D4D4D',
      secondary: '#696984',
    },
    custom: {
      buttonWhiteText: '#818C96',
      buttonWhiteBorder: '#C4C4C4',
    },
  },
  typography: {
    fontFamily: 'Raleway, system-ui, Avenir, Helvetica, Arial, sans-serif',
  },
});

export default theme;
