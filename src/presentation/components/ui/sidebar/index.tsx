import { Box, Drawer, useMediaQuery } from "@mui/material";
// import Logo from '../shared/logo/Logo';

import SidebarItems from "./sidebar-items";
import { Typography } from "@mui/material";
import { APP_NAME } from "../../../common/globals";
import LogoYPF from "../icons/ypf-logo/ypf-logo";

interface ItemType {
  isMobileSidebarOpen: boolean;
  onSidebarClose: () => void;
  isSidebarOpen: boolean;
  isSidebarCollapse: boolean;
}

const Sidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
  isSidebarCollapse,
}: ItemType) => {

  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const sidebarWidth = isSidebarCollapse ? "87px" : "270px";

  if (lgUp) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          transition: "width .5s",
          flexShrink: 0,
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              transition: "width .5s",
              width: sidebarWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {/* ------------------------------------------- */}
          {/* Sidebar Box */}
          {/* ------------------------------------------- */}
          <Box
            sx={{
              height: "100%",
            }}
          >
            {/* ------------------------------------------- */}
            {/* Logo */}
            {/* ------------------------------------------- */}
            <Box
              sx={{
                paddingLeft: !isSidebarCollapse ? "24px" : "20px",
                paddingRight: "24px",
              }}
              paddingTop={2}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              flexDirection={"row"}
            >
              <LogoYPF link=""/>
              {!isSidebarCollapse && <Typography variant="h4">{APP_NAME}</Typography>}
            </Box>
            <Box>
              {/* ------------------------------------------- */}
              {/* Sidebar Items */}
              {/* ------------------------------------------- */}
              <SidebarItems
                isSidebarCollapse={isSidebarCollapse}
                toggleMobileSidebar={onSidebarClose}
              />
            </Box>
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          width: sidebarWidth,
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      {/* ------------------------------------------- */}
      {/* Logo */}
      {/* ------------------------------------------- */}
      <Box
        px={2}
        paddingTop={2}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"row"}
      >
        <LogoYPF link=""/>
        <Typography variant="h4">{APP_NAME}</Typography>
      </Box>
      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}
      <SidebarItems toggleMobileSidebar={onSidebarClose} />
    </Drawer>
  );
};

export default Sidebar;
