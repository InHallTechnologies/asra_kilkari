import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#FDB10D',
            contrastText: '#ffffff',  // white text on primary button
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none', // optional: to keep button text as typed
                },
            },
            defaultProps: {
                color: 'primary',
            },
        },
    },
});

export default theme;
