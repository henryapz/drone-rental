import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  pallete: {
    bg: '#fffffe',
    darkBg: '#d8eefe',
    text: '#5f6c7b',
    contrast: '#ef4565',
    darkBlue: '#094067',
    lightBlue: '#3da9fc',
  },
  typography: {
    main: ['Montserrat', 'Roboto', 'sans-serif'],
  },
});

export default theme;
