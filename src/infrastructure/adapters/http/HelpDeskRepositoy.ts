import type { IPageParameters, IPaginatedResponse } from "../../../application/common/IPaginatedResponse";
import { RepositoryAbstract } from "./RepositoryAbstract";
import { env } from "../../config/env";
import type { IHelpDesk } from "../../../domain/entities/IHelpDesk";
import type { IHelpDeskRepository } from "../../../application/interfaces/IHelpDeskRepository";
import { apiHandler } from "./apiHandler";
import { MOCK_HELP_DESK_PAGINATED } from "./mock/getHelpDeskMock";


export class HelpDeskRepository extends RepositoryAbstract implements IHelpDeskRepository {

  resource = env.resources.helpDesk;

  async getHelpDeskItems(params: IPageParameters): Promise<IPaginatedResponse<IHelpDesk>> {

    // TODO Descomentar para usar el mock
    // return await resolveAfter(MOCK_HELP_DESK_PAGINATED, 300);
    return MOCK_HELP_DESK_PAGINATED;
    
    // TODO borrar cuando se use el mock  
    // const mapped = this.paramsMap(params);
    // const qs = this.toQueryStringPagination(mapped);

    // const version = this.resource.getAll.version;
    // const url = `${this.resource.getAll.endpoint}?${qs}`;

    // const response = await apiHandler.get<IPaginatedResponse<IHelpDesk>>(this.resolveURL(url, version));

   //  return response.data;
  }
}



