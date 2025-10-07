import type { IHighlightMenuDto } from "../dtos/IHighlightMenuDto";
import type { IMenuRepository } from "../interfaces/IMenuRepository";

export class HighlightUseCase{
    
    constructor(private repo: IMenuRepository){}


    async execute(id: string,data: IHighlightMenuDto){
        try {
            return this.repo.updateHightlightMenu(id,data);
          } catch (err) {
            
              if (err instanceof Error) {
                throw new Error(`No se pudo destacar el menu: ${err.message}`)
              }
              throw err
          }           
    }
}