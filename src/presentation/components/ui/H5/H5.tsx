import React from 'react';
import { styled } from '@mui/material/styles';

const H5 = styled('h5')(({ theme }) => ({
        fontFamily: theme.typography.h5.fontFamily,
        fontWeight: theme.typography.h5.fontWeight,
        fontSize: theme.typography.h5.fontSize,
        lineHeight: theme.typography.h5.lineHeight,          
}));

export default H5;
