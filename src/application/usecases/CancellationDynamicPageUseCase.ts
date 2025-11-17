import { STATE_DYNAMIC_PAGE_CANCEL } from "../../presentation/features/dynamic-page/shared/constants/constants";
import type { IDynamicPageRepository } from "../interfaces/IDynamicPageRepository";

export class CancellationDynamicPageUseCase{
    
    constructor(private repo: IDynamicPageRepository){}


    async execute(id: string){
        
         try {
             return this.repo.updateDynamicPageStatus(id,STATE_DYNAMIC_PAGE_CANCEL.toString());
          } catch (err) {
            
              if (err instanceof Error) {
                throw new Error(`No se pudo dar de baja la pagina: ${err.message}`)
              }
              throw err
          }   
    }
}