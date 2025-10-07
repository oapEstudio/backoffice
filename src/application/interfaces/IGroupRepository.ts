import type { IGroup } from "../../domain/entities/IGroup";
import type { IPageParameters, IPaginatedResponse } from "../common/IPaginatedResponse";

export interface IGroupRepository{
    getGroups(params: IPageParameters): Promise<IPaginatedResponse<IGroup>>;
}