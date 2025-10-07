import React from 'react'
import { colors } from '../../../common/colors'
import { CustomBox } from '../../ui/box/CustomBox'
import Typography from '@mui/material/Typography'

interface EmptyElementListProps{
    message: string
}
export const EmptyElementList: React.FC<EmptyElementListProps> = ({message = 'No hay elementos disponibles'}) => {
  return (
    <CustomBox 
              sx={{
                   backgroundColor: colors.palette.primary.generalBackgroundTwo, 
                   display: 'flex', 
                   height: '4rem',
                   justifyContent: 'center', 
                   alignItems: 'center'
               }}>

            <Typography color={colors.palette.primary.disabled}>{message}</Typography>

    </CustomBox>
  )
}
