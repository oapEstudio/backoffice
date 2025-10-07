export interface IUpdateMenuOrderDto {
    id:       string;
    children: Child[];
}

export interface Child {
    id:         string;
    orderIndex: number;
}
