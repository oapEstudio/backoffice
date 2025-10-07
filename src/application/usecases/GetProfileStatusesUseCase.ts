import type { IStatuses } from "../../domain/entities/IStatuses";
import type { IPageParameters, IPaginatedResponse } from "../common/IPaginatedResponse";
import type { IProfileRepository } from "../interfaces/IProfileRepository";

export class GetProfileStatusesUseCase {

     constructor(private repo: IProfileRepository) {}
    
      async execute(params: IPageParameters): Promise<IPaginatedResponse<IStatuses>> {
         try {
              return this.repo.getStatuses(params);
          } catch (err) {
            
              if (err instanceof Error) {
                throw new Error(`No al traer el estado de los perfiles: ${err.message}`)
              }
              throw err
          }   
      }
}