import TableFooter  from '@mui/material/TableFooter';

import React from "react";
import type { ITableFooter } from "./tableFooter.interface";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { TablePaginationActions } from './tablePaginationActions.component';
import { INITIAL_PARAMS_TABLE, ROW_PER_PAGE, ROW_PER_PAGE_LABEL } from '../../../../features/shared/constants/initialsParamTable';

export const CustomTableFooter: React.FC<ITableFooter> = ({
  // row,
  columns,
  page = 0,
  pageSize = INITIAL_PARAMS_TABLE.pageSize,
  totalCount,
  handleChangePage,
  handleChangeRowsPerPage,
  labelRowsPerPage = ROW_PER_PAGE_LABEL,
}) => {
  // const totalRows = row.length;

  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={ROW_PER_PAGE}
          colSpan={columns? columns.length : undefined}
          count={totalCount}
          rowsPerPage={pageSize}
          page={page}
          color="primary"     
          labelRowsPerPage={labelRowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          slotProps={{
            select: {
              inputProps: {
                "aria-label": "rows per page",
              },
              native: true,
            },
          }}
          ActionsComponent={TablePaginationActions}
        />
      </TableRow>
    </TableFooter>
  );
};
