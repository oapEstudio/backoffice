export interface IMenuCreateDto {
    name:           string;
    description:    string;
    itemStatusId:   number;
    hasLink:        boolean;
    parentId:       string | null;
    link:           string;
    hierarchyIndex: number;
    orderIndex:     number;
}
