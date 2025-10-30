import React from 'react'
import { CustomGrid } from '../../../../../components/ui/grid/CustomGrid'
import { CustomBox } from '../../../../../components/ui/box/CustomBox'
import { colors } from '../../../../../common/colors'
import { CustomStack } from '../../../../../components/ui/stack/Stack'
import { SectionsDynamicPage } from '../../../pages/new_page/components/sections-page/SectionsDynamicPage'
import type { ISectionPage } from '../../../pages/new_page/components/section-page/SectionPage'
import Sidebar from '../../../../../components/ui/sidebar'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import Divider from '../../../../../components/ui/divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { DangerIcon, WarningIcon } from '../../../../../components/ui/icons'
import CustomDivider from '../../../../../components/ui/divider'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import LogoYPF from '../../../../../components/ui/icons/ypf-logo/ypf-logo'
import { Button } from '../../../../../components/ui/button'


export interface IDynamicPageProps{
    isMenu: boolean;
    isEdit: boolean;
    sections: ISectionPage[];
    handleDeleteSections: (id: number) => void;
    handleAddElement: (id: number) => void;
    handleDeleteElement: (id: number) => void;
}

export const DynamicPage: React.FC<IDynamicPageProps> = ({isEdit = true,isMenu,sections, handleDeleteSections, handleAddElement, handleDeleteElement}) => {


  return (
   <CustomGrid container sx={{minHeight: 500}}>
        <CustomGrid  container size={2} 
                    sx={{                       
                        height: '100%', // o un alto concreto si tu página no usa 100vh en ancestros
                        display: 'flex',}}>
            <Paper sx={{width: '100%',minHeight: 500, height: '100%'}}>
                <CustomStack sx={{width: '100%', height: '100%'}}>                
                        <CustomBox sx={{width: '100%', height: '4rem'}}>
                                <IconButton>
                                    <LogoYPF link={'https://algo.com'} />  
                                </IconButton>
                        </CustomBox>
                        <CustomDivider />
                        <CustomStack direction='column' sx={{width: '100%',height: '20rem',justifyContent: 'space-between'}}>
                            <CustomBox>
                                <CustomBox sx={{width: '100%', height: '3rem'}}>
                                    <Typography variant={'body2'} textAlign={'center'}>
                                        Prueba
                                    </Typography>
                                </CustomBox>
                            </CustomBox>
                            <CustomBox>
                                <Button variant='secondary'  title='Salir'/>
                            </CustomBox>
                        </CustomStack>
                                  
                </CustomStack>
            </Paper>
        </CustomGrid>
        <CustomGrid container size={isMenu? 10 : 12} sx={{ backgroundColor: colors.palette.primary.generalBackgroundTwo}}>
            <CustomStack direction='column' spacing={2} sx={{width: '100%'}}>
                
                    {
                        sections.length >0 ? 
                                            <SectionsDynamicPage 
                                                sections={sections} 
                                                isEdit={isEdit} 
                                                handleDeleteSections={handleDeleteSections} 
                                                handleAddElement={handleAddElement} 
                                                handleDeleteElement={handleDeleteElement} /> : 
                                            <></>
                    }                   
                            
            </CustomStack>
        </CustomGrid>
   </CustomGrid>
  )
}
