import React from 'react';
import { styled } from '@mui/material/styles';

const H4 = styled('h4')(({ theme }) => ({
        fontFamily: theme.typography.h4.fontFamily,
        fontWeight: theme.typography.h4.fontWeight,
        fontSize: theme.typography.h4.fontSize,
        lineHeight: theme.typography.h4.lineHeight,
        letterSpacing: '0px',
        verticalAlign: 'middle',
       
        marginTop: '1rem',    
        paddingBottom: 0,  // elimina el padding inferior
        marginBottom: 0,
     
  // Note: leading-trim is not yet widely supported in browsers
}));

export default H4;
