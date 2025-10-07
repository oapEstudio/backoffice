import type { IMenuProfileGroupUpdateDto } from "../dtos/IMenuProfileGroupUpdateDto";
import type { IMenuRepository } from "../interfaces/IMenuRepository";


export class UpdateMenuProfileGroupUseCase{
    
    constructor(private repo: IMenuRepository){}


    async execute(id: string, data: IMenuProfileGroupUpdateDto){
        
         try {
             return this.repo.updateMenuGroupsProfile(id,data);
          } catch (err) {
            
              if (err instanceof Error) {
                throw new Error(`No se pudo actualizar el perfil: ${err.message}`)
              }
              throw err
          }   
    }
}