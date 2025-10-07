import React, { useEffect, useState } from "react";

import Lottie from "react-lottie";
import type { IHeader } from "./header.interface";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// import BlankCard from '../card/blank';
// import { baselightTheme } from '../../../application/common/theme';

const Header: React.FC<IHeader> = ({
  title,
  animationData,
  actionComponent,
}) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleCustomScroll = (event: CustomEvent) => {
      setIsSticky(event.detail > 0);
    };

    window.addEventListener(
      "mainLayoutScroll",
      handleCustomScroll as EventListener
    );
    return () => {
      window.removeEventListener(
        "mainLayoutScroll",
        handleCustomScroll as EventListener
      );
    };
  }, [isSticky]);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "rgb(232, 247, 255)",
          borderRadius: "12.25px",
        }}
      >
        <Grid
          container
          sx={{
            position: "relative",
            display: "flex",
            flexFlow: "wrap",
            width: "100%",
            minHeight: 100,
            padding: "20px",
            overflow: "hidden",
          }}
        >
          <Grid size={{xs: 8}}  sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h4" color={"rgb(73, 190, 255)"}>
              {title}
            </Typography>
          </Grid>
          <Grid size={{xs:4}}>
            {animationData && (
              <Box sx={{ float: "right" }}>
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: animationData,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice",
                    },
                  }}
                  height={100}
                  width={100}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          zIndex: 10000,
          position: 'sticky',
          top: '64px',
          padding: '10px 0px',
          marginBottom: 2,
          backgroundColor: 'white'
        }}
      >
        <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
          {actionComponent}
        </Box>
      </Box>
    </>
  );
};

export default Header;
