import type { IPageParameters, IPaginatedResponse } from "../../../application/common/IPaginatedResponse";
import type { IGroupRepository } from "../../../application/interfaces/IGroupRepository";
import type { IGroup } from "../../../domain/entities/IGroup";
import { env } from "../../config/env";
import { apiHandler } from "./apiHandler";
import { RepositoryAbstract } from "./RepositoryAbstract";

export class GroupRepository extends RepositoryAbstract implements IGroupRepository{

     resource = env.resources.AD;
    
    async getGroups(params: IPageParameters): Promise<IPaginatedResponse<IGroup>> {

       const version = this.resource.groups.getAll.version;
       const url = `${this.resource.groups.getAll.endpoint}`;

       const response = await apiHandler.get<IPaginatedResponse<IGroup>>(
             this.resolveURL(url,version),
             { queryParams: params }
           );
        return response.data;
    }


}