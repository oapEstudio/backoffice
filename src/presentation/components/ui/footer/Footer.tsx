import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { WhatsAppIcon } from '../icons'

const BlackText = styled('span')({
  fontWeight: 'bold',
})

const Today = new Date(Date.now());

export const Footer: React.FC = () => (
  <Box
    component="footer"
    sx={{
      position: 'relative',
      bottom: 0,
      left: 0,
      width: '100%',
      bgcolor: 'background.paper',
      //borderTop: '1px solid rgba(0, 0, 0, 0.12)',
       borderTop: 'none',
      p: 2,
      zIndex: (theme) => theme.zIndex.appBar,
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        // ancho y grosor de la línea "centrada"
        width: '30%',
        borderTop: `1px solid rgba(0,0,0,0.87)`,
      },
    }}
  >
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
        whiteSpace: 'nowrap',
      }}
    >
      <BlackText>© YPF {Today.getFullYear()}</BlackText>
      <span>|</span>
      <Box component="span">Términos y condiciones</Box>
      <span>|</span>
      <WhatsAppIcon />
    </Typography>
  </Box>
)

export default Footer
