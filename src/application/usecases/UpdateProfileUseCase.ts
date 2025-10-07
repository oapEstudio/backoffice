import type { IProfileUpdateDto } from "../dtos/IProfileUpdateDto";
import type { IProfileRepository } from "../interfaces/IProfileRepository";

export class UpdateProfileUseCase{
    
    constructor(private repo: IProfileRepository){}


    async execute(id: string, data: IProfileUpdateDto){
        try {
            return this.repo.updateProfile(id,data);
          } catch (err) {
            
              if (err instanceof Error) {
                throw new Error(`No se pudo actualizar el perfil: ${err.message}`)
              }
              throw err
          }           
    }
}