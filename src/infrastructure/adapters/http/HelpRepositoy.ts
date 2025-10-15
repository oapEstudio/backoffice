import type { IPageParameters, IPaginatedResponse } from "../../../application/common/IPaginatedResponse";
import { RepositoryAbstract } from "./RepositoryAbstract";
import { env } from "../../config/env";
import type { IHelp } from "../../../domain/entities/IHelp";
import { apiHandler } from "./apiHandler";
import type { IHelpRepository } from "../../../application/interfaces/IHelpRepository";


export class HelpRepository extends RepositoryAbstract implements IHelpRepository {

  resource = env.resources.helps;

  async getHelps(params: IPageParameters): Promise<IPaginatedResponse<IHelp>> {

   
    const mapped = this.paramsMap(params);
    const qs = this.toQueryStringPagination(mapped);

    const version = this.resource.getAll.version;
    const url = `${this.resource.getAll.endpoint}?${qs}`;

    const response = await apiHandler.get<IPaginatedResponse<IHelp>>(this.resolveURL(url, version));

    console.log("Me ejecuto", response)
    return response.data;
  }
}



