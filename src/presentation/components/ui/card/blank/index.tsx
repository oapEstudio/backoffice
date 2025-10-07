import { Card } from "@mui/material";
import type { JSX } from "react";

type Props = { // Modify interface
  color?: string;
  className?: string;
  children: JSX.Element | JSX.Element[];
};

const BlankCard = ({ children, className, color }: Props) => {
  return (
    <Card
      sx={{ p: 0, position: "relative", backgroundColor: color, margin: 1, marginLeft: 0 }}
      className={className}
      elevation={9}
      variant={undefined}
    >
      {children}
    </Card> 
  );
};

export default BlankCard;
