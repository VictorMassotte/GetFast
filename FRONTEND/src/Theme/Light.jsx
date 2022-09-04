import { createTheme } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#758bfd',
      light: '#aeb8fe',
      dark: '#27187e',
    },
    secondary: {
      main: '#FF961F',
    },
  },
  typography: {
    fontFamily: [
      'GTAmerica',
      'serif',
    ].join(','),
  },
  components: {
    // Name of the component
    MuiCard: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.2)",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          '&[disabled]': {
            pointerEvents: 'none',
          },
        },
      },
    },

  
  },

  
})

export default theme