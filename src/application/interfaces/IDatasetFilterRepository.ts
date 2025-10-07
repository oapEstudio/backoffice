import type { IFilter } from "../../domain/entities/IFilter";
import type { IFilterDataSetDto } from "../dtos/IFilterDataSetDto";

export interface IDatasetFilterRepository {
  getFilters(filters?: IFilterDataSetDto): Promise<IFilter[]>;
}