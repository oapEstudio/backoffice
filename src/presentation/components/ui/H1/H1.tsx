import React from 'react'

import { styled } from '@mui/material/styles';

const H1 = styled('h1')(({ theme }) => ({
  fontFamily: theme.typography.h1.fontFamily,
  fontWeight: theme.typography.h1.fontWeight,
  fontSize: theme.typography.h1.fontSize,
  lineHeight: theme.typography.h1.lineHeight,
  letterSpacing: '0px',
  verticalAlign: 'middle',
  color: theme.palette.primary.main
  // leading-trim is not widely supported in CSS; if needed, use text-wrap or shape-trim in future specs
}));

export default H1;
