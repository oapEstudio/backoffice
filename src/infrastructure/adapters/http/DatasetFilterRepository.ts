import type { IFilterResponse } from "../../../application/common/IFilterResponse";
import type { IFilterDataSetDto } from "../../../application/dtos/IFilterDataSetDto";
import type { IDatasetFilterRepository } from "../../../application/interfaces/IDatasetFilterRepository";
import type { IFilter } from "../../../domain/entities/IFilter";
import { apiHandler } from "./apiHandler";
import { RepositoryAbstract } from "./RepositoryAbstract";


 
export class DatasetFilterRepository extends RepositoryAbstract implements IDatasetFilterRepository {

  constructor(public url: string,
             public version: string) {
    super();
  }
 
  async getFilters(filters?:IFilterDataSetDto): Promise<IFilter[]> {

    const url = this.resolveURL(filters?`${this.url}?${this.toQueryStringPagination(filters.filters)}`: this.url,this.version)
    
    const res = await apiHandler.get<IFilterResponse<IFilter>>(url);
   
    return res.data.data;
  }

  mock = [{
      Id: 'Mock1',
      description: 'Mock1',
      meta: null
    },{
      Id: 'Mock2',
      description: 'Mock2',
      meta: null
    },{
      Id: 'Mock3',
      description: 'Mock3',
      meta: null
    },{
      Id: 'Mock4',
      description: 'Mock4',
      meta: null
    }]
}