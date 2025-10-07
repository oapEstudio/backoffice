import type { IGroup } from "../../domain/entities/IGroup";
import type { IPageParameters, IPaginatedResponse } from "../common/IPaginatedResponse";
import type { IGroupRepository } from "../interfaces/IGroupRepository";

export class GetGroupsUseCase {
    
  constructor(private repo: IGroupRepository) {}

  async execute(params: IPageParameters): Promise<IPaginatedResponse<IGroup>> {
     try {
        return this.repo.getGroups(params);
    } catch (err) {
      
        if (err instanceof Error) {
          throw new Error(`No se pudieron cargar los grupos AD: ${err.message}`)
        }
        throw err
    }   
  }
}


const mock = {
      count: 4,
      data: [{
        description: 'prueba',
        name: 'Grupo 1'
      },{
        description: 'prueba',
        name: 'Grupo 2'
      },{
        description: 'prueba',
        name: 'Grupo 3'
      }],
      parameters: {
        page:1,
        pageSize: 1000,
        sortBy: null,
        sortDescending: false
      },

    };