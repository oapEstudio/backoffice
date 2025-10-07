import type { IMenuEditDto } from "../dtos/IMenuEditDto";
import type { IUpdateMenuOrderDto } from "../dtos/IUpdateMenuOrderDto";
import type { IMenuRepository } from "../interfaces/IMenuRepository";

export class UpdateMenuOrderUseCase{
    
    constructor(private repo: IMenuRepository){}


    async execute(data: IUpdateMenuOrderDto){
        try {
            return this.repo.updateOrder(data);
          } catch (err) {
            
              if (err instanceof Error) {
                throw new Error(`No se pudo actualizar el menu: ${err.message}`)
              }
              throw err
          }           
    }
}