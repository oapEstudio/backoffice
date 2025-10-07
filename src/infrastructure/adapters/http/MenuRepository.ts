import type { IPageParameters, IPaginatedResponse } from "../../../application/common/IPaginatedResponse";
import type { IHighlightMenuDto } from "../../../application/dtos/IHighlightMenuDto";
import type { IMenuCreateDto } from "../../../application/dtos/IMenuCreateDto";
import type { IMenuEditDto } from "../../../application/dtos/IMenuEditDto";
import type { IMenuProfileGroupUpdateDto } from "../../../application/dtos/IMenuProfileGroupUpdateDto";
import type { IUpdateMenuOrderDto } from "../../../application/dtos/IUpdateMenuOrderDto";
import type { IUpdateMenuOrderRootDto } from "../../../application/dtos/IUpdateMenuOrderRootDto";
import type { IMenuRepository } from "../../../application/interfaces/IMenuRepository";
import type { IMenu } from "../../../domain/entities/IMenu";
import { env } from "../../config/env";
import { apiHandler } from "./apiHandler";
import { Mock } from "./mock/getMenumock";
import { RepositoryAbstract } from "./RepositoryAbstract";

export class MenuRepository extends RepositoryAbstract implements IMenuRepository {
   
  
    resource = env.resources.menu;
    
    async getMenues(params: IPageParameters): Promise<IPaginatedResponse<IMenu>> {


        //return Mock;
        const mapped = this.paramsMap(params);
        const qs = this.toQueryStringPagination(mapped);
        
        const version = this.resource.getAll.version;
        const url = `${this.resource.getAll.endpoint}?${qs}`;
       
       
        const response = await apiHandler.get<IPaginatedResponse<IMenu>>(this.resolveURL(url,version));
       
        return response.data;
    }
    async createMenu(dto: IMenuCreateDto): Promise<string> {
         const version = this.resource.create.version;
         const url = `${this.resource.create.endpoint}`;
        
         const res = await apiHandler.post<{ id: string }, IMenuCreateDto>(
                this.resolveURL(url,version),
                {},
                dto
        )
        
        return res.data.id;
    }
      async updateMenuGroupsProfile(id: string, payload: IMenuProfileGroupUpdateDto) {
    
         const url = this.resource.edit.groupsProfile.endpoint.replace('{id}',id);
         const version = this.resource.edit.groupsProfile.version;
    
         const res = await apiHandler.put<any>(this.resolveURL(url,version),{},payload);
    
         return res.data;
      }

      async updateMenu(id: string, payload: IMenuEditDto): Promise<IMenu> {
         const url = this.resource.edit.menu.endpoint.replace('{id}',id);
         const version = this.resource.edit.menu.version;
       
         const res = await apiHandler.put<IMenu>(this.resolveURL(url,version),{},payload);
       
         return res.data;
      }
    
    async deleteMenu(id: string): Promise<IMenu> {
         const url = this.resource.delete.endpoint.replace('{id}',id);
         const version = this.resource.delete.version;
       
         const res = await apiHandler.delete<IMenu>(this.resolveURL(url,version));
       
         return res.data;
    }
    
    async updateOrder(params: IUpdateMenuOrderDto): Promise<IMenu> {
        const url = this.resource.edit.order.endpoint.replace('{id}',params.id);
        const version = this.resource.edit.order.version;
       
        const res = await apiHandler.put<IMenu>(this.resolveURL(url,version),{},{
            children: params.children
        });
       
        return res.data;
    }
     async updateOrderRoot(params: IUpdateMenuOrderRootDto): Promise<IMenu> {

        const url = this.resource.edit.orderRoot.endpoint;
        const version = this.resource.edit.orderRoot.version;
       
        const res = await apiHandler.put<IMenu>(this.resolveURL(url,version),{},params);
       
        return res.data;
    }
    
    async updateHightlightMenu(id: string,params: IHighlightMenuDto): Promise<IMenu> {
        
        const url = this.resource.edit.highlight.endpoint.replace('{id}',id);
        const version = this.resource.edit.highlight.version;
       
        const res = await apiHandler.put<IMenu>(this.resolveURL(url,version),{},params);
       
        return res.data;
    }
    
}

