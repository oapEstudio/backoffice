import type { IMenu } from "../../domain/entities/IMenu";
import type { IPageParameters, IPaginatedResponse } from "../common/IPaginatedResponse";
import type { IMenuRepository } from "../interfaces/IMenuRepository";

export class GetMenuUseCase {
    
  constructor(private repo: IMenuRepository) {}

  async execute(params: IPageParameters): Promise<IPaginatedResponse<IMenu>> {
     try {
        return this.repo.getMenues(params);
    } catch (err) {
      
        if (err instanceof Error) {
          throw new Error(`No se pudieron cargar los menues: ${err.message}`)
        }
        throw err
    }
    
  }
}