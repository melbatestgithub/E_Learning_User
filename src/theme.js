// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Verdana',
  },
  palette: {
    primary: {
      main: '#7D7C7C',
      button:'#0077b6',
      hover:'#00b4d8'
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

export default theme;
