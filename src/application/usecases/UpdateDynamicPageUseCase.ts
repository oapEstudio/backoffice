import type { IUpdateDynamicPageDto } from "../dtos/IUpdateDynamicPageDto";
import type { IDynamicPageRepository } from "../interfaces/IDynamicPageRepository";

export class UpdateDynamicPageUseCase{
    
    constructor(private repo: IDynamicPageRepository){}


    async execute(id: string, data: IUpdateDynamicPageDto){
        
         try {
             return this.repo.updateDynamicPage(id,data);
          } catch (err) {
            
              if (err instanceof Error) {
                throw new Error(`No se pudo actualizar la página: ${err.message}`)
              }
              throw err
          }   
    }
}