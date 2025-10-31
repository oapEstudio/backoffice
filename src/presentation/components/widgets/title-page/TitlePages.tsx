import { styled } from '@mui/material/styles';
import React from 'react'

import type { ITitlePagesProp } from './ITitlePagesProp';

import H4 from '../../ui/H4/H4';

const WrapperTitle = styled('div')(({ theme }) => ({
  marginBottom: '0.5%',
  marginLeft: '1%',
  color: theme.palette.primary.main
}));

export const TitlePages: React.FC<ITitlePagesProp> = ({title, style}) => {
  return (
      <WrapperTitle>
              <H4 style={{margin:'0px',...style}}>{title}</H4>
        </WrapperTitle>
  )
}
