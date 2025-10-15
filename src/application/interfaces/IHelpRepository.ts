import type { IHelp } from "../../domain/entities/IHelp";
import type { IPageParameters, IPaginatedResponse } from "../common/IPaginatedResponse";


export interface IHelpRepository{

    getHelps(params: IPageParameters): Promise<IPaginatedResponse<IHelp>>;

}