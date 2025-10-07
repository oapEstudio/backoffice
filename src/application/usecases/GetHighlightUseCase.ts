import type { IHighlight } from "../../domain/entities/IHighlight";
import type { IMenu } from "../../domain/entities/IMenu";
import type { IPageParameters, IPaginatedResponse } from "../common/IPaginatedResponse";
import type { IHighlightRepository } from "../interfaces/IHighlightRepository";
import type { IMenuRepository } from "../interfaces/IMenuRepository";

export class GetHighlightUseCase {
    
  constructor(private repo: IHighlightRepository) {}

  async execute(params: IPageParameters): Promise<IPaginatedResponse<IHighlight>> {
     try {
        return this.repo.getHighlight(params);
    } catch (err) {
      
        if (err instanceof Error) {
          throw new Error(`No se pudieron cargar los destacados: ${err.message}`)
        }
        throw err
    }
    
  }
}