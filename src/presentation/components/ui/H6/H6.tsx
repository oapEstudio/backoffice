import React from 'react';
import { styled } from '@mui/material/styles';

const H6 = styled('h6')(({ theme }) => ({
        fontFamily: theme.typography.h6.fontFamily,
        fontWeight: theme.typography.h6.fontWeight,
        fontSize: theme.typography.h6.fontSize,
        lineHeight: theme.typography.h6.lineHeight,          
}));

export default H6;
