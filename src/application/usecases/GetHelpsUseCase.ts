import type { IPageParameters, IPaginatedResponse } from "../common/IPaginatedResponse";
import type { IHelp } from "../../domain/entities/IHelp";
import type { IHelpRepository } from "../interfaces/IHelpRepository";

export class GetHelpUseCase {
    
  constructor(private repo: IHelpRepository) {}

  async execute(params: IPageParameters): Promise<IPaginatedResponse<IHelp>> {
     try {
        return this.repo.getHelps(params);
    } catch (err) {
      
        if (err instanceof Error) {
          throw new Error(`No se pudieron cargar los documentos: ${err.message}`)
        }
        throw err
    }
    
  }
}
