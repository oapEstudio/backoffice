
import Chip from "@mui/material/Chip";
import React from "react";

const State: React.FC<{ label: string; color?: string }> = ({
  label,
  color = "#49beff",
}) => {
  return (
    <Chip
      label={label}
      size="small"
      sx={{
        color: "#fff",
        backgroundColor: color,
      }}
    />
  );
};

export default State;
