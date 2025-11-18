import type { ICreateDynamicPageDto } from "../dtos/ICreateDynamicPageDto";
import type { IDynamicPageRepository } from "../interfaces/IDynamicPageRepository";

export class CreateDynamicPageUseCase {
    
  constructor(private repo: IDynamicPageRepository) {}

  execute(dto: ICreateDynamicPageDto): Promise<string> {
    
    try {
       return this.repo.createDynamicPage(dto);
    } catch (err) {
      
        if (err instanceof Error) {
          throw new Error(`No se pudo crear la notificación: ${err.message}`)
        }
        throw err
    }
  }
}