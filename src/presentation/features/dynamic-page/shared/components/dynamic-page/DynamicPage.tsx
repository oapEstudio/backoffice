import React from 'react'
import { CustomGrid } from '../../../../../components/ui/grid/CustomGrid'
import { CustomBox } from '../../../../../components/ui/box/CustomBox'
import { colors } from '../../../../../common/colors'
import { CustomStack } from '../../../../../components/ui/stack/Stack'
import { SectionsDynamicPage } from '../../../pages/new_page/components/sections-page/SectionsDynamicPage'
import type { ISectionPage } from '../../../pages/new_page/components/section-page/SectionPage'
import CustomDivider from '../../../../../components/ui/divider'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import LogoYPF from '../../../../../components/ui/icons/ypf-logo/logo-ypf.svg?react';
import { Button } from '../../../../../components/ui/button'
import { SVGIcon } from '../../../../../components/ui/icons'


export interface IDynamicPageProps{
    isMenu: boolean;
    isEdit: boolean;
    sections: ISectionPage[];
    handleDeleteSections?: (id: number) => void;
    handleAddElement?: (id: number) => void;
    handleDeleteElement?: (id: number) => void;
}

export const DynamicPage: React.FC<IDynamicPageProps> = ({isEdit = true,isMenu,sections, handleDeleteSections, handleAddElement, handleDeleteElement}) => {


  return (
   <CustomGrid container sx={{minHeight: 500}}>
        <>
            {isMenu && <CustomGrid  container size={2} 
                                sx={{                                                          
                                    display: 'flex',}}>

                        <Paper sx={{width: '100%',minHeight: 500, height: '100%'}}>
                            <CustomStack sx={{width: '100%', height: '100%'}}>                
                                    <CustomBox sx={{width: '100%', height: '4rem', display: 'flex', justifyContent: 'center'}}>
                                            <IconButton>
                                                <SVGIcon style={{width: '7rem', height: '3rem'}} icon={ LogoYPF }  /> 
                                            </IconButton>
                                    </CustomBox>
                                    <CustomDivider />
                                    <CustomStack direction='column' sx={{position: 'relative', width: '100%',height: '100%',justifyContent: 'space-between'}}>
                                        <CustomBox>
                                            <CustomBox sx={{width: '100%', height: '3rem'}}>
                                                <Typography variant={'body2'} textAlign={'center'}>
                                                    Prueba
                                                </Typography>
                                            </CustomBox>
                                        </CustomBox>
                                        <CustomBox sx={{display: 'flex', justifyContent: 'center', marginBottom: '2rem'}}>
                                            <Button variant='secondary'  title='Salir'/>
                                        </CustomBox>
                                    </CustomStack>
                                            
                            </CustomStack>
                        </Paper>
                    </CustomGrid>}
        </>
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
