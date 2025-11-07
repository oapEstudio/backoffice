import type { IPageParameters, IPaginatedResponse } from "../common/IPaginatedResponse";
import type { IDynamicPageRepository } from "../interfaces/IDynamicPageRepository";
import type { IDynamicPage } from "../../domain/entities/IDynamicPage";

export class GetDynamicPagesUseCase {
    
  constructor(private repo: IDynamicPageRepository) {}

  async execute(params: IPageParameters): Promise<IPaginatedResponse<IDynamicPage>> {
     try {
        return this.repo.getDynamicPages(params);
    } catch (err) {
      
        if (err instanceof Error) {
          throw new Error(`No se pudieron cargar las paginas estáticas: ${err.message}`)
        }
        throw err
    }
    
  }
}
