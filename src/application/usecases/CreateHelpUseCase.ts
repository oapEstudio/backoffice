import type { IHelpCreateDto } from "../dtos/IHelpCreateDto";
import type { IMenuCreateDto } from "../dtos/IMenuCreateDto";
import type { IHelpRepository } from "../interfaces/IHelpRepository";
import type { IMenuRepository } from "../interfaces/IMenuRepository";

export class CreateHelpUseCase {
    
  constructor(private repo: IHelpRepository) {}

  execute(dto: IHelpCreateDto): Promise<string> {
    
    try {
       return this.repo.createHelp(dto);
    } catch (err) {
      
        if (err instanceof Error) {
          throw new Error(`No se pudo crear el menu: ${err.message}`)
        }
        throw err
    }
  }
}