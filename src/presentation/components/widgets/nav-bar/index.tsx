import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import  LogoYPF  from '../../ui/icons/ypf-logo/ypf-logo';
import { NavLink } from 'react-router-dom';
import { HOME, ROUTES } from '../../../router/routes';
import  './nav-bar.css';

interface SubItem { label: string, route: string }
interface MenuItemType { label: string, route: string, subItems?: SubItem[]; }


const pages: MenuItemType[] =  ROUTES
                               .filter(route=>route.viewNav)
                               .sort((a, b) => a.order.localeCompare(b.order))
                               .map(route=>{
                                        let item: MenuItemType = {
                                          label: route.title,
                                          route: route.name,
                                          subItems: route.children.length==0? [] :
                                          route.children
                                          .sort((a, b) => a.order.localeCompare(b.order))
                                          .map(child=>{
                                              let childItem: MenuItemType = {
                                                label: child.title,
                                                route: child.name,
                                                subItems: []                                              
                                              };

                                              return childItem;
                                          })
    };

    return item
});



export default function NavBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleOpen = (event: any, idx: number) => {
    if (pages[idx].subItems) {
      setAnchorEl(event.currentTarget);
      setOpenIndex(idx);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenIndex(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={1} sx={{ boxShadow: ' 0px 2px 7px 0px rgba(0,0,0,0.10)',marginBottom: '1rem'}}>
        <Toolbar sx={{paddingLeft: '3% !important'}}>
          <LogoYPF link={HOME.name} />
          <Box
            sx={{
              ml: 'auto',                 
              display: { xs: 'none', md: 'flex' },
              gap: 0,
              alignItems: 'center',             
            }}
          >        
            {pages.map((page, idx) => (
                  <React.Fragment key={page.label}>
                    <Button
                      onClick={(e) => handleOpen(e, idx)}
                      sx={{ my: 2, color: 'black', display: 'block', mx: 2 }}
                    >
                      {
                        (page.subItems??[]).length==0? (<NavLink  
                                                              to={page.route} 
                                                              style={{textDecoration: 'none', color: 'black'}} 
                                                              className='nav-link'> <div className='item-menu'>{page.label}</div></NavLink>):
                                                        (page.label)   
                      }
                                      
                    </Button>
                    { (page.subItems??[]).length>0 && (
                      <Menu
                        anchorEl={anchorEl}
                        open={openIndex === idx}
                        onClose={handleClose}                
                        MenuListProps={{ onMouseLeave: handleClose }}
                      >
                        {(page.subItems??[]).map((sub) => (
                          <MenuItem key={sub.label} onClick={handleClose}>
                            <NavLink  
                                to={sub.route} 
                                style={{textDecoration: 'none', color: 'black'}} 
                                className='nav-link'> <div className='item-menu'>{sub.label}</div>
                            </NavLink>
                          </MenuItem>
                        ))}
                      </Menu>
                    )}
                  </React.Fragment>
                ))}  
                     
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
