import type { IDynamicPageUpdateProfiles } from "../dtos/IDynamicPageUpdateProfiles";
import type { IDynamicPageRepository } from "../interfaces/IDynamicPageRepository";

export class UpdateDynamicPageProfilesUseCase{
    
    constructor(private repo: IDynamicPageRepository){}


    async execute(id: string, data: IDynamicPageUpdateProfiles){
        
         try {
             return this.repo.updateDynamicPageProfiles(id,data);
          } catch (err) {
            
              if (err instanceof Error) {
                throw new Error(`No se pudo actualizar los perfiles de la página: ${err.message}`)
              }
              throw err
          }   
    }
}