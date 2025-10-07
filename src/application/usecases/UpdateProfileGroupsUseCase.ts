import type { IProfileUpdateGroups } from "../dtos/IProfileUpdateGroups";
import type { IProfileRepository } from "../interfaces/IProfileRepository";

export class UpdateProfileGroupsUseCase{
    
    constructor(private repo: IProfileRepository){}


    async execute(id: string, data: IProfileUpdateGroups){
        
         try {
             return this.repo.updateProfileGroups(id,data);
          } catch (err) {
            
              if (err instanceof Error) {
                throw new Error(`No se pudo actualizar el perfil: ${err.message}`)
              }
              throw err
          }   
    }
}