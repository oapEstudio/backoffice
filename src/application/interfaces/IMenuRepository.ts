import type { IMenu } from "../../domain/entities/IMenu";
import type { IPageParameters, IPaginatedResponse } from "../common/IPaginatedResponse";
import type { IHighlightMenuDto } from "../dtos/IHighlightMenuDto";
import type { IMenuCreateDto } from "../dtos/IMenuCreateDto";
import type { IMenuEditDto } from "../dtos/IMenuEditDto";
import type { IMenuProfileGroupUpdateDto } from "../dtos/IMenuProfileGroupUpdateDto";
import type { IUpdateMenuOrderDto } from "../dtos/IUpdateMenuOrderDto";
import type { IUpdateMenuOrderRootDto } from "../dtos/IUpdateMenuOrderRootDto";

export interface IMenuRepository {
  getMenues(params: IPageParameters): Promise<IPaginatedResponse<IMenu>>; 
  createMenu(dto: IMenuCreateDto): Promise<string>;
  updateMenuGroupsProfile(id: string, payload: IMenuProfileGroupUpdateDto): Promise<IMenu>;
  updateMenu(id: string, payload: IMenuEditDto): Promise<IMenu>;
  deleteMenu(id: string): Promise<IMenu>;
  updateOrder(params: IUpdateMenuOrderDto): Promise<IMenu>;
  updateOrderRoot(params: IUpdateMenuOrderRootDto): Promise<IMenu>;
  updateHightlightMenu(id: string,params: IHighlightMenuDto): Promise<IMenu>
}