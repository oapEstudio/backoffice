import type { IColumn } from "../table.interface";

export interface ITableHeader {
  columns: IColumn[];
  order: "asc" | "desc";
  orderBy: string;
  onRequestSort: (e: React.MouseEvent<unknown>, property: string) => void;
}
