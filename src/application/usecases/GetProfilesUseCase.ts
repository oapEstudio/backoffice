import type { IProfile } from "../../domain/entities/IProfile";
import type { IProfileRepository } from "../interfaces/IProfileRepository";
import type { IPageParameters, IPaginatedResponse } from "../common/IPaginatedResponse";

export class GetProfilesUseCase {
    
  constructor(private repo: IProfileRepository) {}

  async execute(params: IPageParameters): Promise<IPaginatedResponse<IProfile>> {
     try {
        return this.repo.getProfiles(params);
    } catch (err) {
      
        if (err instanceof Error) {
          throw new Error(`No se pudieron cargar los perfiles: ${err.message}`)
        }
        throw err
    }
    
  }
}
