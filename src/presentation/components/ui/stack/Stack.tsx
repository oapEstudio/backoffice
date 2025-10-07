
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';

import React, { type JSX } from 'react'

interface ICustomStackProps{
    spacing?: any,
    direction?: "row" | "row-reverse" | "column" | "column-reverse",
    useFlexGap?: boolean,
    sx?: SxProps,
    alignItems?: any,
    children: JSX.Element | JSX.Element[],
    mb?: any
}

export const CustomStack: React.FC<ICustomStackProps> = ({children,spacing,direction,useFlexGap,sx,alignItems,mb}) => {
  return (
    <Stack spacing={spacing}
           direction={direction}
           useFlexGap={useFlexGap}
           alignItems={alignItems}
           sx={sx}
           mb={mb}>
            {children}
    </Stack>
  )
}

