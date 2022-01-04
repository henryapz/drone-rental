import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const secondaryLight = '#fffffe';
const primaryDark = '#094067';

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        light: '#d8eefe',
        main: '#3da9fc',
        dark: primaryDark,
        contrastText: '#fff',
      },
      secondary: {
        light: secondaryLight,
        main: '#ef4565',
        dark: '#ba3750',
        contrastText: '#fff',
      },
    },
    typography: {
      fontFamily: ['Montserrat', 'Roboto', 'sans-serif'].join(','),
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: secondaryLight,
            color: primaryDark,
          },
        },
      },
      MuiContainer: {
        defaultProps: {
          maxWidth: 'lg',
        },
      },
    },
  }),
);

export default theme;
