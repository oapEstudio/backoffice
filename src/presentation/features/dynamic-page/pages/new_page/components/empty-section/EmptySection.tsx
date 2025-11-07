import React from 'react'
import BlankCard from '../../../../../../components/ui/card/blank'
import { CustomGrid } from '../../../../../../components/ui/grid/CustomGrid'
import { CustomBox } from '../../../../../../components/ui/box/CustomBox'
import Typography from '@mui/material/Typography'

export const EmptySection = () => {
    
  return <BlankCard>
                <CustomGrid container spacing={1}>
                                                         
                    <CustomBox sx={{
                                    minHeight: 100, 
                                    width: '100%', 
                                    display: 'flex',
                                    justifyContent: 'center', 
                                    alignItems: 'center'}}>                                                               
                                                                
                             <Typography >Sin elementos</Typography>                                                                
                     </CustomBox>
                                                         
                 </CustomGrid>
         </BlankCard>
}
