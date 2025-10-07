import React from 'react';
import { Box, List } from '@mui/material';

import Menuitems from './menu-items';
import NavItem from './nav-item';
import NavGroup from './nav-group';
// import { useAuth } from '../../../application/hooks/useAuth';

interface ISidebarItemsProps {
  isSidebarCollapse?: boolean;
  toggleMobileSidebar: () => void;
}

const SidebarItems : React.FC<ISidebarItemsProps> = ({ isSidebarCollapse = false, toggleMobileSidebar }: ISidebarItemsProps) => {
 // const { pathname } = useLocation();
  //const pathDirect = pathname;
  // const { user } = useAuth();
const pathDirect = "PAth Mocj";
  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {Menuitems?.map((item) => {
          if (item.subheader) {
            return (
              <NavGroup
                item={item}
                key={item.subheader}
                isSidebarCollapse={isSidebarCollapse}
              />
            );
          } else {
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                onClick={toggleMobileSidebar}
                isSidebarCollapse={isSidebarCollapse}
              />
            );
          }
        })}
      </List>
    </Box>
  );
};

export default SidebarItems;
