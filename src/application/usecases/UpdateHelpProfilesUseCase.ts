import type { IHelpUpdateProfiles } from "../dtos/IHelpUpdateProfiles";
import type { IHelpRepository } from "../interfaces/IHelpRepository";

export class UpdateHelpProfilesUseCase{
    
    constructor(private repo: IHelpRepository){}


    async execute(id: string, data: IHelpUpdateProfiles){
        
         try {
             return this.repo.updateHelpProfiles(id,data);
          } catch (err) {
            
              if (err instanceof Error) {
                throw new Error(`No se pudo actualizar el item ayuda: ${err.message}`)
              }
              throw err
          }   
    }
}