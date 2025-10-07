import type { IAction } from "../table-actions/actions.interface";
import type { IColumn, IRow } from "../table.interface";

export interface CustomRowProps {
  rowData: IRow;
  columns: IColumn[];
  actions?: IAction[];
  contextType: string;
  index: number;
}