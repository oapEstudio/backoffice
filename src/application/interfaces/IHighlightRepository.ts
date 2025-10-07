import type { IHighlight } from "../../domain/entities/IHighlight";
import type { IPageParameters, IPaginatedResponse } from "../common/IPaginatedResponse";

export interface IHighlightRepository{
     getHighlight(params: IPageParameters): Promise<IPaginatedResponse<IHighlight>>;
}