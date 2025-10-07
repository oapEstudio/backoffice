import type { IRow } from "../table.interface";

export interface IAction {
    icon?: React.ReactNode;
    onClick?: (rowData: IRow) => any;
}

export interface IActionsProps {
    actions: IAction[];
    contextType: string;
    rowData: IRow;
}