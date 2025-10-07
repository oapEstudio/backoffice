import type { TableProps } from "@mui/material";
import type { IAction } from "./table-actions/actions.interface";

export interface IColumn {
    id: string;
    label: string;
    align: 'left' | 'right' | 'center';
    order?: string;
}

export interface IRow {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: string | number | boolean | any[] | [] | null | undefined | {};
  //actions: string;
}

export type CustomTableProps = TableProps & {
  columns: IColumn[];
  data: IRow[];
  actions?: IAction[];
  contextType?: string;
  page: number;
  totalCount: number;
  pageSize: number;
  sortBy?: string;
  messageEmpty?: string;
  sortDescending: boolean;
  onRequestSort: (columnId: string, desc: boolean) => void;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};