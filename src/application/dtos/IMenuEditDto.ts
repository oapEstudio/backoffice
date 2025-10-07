export interface IMenuEditDto {
    name:           string;
    description:    string;
    itemStatusId:   number;
    parentId:       string | null;
    link:           string;
    hasLink:        boolean;
    orderIndex:     number;
    hierarchyIndex: number;
}
