import React from 'react'
import Typography from '@mui/material/Typography'
import { CustomBox } from '../../ui/box/CustomBox'

interface IRedStripeProps{
    message: string
}
export const RedStripe: React.FC<IRedStripeProps> = ({message}) => {
  return (
    <CustomBox sx={{ bgcolor: "#FFD3D3", height: {xs: '100%',md: '56px', lg: '56px'}, display: "flex", alignItems: "center", px: 0 }}>
        <CustomBox sx={{ width: "100%", px: 4 }}>
          <Typography variant="body1" color='rgb(183, 0, 0)'><strong>Atención:  {message}</strong></Typography>
        </CustomBox>
    </CustomBox>
  )
}
