import React from 'react'
import Loading from '../../ui/loading'
import { styled } from '@mui/material/styles';


const StyleContentLoading = styled('div')(({ theme }) => ({
    position: 'fixed',
    inset: 0,
    width: '100vw',    
    height: '100vw',
    userSelect: 'none',
    zIndex: 9999,
    backgroundColor: 'rgb(0, 0, 0, 0.1)',
    paddingTop: '30%'    
}));
export const LoadingContainer = () => {
  return (
    <StyleContentLoading><center> <Loading /> </center></StyleContentLoading>
  )
}
