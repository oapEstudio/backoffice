import IconButton from "@mui/material/IconButton";
import React from "react";
import type { IActionsProps } from "./actions.interface";
import type { IRow } from "../table.interface";

const ActionsComponent: React.FC<IActionsProps> = ({
  actions,
  contextType,
  rowData,
}) => {
  const handleClick = (actionOnClick?: (rowData: IRow) => void) => {
    if (actionOnClick) {
      actionOnClick(rowData);
    }
  };

  return (
    <div>
      {actions.map((action, index) => (
        <IconButton key={index} onClick={() => handleClick(action.onClick)}>
          {action.icon}
        </IconButton>
      ))}
    </div>
  );
};
export default ActionsComponent;
