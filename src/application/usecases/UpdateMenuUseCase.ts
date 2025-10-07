import type { IMenuEditDto } from "../dtos/IMenuEditDto";
import type { IMenuRepository } from "../interfaces/IMenuRepository";

export class UpdateMenuUseCase{
    
    constructor(private repo: IMenuRepository){}


    async execute(id: string, data: IMenuEditDto){
        try {
            return this.repo.updateMenu(id,data);
          } catch (err) {
            
              if (err instanceof Error) {
                throw new Error(`No se pudo actualizar el menu: ${err.message}`)
              }
              throw err
          }           
    }
}