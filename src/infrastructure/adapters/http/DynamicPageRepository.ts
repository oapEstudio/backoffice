import type { IPageParameters, IPaginatedResponse } from "../../../application/common/IPaginatedResponse";
import { apiHandler } from "./apiHandler";

import { RepositoryAbstract } from "./RepositoryAbstract";
import { env } from "../../config/env";
import type { IDynamicPageRepository } from "../../../application/interfaces/IDynamicPageRepository";
import type { IDynamicPage } from "../../../domain/entities/IDynamicPage";


export class DynamicPageRepository extends RepositoryAbstract implements IDynamicPageRepository {

  resource = env.resources.dynamic_pages;


  async getDynamicPages(params: IPageParameters): Promise<IPaginatedResponse<IDynamicPage>> {
    
    const mapped = this.paramsMap(params);
    const qs = this.toQueryStringPagination(mapped);

    const version = this.resource.getAll.version;
    const url = `${this.resource.getAll.endpoint}?${qs}`;

    const response = await apiHandler.get<IPaginatedResponse<IDynamicPage>>(this.resolveURL(url,version));

    return response.data;
    
  }



}



