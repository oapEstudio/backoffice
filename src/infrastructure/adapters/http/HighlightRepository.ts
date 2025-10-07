import type { IPageParameters, IPaginatedResponse } from "../../../application/common/IPaginatedResponse";
import type { IHighlightRepository } from "../../../application/interfaces/IHighlightRepository";
import type { IHighlight } from "../../../domain/entities/IHighlight";
import { env } from "../../config/env";
import { apiHandler } from "./apiHandler";
import { Mock } from "./mock/getMenumock";
import { RepositoryAbstract } from "./RepositoryAbstract";

export class HighlightRepository extends RepositoryAbstract implements IHighlightRepository {
    
    resource = env.resources.menu;
    
    async getHighlight(params: IPageParameters): Promise<IPaginatedResponse<IHighlight>> {
        const mapped = this.paramsMap(params);
        const qs = this.toQueryStringPagination(mapped);
        
        const version = this.resource.highlight.version;
        const url = `${this.resource.highlight.endpoint}?${qs}`;
       
       
        const response = await apiHandler.get<IPaginatedResponse<IHighlight>>(this.resolveURL(url,version));
       
        return response.data;
    }
    
    
}

