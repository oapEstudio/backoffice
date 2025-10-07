import type { IProfileRepository } from "../../../application/interfaces/IProfileRepository";
import type { IPageParameters, IPaginatedResponse } from "../../../application/common/IPaginatedResponse";
import type { IProfile } from "../../../domain/entities/IProfile";
import { apiHandler } from "./apiHandler";
import type { IProfileUpdateDto } from "../../../application/dtos/IProfileUpdateDto";
import type { IProfileCreateDto } from "../../../application/dtos/IProfileCreateDto";
import type { IStatuses } from "../../../domain/entities/IStatuses";
import type { IProfileUpdateGroups } from "../../../application/dtos/IProfileUpdateGroups";
import { RepositoryAbstract } from "./RepositoryAbstract";
import { env } from "../../config/env";


export class ProfileRepository extends RepositoryAbstract implements IProfileRepository {

  resource = env.resources.profiles;

  async updateProfileGroups(id: string, payload: IProfileUpdateGroups) {

     const url = this.resource.edit.groups.endpoint.replace('{id}',id);
     const version = this.resource.edit.groups.version;

     const res = await apiHandler.put<IProfile>(this.resolveURL(url,version),{},payload);

     return res.data;
  }
 

  async updateProfile(id: string, payload: IProfileUpdateDto){

     const url = this.resource.edit.profile.endpoint.replace('{id}',id);
     const version = this.resource.edit.profile.version;

    const res = await apiHandler.put<IProfile>(this.resolveURL(url,version),{},payload);

    return res.data;
  }
  async getProfiles(params: IPageParameters): Promise<IPaginatedResponse<IProfile>> {
    
  
    const mapped = this.paramsMap(params);
    const qs = this.toQueryStringPagination(mapped);

    const version = this.resource.getAll.version;
    const url = `${this.resource.getAll.endpoint}?${qs}`;

    const response = await apiHandler.get<IPaginatedResponse<IProfile>>(this.resolveURL(url,version));

    return response.data;
    
  }

   async createProfile(dto: IProfileCreateDto): Promise<string> {

      const version = this.resource.create.version;
      const url = `${this.resource.create.endpoint}`;

      const res = await apiHandler.post<{ id: string }, IProfileCreateDto>(
        this.resolveURL(url,version),
        {},
        dto
      )
      return res.data.id;
   }

  async getStatuses(params: IPageParameters): Promise<IPaginatedResponse<IStatuses>> {
          const version = this.resource.dim.statuses.version;
          const url = `${this.resource.dim.statuses.endpoint}`;
          const response = await apiHandler.get<IPaginatedResponse<IStatuses>>(
                 this.resolveURL(url,version),
                { queryParams: params }
              );
          return response.data;
  }

}

