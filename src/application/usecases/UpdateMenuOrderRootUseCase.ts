import type { IUpdateMenuOrderRootDto } from "../dtos/IUpdateMenuOrderRootDto";
import type { IMenuRepository } from "../interfaces/IMenuRepository";

export class UpdateMenuOrderRootUseCase{
    
    constructor(private repo: IMenuRepository){}


    async execute(data: IUpdateMenuOrderRootDto){
        try {
            return this.repo.updateOrderRoot(data);
          } catch (err) {
            
              if (err instanceof Error) {
                throw new Error(`No se pudo actualizar el menu: ${err.message}`)
              }
              throw err
          }           
    }
}