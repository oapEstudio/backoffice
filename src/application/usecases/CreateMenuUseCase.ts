import type { IMenuCreateDto } from "../dtos/IMenuCreateDto";
import type { IMenuRepository } from "../interfaces/IMenuRepository";

export class CreateMenuUseCase {
    
  constructor(private repo: IMenuRepository) {}

  execute(dto: IMenuCreateDto): Promise<string> {
    
    try {
       return this.repo.createMenu(dto);
    } catch (err) {
      
        if (err instanceof Error) {
          throw new Error(`No se pudo crear el menu: ${err.message}`)
        }
        throw err
    }
  }
}