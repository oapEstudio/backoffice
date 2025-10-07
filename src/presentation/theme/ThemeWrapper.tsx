import React from 'react';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';
import { backofficetheme } from './backofficetheme';

const ThemeWrapper: React.FC<any> = ({children})=>{
    
     const theme = backofficetheme;

    return (
        <ThemeProvider theme={theme}>
             <CssBaseline />
            {children}
        </ThemeProvider>
    );
};


export default ThemeWrapper;