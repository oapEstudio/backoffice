import  TableSortLabel  from "@mui/material/TableSortLabel";
import type { ITableHeader } from "./tableHeader.interface"
import { StyledTableCell } from "../table.styles"
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { CustomBox } from "../../box/CustomBox";
import { visuallyHidden } from '@mui/utils';


function CustomTableHeader({ columns,
  order,
  orderBy,
  onRequestSort }: ITableHeader) {


  const createSortHandler = (property: string) => (
    e: React.MouseEvent<unknown>
  ) => {
    onRequestSort(e, property)
  }
  return (
    <TableHead>
      <TableRow>
        {
            columns.map((column) => {
                  const active = orderBy === (column.order??column.id);
                  return (
                            <StyledTableCell 
                                  key={column.id} 
                                  align={column.align || "left"} 
                                  sortDirection={active ? order : false}
                                  style={{padding: '1%'}}
                                  >
                              <TableSortLabel
                                active={active}
                                direction={active ? order : "asc"}
                                onClick={createSortHandler(column.order??column.id)}
                              >
                                <Typography variant="h6" fontWeight={600} color="#1F1F1F">
                                  {column.label}
                                </Typography>                              
                              </TableSortLabel>
                            </StyledTableCell>
                          )
            })
        }
      </TableRow>
    </TableHead>
  )
}

export default CustomTableHeader