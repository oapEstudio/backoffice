import type { IPageParameters, IPaginatedResponse } from "../common/IPaginatedResponse";
import type { IHelpDesk } from "../../domain/entities/IHelpDesk";
import type { IHelpDeskRepository } from "../interfaces/IHelpDeskRepository";

export class GetHelpDeskUseCase {
    
  constructor(private repo: IHelpDeskRepository) {}

  async execute(params: IPageParameters): Promise<IPaginatedResponse<IHelpDesk>> {
     try {
        return this.repo.getHelpDeskItems(params);
    } catch (err) {
      
        if (err instanceof Error) {
          throw new Error(`No se pudieron cargar los documentos: ${err.message}`)
        }
        throw err
    }
    
  }
}
