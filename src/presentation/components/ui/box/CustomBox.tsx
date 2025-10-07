import React from 'react'
import Box, { type BoxProps } from '@mui/material/Box'

export const CustomBox: React.FC<any> = ({ children, ...rest }) => {
  return <Box {...rest}>{children}</Box>
}