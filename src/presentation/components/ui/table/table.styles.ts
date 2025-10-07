import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { colors } from '../../../common/colors';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: colors.whiteSmoke,
    color: theme.palette.text.primary,
  },
  [`&.${tableCellClasses.body}`]: {
    color: theme.palette.text.primary,
    //backgroundColor: colors.black
  },  
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // Pintar filas 2,4,6,… con whiteSmoke
  '&:nth-of-type(even)': {
    backgroundColor: colors.whiteSmoke,
  },
  // Última fila sin borde, pero sin tocar el background
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));