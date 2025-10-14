import type { IHelpDesk } from "../../domain/entities/IHelpDesk";
import type { IPageParameters, IPaginatedResponse } from "../common/IPaginatedResponse";


export interface IHelpDeskRepository{

    getHelpDeskItems(params: IPageParameters): Promise<IPaginatedResponse<IHelpDesk>>;

}