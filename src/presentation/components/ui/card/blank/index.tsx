import { Card } from "@mui/material";
import type { JSX } from "react";

type Props = { // Modify interface
  color?: string;
  className?: string;
  elevation?: number;
  children: JSX.Element | JSX.Element[];
};

const BlankCard = ({ children, className, color, elevation = 9 }: Props) => {
  return (
    <Card
      sx={{ p: 0, position: "relative", backgroundColor: color, margin: 1, marginLeft: 0 }}
      className={className}
      elevation={elevation}
      variant={undefined}
    >
      {children}
    </Card> 
  );
};

export default BlankCard;
