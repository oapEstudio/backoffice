import type { IColumn, IRow } from "../table.interface";

export interface ITableFooter {
  row?: IRow[];
  columns?: IColumn[];
  page?: number;
  pageSize?: number;
  totalCount: number;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  handleChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  labelRowsPerPage?: string;
}
