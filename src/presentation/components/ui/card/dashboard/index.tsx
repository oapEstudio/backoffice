import React, { type JSX } from "react";
import { IconButton, Typography } from "@mui/material";
import { Box, Card, CardContent, Stack } from "@mui/material";

type Props = {
  title?: string;
  subtitle?: string;
  animation?: boolean;
  action?: {
    icon: JSX.Element;
    onClick?: () => void;
  };
  footer?: JSX.Element;
  cardheading?: string | JSX.Element;
  headtitle?: string | JSX.Element;
  headsubtitle?: string | JSX.Element;
  children?: JSX.Element;
  middlecontent?: string | JSX.Element;
  contextType?: string;
  onClick?: () => void;
};

const DashboardCard: React.FC<Props> = ({
  title,
  subtitle,
  animation = false,
  action,
  footer,
  cardheading,
  headtitle,
  headsubtitle,
  children,
  middlecontent,
  onClick,
}) => {
  const handleIconClick = () => {
    if (action && action.onClick) {
      action.onClick();
    }
  };

  return (
    <Card
      sx={{
        padding: 0,
        transition: animation ? "transform 0.15s ease-in-out" : "none",
        "&:hover": { transform: animation ? "scale3d(1.02, 1.02, 1)" : "none" },
      }}
      elevation={9}
      variant={undefined}
      onClick={onClick}
    >
      {cardheading ? (
        <CardContent>
          <Typography variant="h5">{headtitle}</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {headsubtitle}
          </Typography>
        </CardContent>
      ) : (
        <CardContent sx={{ p: "30px" }}>
          {title && (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Box>
                <Typography variant="h5">{title}</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  {subtitle}
                </Typography>
              </Box>
              {action && action.icon && (
                <Box>
                  <IconButton onClick={handleIconClick}>
                    {action.icon}
                  </IconButton>
                </Box>
              )}
            </Stack>
          )}
          {children}
        </CardContent>
      )}
      {middlecontent}
      {footer}
    </Card>
  );
};

export default DashboardCard;
