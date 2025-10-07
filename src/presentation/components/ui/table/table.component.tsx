import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import React from "react";
import CustomTableHeader from "./table-header/tableHeader.component";
import CustomRow from "./table-row/row.component";
import type { CustomTableProps } from "./table.interface";
import { CustomTableFooter } from "./table-footer/tableFooter.component";
import TableContainer from "@mui/material/TableContainer";
import { EmptyElementList } from "../../widgets/empty-element-list/EmptyElementList";
import { CustomBox } from "../box/CustomBox";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  data,
  sortBy,
  sortDescending,
  onRequestSort,
  actions = [],
  contextType,
  page,
  pageSize,
  handleChangePage,
  handleChangeRowsPerPage,
  totalCount,
  messageEmpty = 'No hay elementos disponibles',
  ...tableProps
}) => {
  return (
    <TableContainer component={Paper}>
      <Table size="medium" aria-label="customized table" {...tableProps}>
        <CustomTableHeader
          columns={columns}
          order={sortDescending ? "desc" : "asc"}
          orderBy={sortBy ?? ""}
          onRequestSort={(_e: any, property: any) => {
            // calcula el nuevo sortDescending       
            const isSame = sortBy === property
            const newDesc = isSame ? !sortDescending : false
            onRequestSort(property, newDesc)
          }}
        />
       {data.length === 0 ? (
              <TableBody>
                <TableRow>
                  <TableCell
                    colSpan={Math.max(1, columns.length + (actions?.length ? 1 : 0))}
                    sx={{ p: 0 }} 
                  >
                    <EmptyElementList message={messageEmpty} />
                  </TableCell>
                </TableRow>
              </TableBody>
            ) :
            <>
                <TableBody>
                  {data.map((row, rowIndex) => (
                    <CustomRow
                      index={rowIndex}
                      key={rowIndex}
                      rowData={row}
                      columns={columns}
                      actions={actions}
                      contextType={contextType as string}
                    />
                  ))}
                </TableBody>
                <CustomTableFooter
                  row={data}
                  columns={columns}
                  page={page}
                  pageSize={pageSize}
                  handleChangePage={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                  totalCount={totalCount}
                />
            </>
        }
        
      </Table>
    </TableContainer>
  );
};

export default CustomTable;

