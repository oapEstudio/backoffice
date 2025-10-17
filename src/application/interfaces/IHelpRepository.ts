import type { IHelp } from "../../domain/entities/IHelp";
import type { IPageParameters, IPaginatedResponse } from "../common/IPaginatedResponse";
import type { IHelpCreateDto } from "../dtos/IHelpCreateDto";


export interface IHelpRepository{

    getHelps(params: IPageParameters): Promise<IPaginatedResponse<IHelp>>;
    createHelp(param: IHelpCreateDto): Promise<string>;
    getHelpById(id: string): Promise<IHelp>;

}