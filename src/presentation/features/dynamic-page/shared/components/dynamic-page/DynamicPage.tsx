import React, { useState } from 'react'
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
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Drawer from '@mui/material/Drawer'
import { useTheme, useMediaQuery } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import LogoYPF from '../../../../../components/ui/icons/ypf-logo/logo-ypf.svg?react'
import { AddActionIcon, DeleteActionIcon, SVGIcon } from '../../../../../components/ui/icons'
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

export const DynamicPage: React.FC<IDynamicPageProps> = ({
    handleAddMenu, 
    isEdit = true,
    isMenu,
    sections, 
    handleDeleteSections, 
    handleAddElement, 
    handleDeleteElement
}) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // Contenido del menú reutilizable
    const menuContent = (
        <CustomStack sx={{width: '100%', height: '100%', minHeight:  'calc(100vh - 67px)' }}>                
            <CustomBox sx={{width: '100%', height: '4rem', display: 'flex', justifyContent: 'center', position: 'relative'}}>
                <IconButton>
                    <SVGIcon style={{width: '7rem', height: '3rem'}} icon={LogoYPF} /> 
                </IconButton>
                {isMobile && (
                    <IconButton 
                        onClick={handleDrawerToggle}
                        sx={{
                            position: 'absolute', 
                            right: 8, 
                            top: '50%', 
                            transform: 'translateY(-50%)'
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                )}
                {/* Botón cerrar en móvil */}
                {isMobile && (
                    <IconButton 
                        onClick={handleDrawerToggle}
                        sx={{
                            position: 'absolute', 
                            right: 8, 
                            top: '50%', 
                            transform: 'translateY(-50%)'
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                )}

                <CustomBox sx={{position: 'absolute', top: '4rem', left: 0}}>
                    {isEdit && (
                        <CustomFab 
                            variant="extended" 
                            style={{
                                backgroundColor: colors.palette.primary.main,
                                width: '7rem',
                                padding: 0,
                                height: '30px'  
                            }}
                            sx={{position: 'absolute', fontSize: '12px', color: 'white'}} 
                            onClick={()=>{if(handleAddMenu) handleAddMenu();}}>
                            <AddActionIcon  style={{color: 'white'}}/>
                            Añadir item
                        </CustomFab>
                    )}
                </CustomBox>
            </CustomBox>
            
                                    <CustomDivider />                                   
            
            <CustomStack 
                direction='column' 
                sx={{position: 'relative', width: '100%', height: '100%', justifyContent: 'space-between'}}
            >
                <CustomBox>
                    {sections && sections
                        .filter(section => section.id === ID_SECTION_ITEM_MENU.toString())
                        .map(section => {
                            return section.elements.map(element => {
                                return (
                                    <CustomBox 
                                        key={element.id}
                                        sx={{
                                            '&:hover': {
                                                color: 'white', 
                                                backgroundColor: colors.palette.secondary.light, 
                                                opacity: 1 
                                            },
                                            border: isEdit ? '0.2rem dashed #9E9E9E' : 'none',
                                            alignContent: 'center', 
                                            width: '100%', 
                                            height: '3rem',
                                            position: 'relative'
                                        }}
                                        onClick={() => isMobile && setMobileOpen(false)}
                                    >
                                        {handleDeleteElement && (
                                            <CustomFab 
                                                style={{right: 0, width: '30px', height: '30px'}} 
                                                sx={{position: 'absolute'}} 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteElement(element.id);
                                                }}
                                            >
                                                <DeleteActionIcon />
                                            </CustomFab>  
                                        )}
                                        <Typography fontSize={'1rem'} variant={'body2'} textAlign={'center'}>
                                            <Link target='_blank' to={element.link} style={{ color: colors.palette.primary.main }} >{element.label}</Link>
                                        </Typography>
                                    </CustomBox>
                                );
                            });
                        })
                    }                                           
                </CustomBox>                                       
            </CustomStack>
        </CustomStack>
    );

    return (
        <>
            {/* AppBar con hamburguesa para móvil/tablet */}
            {isMobile && isMenu && (
                <AppBar 
                    position="sticky" 
                    sx={{
                        backgroundColor: 'white',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    }}
                >
                    <Toolbar sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%'
                    }}>
                        <SVGIcon style={{width: '5rem', height: '2.5rem'}} icon={LogoYPF} />
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{mr: 2, color: colors.palette.primary.main}}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            )}

            {/* Drawer para móvil/tablet */}
            {isMobile && isMenu && (
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        '& .MuiDrawer-paper': { 
                            boxSizing: 'border-box', 
                            width: 280,
                            boxShadow: '5px 0 10px rgba(0, 0, 0, 0.3)'
                        },
                    }}
                >
                    <Paper sx={{width: '100%', minHeight: 500, height: '100%'}} >
                        {menuContent}
                    </Paper>
                </Drawer>
            )}

            {/* Layout principal */}
            <CustomGrid container sx={{minHeight: 500}}>
                {/* Menú lateral para desktop */}
                {!isMobile && isMenu && (
                    <CustomGrid  
                        container 
                        size={2} 
                        sx={{                                                          
                            display: 'flex',
                            position: 'relative',
                            boxShadow: '5px 0 10px rgba(0, 0, 0, 0.3)'
                        }}
                    >
                        <Paper sx={{width: '100%', minHeight: 500, height: '100%'}}>
                            {menuContent}
                        </Paper>
                    </CustomGrid>
                )}

                {/* Contenido principal */}
                <CustomGrid 
                    container 
                    size={(!isMobile && isMenu) ? 10 : 12} 
                    sx={{backgroundColor: colors.palette.primary.generalBackgroundTwo, minHeight: 500}}
                >
                    <CustomStack direction='column' spacing={2} sx={{width: '100%', minHeight: 'calc(100vh - 120px)'}}>
                        {sections.length > 0 ? (
                            <SectionsDynamicPage 
                                sections={sections} 
                                isEdit={isEdit} 
                                handleDeleteSections={handleDeleteSections} 
                                handleAddElement={handleAddElement} 
                                handleDeleteElement={handleDeleteElement} 
                            />
                        ) : (
                            <></>
                        )}                   
                    </CustomStack>
                </CustomGrid>
            </CustomGrid>
        </>
    );
};