
import { createTheme } from '@mui/material/styles';
import fonts from './fonts';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#007bff',
        },
        secondary: {
            main: '#6c757d',
        },
    },
    typography: {
        fontFamily: fonts.primaryMedium,
        h1: {
            fontWeight: 600,
            fontSize: '2.25rem',
            lineHeight: '2.75rem',
            fontFamily: fonts.primaryMedium,
        },
        h2: {
            fontWeight: 600,
            fontSize: '1.875rem',
            lineHeight: '2.25rem',
            fontFamily: fonts.primaryMedium,
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.5rem',
            lineHeight: '1.75rem',
            fontFamily: fonts.primaryMedium,
        },
        h4: {
            fontWeight: 600,
            fontSize: '1.3125rem',
            lineHeight: '1.6rem',
        },
        h5: {
            fontWeight: 600,
            fontSize: '1.125rem',
            lineHeight: '1.6rem',
        },
        h6: {
            fontWeight: 600,
            fontSize: '1rem',
            lineHeight: '1.2rem',
        },
        button: {
            textTransform: 'capitalize',
            fontWeight: 400,
        },
        body1: {
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: '1.334rem',
        },
        body2: {
            fontSize: '0.75rem',
            letterSpacing: '0rem',
            fontWeight: 400,
            lineHeight: '1rem',
        },
        subtitle1: {
            fontSize: '0.875rem',
            fontWeight: 400,
        },
        subtitle2: {
            fontSize: '0.875rem',
            fontWeight: 400,
        },
    }
});