export interface IUpdateMenuOrderRootDto {
    parents: Parent[];
}

export interface Parent {
    id:         string;
    orderIndex: number;
}
