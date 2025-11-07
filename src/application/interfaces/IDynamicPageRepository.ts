import type { IDynamicPage } from "../../domain/entities/IDynamicPage";
import type { IPageParameters, IPaginatedResponse } from "../common/IPaginatedResponse";

export interface IDynamicPageRepository{
    
    getDynamicPages(params: IPageParameters): Promise<IPaginatedResponse<IDynamicPage>>;
    
}