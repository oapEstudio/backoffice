import type { IMenuEditDto } from "../dtos/IMenuEditDto";
import type { IMenuRepository } from "../interfaces/IMenuRepository";

export class DeleteMenuUseCase{
    
    constructor(private repo: IMenuRepository){}


    async execute(id: string){
        try {
            return this.repo.deleteMenu(id);
          } catch (err) {
            
              if (err instanceof Error) {
                throw new Error(`No se pudo eliminar el menu: ${err.message}`)
              }
              throw err
          }           
    }
}