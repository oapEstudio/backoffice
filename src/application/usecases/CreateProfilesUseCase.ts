import type { IProfileCreateDto } from "../dtos/IProfileCreateDto";
import type { IProfileRepository } from "../interfaces/IProfileRepository";

export class CreateProfileUseCase {
    
  constructor(private repo: IProfileRepository) {}

  execute(dto: IProfileCreateDto): Promise<string> {
    
    try {
       return this.repo.createProfile(dto);
    } catch (err) {
      
        if (err instanceof Error) {
          throw new Error(`No se pudo crear el perfil: ${err.message}`)
        }
        throw err
    }
  }
}