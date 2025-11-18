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
import { AddActionIcon, DeleteActionIcon, SVGIcon } from '../../../../../components/ui/icons';
import { CustomFab } from '../../../../../components/ui/fab/CustomFab'
import { ID_SECTION_ITEM_MENU } from '../../constants/constants'
import { Link } from 'react-router-dom'

export interface IDynamicPageProps{
    isMenu: boolean;
    isEdit: boolean;
    sections: ISectionPage[];
    handleDeleteSections?: (id: string) => void;
    handleAddElement?: (id: string) => void;
    handleDeleteElement?: (id: string) => void;
    handleAddMenu?: () => void;
}

export const DynamicPage: React.FC<IDynamicPageProps> = ({handleAddMenu, 
                                                          isEdit = true,
                                                          isMenu,
                                                          sections, 
                                                          handleDeleteSections, 
                                                          handleAddElement, 
                                                          handleDeleteElement}) => {


  return (
   <CustomGrid container sx={{minHeight: 500}}>
        <>
            {isMenu && <CustomGrid  container size={2} 
                                sx={{                                                          
                                    display: 'flex',
                                    position: 'relative',
                                    boxShadow: '5px 0 10px rgba(0, 0, 0, 0.3)'
                                    }}>

                        <Paper sx={{width: '100%',minHeight: 500, height: '100%'}}>
                            <CustomStack sx={{width: '100%', height: '100%'}}>                
                                    <CustomBox sx={{width: '100%', height: '4rem', display: 'flex', justifyContent: 'center'}}>
                                            <IconButton>
                                                <SVGIcon style={{width: '7rem', height: '3rem'}} icon={ LogoYPF }  /> 
                                            </IconButton>
                                              <CustomBox sx={{position: 'absolute',top: '4rem', left: 0}}>
                                                    {isEdit && <CustomFab   style={{
                                                                                    backgroundColor: colors.palette.primary.main,
                                                                                    width: '30px', 
                                                                                    height: '30px'
                                                                                    }}
                                                                            sx={{position: 'absolute'}} 
                                                                            onClick={()=>{if(handleAddMenu) handleAddMenu();}}>
                                                                    <AddActionIcon  style={{color: 'white'}}/>
                                                                </CustomFab>
                                                    }
                                             </CustomBox>
                                    </CustomBox>
                                    <CustomDivider />                                   
                                    <CustomStack direction='column' sx={{position: 'relative', width: '100%',height: '100%',justifyContent: 'space-between'}}>
                                       
                                        <CustomBox>
                                            {sections && sections
                                                         .filter(section=>section.id === ID_SECTION_ITEM_MENU.toString())
                                                         .map(section=>{
                                                               
                                                          return section
                                                                 .elements                                                               
                                                                .map(element=>{

                                                                    return  <CustomBox sx={{'&:hover': {color: 'white', backgroundColor: colors.palette.secondary.light, opacity: 1 },border: isEdit? '0.2rem dashed #9E9E9E' : 'none',alignContent: 'center', width: '100%', height: '3rem'}}>
                                                                                         <>
                                                                                           {handleDeleteElement && <CustomFab style={{right: 0, width: '30px' , height: '30px'}} sx={{position: 'absolute'}} onClick={()=>{handleDeleteElement(element.id)}}>
                                                                                                                        <DeleteActionIcon />
                                                                                                                    </CustomFab>  
                                                                                           }                 
                                                                                         </>
                                                                                  <Typography fontSize={'1rem'} variant={'body2'} textAlign={'center'}>
                                                                                       <Link target='_blank' to={element.link}>{element.label}</Link>
                                                                                   </Typography>
                                                                            </CustomBox>
                                                                        })
                                            })}                                           
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
