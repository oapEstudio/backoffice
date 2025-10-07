import type { IFilter } from "../../domain/entities/IFilter";
import type { IFilterDataSetDto } from "../dtos/IFilterDataSetDto";
import type { IDatasetFilterRepository } from "../interfaces/IDatasetFilterRepository";

export class GetDatasetFiltersUseCase {
  
  constructor(private repo: IDatasetFilterRepository) {}
 
  execute(filters?: IFilterDataSetDto): Promise<IFilter[]> {
   
    try {
       return this.repo.getFilters(filters);
    } catch (err) {
      
        if (err instanceof Error) {
          throw new Error(`No al traer los filtros de perfiles: ${err.message}`)
        }
        throw err
    }
  }
}