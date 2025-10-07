import React from 'react';
import { styled } from '@mui/material/styles';

const H2 = styled('h2')(({ theme }) => ({
  fontFamily: theme.typography.h2.fontFamily,
  fontWeight: theme.typography.h2.fontWeight,
  fontSize: theme.typography.h2.fontSize,
  lineHeight: theme.typography.h2.lineHeight,
  letterSpacing: '0px',
  verticalAlign: 'middle',
  color: theme.palette.primary.main
  // leading-trim is not widely supported in CSS; if needed, use text-wrap or shape-trim in future specs
}));

export default H2;
