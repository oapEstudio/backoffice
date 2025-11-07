import type { IHelp } from "../../domain/entities/IHelp";
import type { IPageParameters, IPaginatedResponse } from "../common/IPaginatedResponse";
import type { IHelpCreateDto } from "../dtos/IHelpCreateDto";
import type { IHelpUpdateDto } from "../dtos/IHelpUpdateDto";
import type { IHelpUpdateProfiles } from "../dtos/IHelpUpdateProfiles";


export interface IHelpRepository{

    getHelps(params: IPageParameters): Promise<IPaginatedResponse<IHelp>>;
    createHelp(param: IHelpCreateDto): Promise<string>;
    getHelpById(id: string): Promise<IHelp>;
    updateHelpProfiles(id: string, payload: IHelpUpdateProfiles): Promise<IHelp>; 
    updateHelpsStatus(id: string, statusId: string): Promise<IHelp>;
    updateHelp(id: string, payload: IHelpUpdateDto): Promise<IHelp>;
}