import type { IDynamicPage } from "../../domain/entities/IDynamicPage";
import type { IPageParameters, IPaginatedResponse } from "../common/IPaginatedResponse";
import type { ICreateDynamicPageDto } from "../dtos/ICreateDynamicPageDto";
import type { IDynamicPageUpdateProfiles } from "../dtos/IDynamicPageUpdateProfiles";
import type { IUpdateDynamicPageDto } from "../dtos/IUpdateDynamicPageDto";

export interface IDynamicPageRepository{
    
    getDynamicPages(params: IPageParameters): Promise<IPaginatedResponse<IDynamicPage>>;
    createDynamicPage(dto: ICreateDynamicPageDto): Promise<string>;
    getDynamicPageById(id: string): Promise<IDynamicPage>;
    updateDynamicPageStatus(id: string, statusId: string): Promise<IDynamicPage>;
    updateDynamicPageProfiles(id: string, payload: IDynamicPageUpdateProfiles): Promise<IDynamicPage>;
    updateDynamicPage(id: string, dto: IUpdateDynamicPageDto): Promise<IDynamicPage>;
}