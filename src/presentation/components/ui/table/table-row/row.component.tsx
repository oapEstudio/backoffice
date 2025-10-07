import React from "react";
import { Typography } from "@mui/material";

import ActionsComponent from "../table-actions/actions.component";
import type { IAction } from "../table-actions/actions.interface";
// import StateComponent from "../table-state/state.component";
import { StyledTableCell, StyledTableRow } from "../table.styles";
import type { CustomRowProps } from "./row.interface";
import type { IRow } from "../table.interface";
import { ActiveColumnIcon } from "../../icons";
// import { convertLinks } from "../../../../application/utils/convertLinks";

const CustomRow: React.FC<CustomRowProps> = ({
  rowData,
  columns,
  actions,
  contextType,
  index,
}) => {
  function handleSelection(dataRow: IRow) { console.log(dataRow) }

  const background = rowData['background']? {backgroundColor: `${rowData['background']} !important`}:{};
  return (
    <StyledTableRow onClick={() => handleSelection(rowData)} sx={{...background}}>
      {columns.map((column) => {
        return (
          <StyledTableCell key={column.id} align={column.align} style={{ fontSize: '1rem', paddingTop:'0.5%',paddingBottom:'0.5%', textAlign: 'left'}} >
            {column.id === "wasEmployee" ? (
              <Typography>{rowData.wasEmployee ? "SI" : "NO"}</Typography>
            ) : column.id === "actions" ? (
              <ActionsComponent
                actions={actions as IAction[]}
                contextType={contextType}
                rowData={rowData}
              />
            ) : column.id === "active" ? (
              <ActiveColumnIcon active={!!rowData.active} />
            ) : React.isValidElement(rowData[column.id])? (
              <>{rowData[column.id]}</>
            ) : (
              <Typography fontSize={'1rem'}>{rowData[column.id]?.toString()}</Typography>
            )}
          </StyledTableCell>
        );
      })}
    </StyledTableRow>
  );
};

export default CustomRow;
