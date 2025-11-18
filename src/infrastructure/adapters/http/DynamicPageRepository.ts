import type { IPageParameters, IPaginatedResponse } from "../../../application/common/IPaginatedResponse";
import { apiHandler } from "./apiHandler";

import { RepositoryAbstract } from "./RepositoryAbstract";
import { env } from "../../config/env";
import type { IDynamicPageRepository } from "../../../application/interfaces/IDynamicPageRepository";
import type { IDynamicPage } from "../../../domain/entities/IDynamicPage";
import type { ICreateDynamicPageDto } from "../../../application/dtos/ICreateDynamicPageDto";
import type { INotificationUpdateProfiles } from "../../../application/dtos/INotificationUpdateProfiles";
import type { IDynamicPageUpdateProfiles } from "../../../application/dtos/IDynamicPageUpdateProfiles";
import type { IUpdateDynamicPageDto } from "../../../application/dtos/IUpdateDynamicPageDto";


export class DynamicPageRepository extends RepositoryAbstract implements IDynamicPageRepository {

  resource = env.resources.dynamic_pages;


  async getDynamicPages(params: IPageParameters): Promise<IPaginatedResponse<IDynamicPage>> {
    
    const mapped = this.paramsMap(params);
    const qs = this.toQueryStringPagination(mapped);

    const version = this.resource.getAll.version;
    const url = `${this.resource.getAll.endpoint}?${qs}`;

    const response = await apiHandler.get<IPaginatedResponse<IDynamicPage>>(this.resolveURL(url,version));

    return response.data;
    
  }


hasElementData(el: any) {
  return el?.label || el?.text || el?.fontSize || el?.type || el?.file || el?.height || el?.align || el?.link;
}

normalizeDto(dto: ICreateDynamicPageDto) {
  const normSections = (dto.sections ?? [])
    .map(s => ({
      ...s,
      elements: (s.elements ?? []).filter(this.hasElementData) 
    }))
    .filter(s => (s.elements?.length ?? 0) > 0 || s.backgroundColor || s.order != null); // sacá secciones vacías


  const sections = normSections.map((s, siNew) => ({
    ...s,
    _idx: siNew,
    elements: (s.elements ?? []).map((e, eiNew) => ({ ...e, _eidx: eiNew }))
  }));

  return { ...dto, sections };
}

 async createDynamicPage(dto: ICreateDynamicPageDto): Promise<string> {

      const version = this.resource.create.version;
      const url = `${this.resource.create.endpoint}`;


      const form = new FormData();
      
      const ndto = this.normalizeDto(dto);
    
      form.append("title", ndto.title);

      ndto.profiles.forEach((p, i) => form.append(`profiles[${i}]`, p));
    
      this.appendFormDataIfDefined(form, "description", ndto.description);
      this.appendFormDataIfDefined(form, "hasMenu", ndto.hasMenu);
      this.appendFormDataIfDefined(form, "statusId", ndto.statusId);

      let contador = 0;
      ndto.sections?.forEach((section) => {


          if(section.backgroundColor  || section.elements.length > 0 ){

             

              this.appendFormDataIfDefined(form, `sections[${contador}].order`, section.order);
              this.appendFormDataIfDefined(form, `sections[${contador}].backgroundColor`, section.backgroundColor);

              section.elements?.forEach((el, ei) => {
                const base = `sections[${contador}].elements[${ei}]`;          
                this.appendFormDataIfDefined(form, `${base}.order`, el.order);
                this.appendFormDataIfDefined(form, `${base}.label`, el.label);
                this.appendFormDataIfDefined(form, `${base}.text`, el.text);
                this.appendFormDataIfDefined(form, `${base}.fontSize`, el.fontSize);
                this.appendFormDataIfDefined(form, `${base}.type`, el.type);
                this.appendFormDataIfDefined(form, `${base}.file`, el.file);
                this.appendFormDataIfDefined(form, `${base}.height`, el.height);
                this.appendFormDataIfDefined(form, `${base}.align`, el.align);
                this.appendFormDataIfDefined(form, `${base}.link`, el.link);
              });

               contador++;
          }
      });

      const res = await apiHandler.post<{ id: string }, FormData>(
        this.resolveURL(url, version),
        {},
        form
      );
      return res.data.id;
  }

 async getDynamicPageById(id: string): Promise<IDynamicPage> {
    const version = this.resource.edit.page.version;
    const url = this.resource.edit.page.endpoint.replace('{id}', id);

    const res = await apiHandler.get<IDynamicPage>(this.resolveURL(url, version));

    return res.data;
  }

   async updateDynamicPageStatus(id: string, statusId: string): Promise<IDynamicPage>{
             const url = this.resource.edit.status.endpoint.replace('{id}',id);
  
             const version = this.resource.edit.status.version;
        
             const res = await apiHandler.put<any>(this.resolveURL(url,version),{},{
              statusId
             });
        
             return res.data;
  
   }
    async updateDynamicPageProfiles(id: string, payload: IDynamicPageUpdateProfiles) {
         
              const url = this.resource.edit.profiles.endpoint.replace('{id}',id);
              const version = this.resource.edit.profiles.version;
         
              const res = await apiHandler.put<any>(this.resolveURL(url,version),{},payload);
         
              return res.data;
     }

      async updateDynamicPage(id: string, dto: IUpdateDynamicPageDto): Promise<IDynamicPage> {
        
        const version = this.resource.edit.page.version;
         const url = this.resource.edit.page.endpoint.replace('{id}', id);
     
         const form = new FormData();
    
         const ndto = this.normalizeDto(dto);
    
    
          form.append("title", ndto.title);

          ndto.profiles.forEach((p, i) => form.append(`profiles[${i}]`, p));
        
          this.appendFormDataIfDefined(form, "description", ndto.description);
          this.appendFormDataIfDefined(form, "hasMenu", ndto.hasMenu);
          this.appendFormDataIfDefined(form, "statusId", ndto.statusId);

          ndto.sections?.forEach((section, si) => {


                if(section.backgroundColor || section.elements.length > 0 ){
                    this.appendFormDataIfDefined(form, `sections[${si}].order`, section.order);
                    this.appendFormDataIfDefined(form, `sections[${si}].backgroundColor`, section.backgroundColor);

                    section.elements?.forEach((el, ei) => {
                      const base = `sections[${si}].elements[${ei}]`;          
                      this.appendFormDataIfDefined(form, `${base}.order`, el.order);
                      this.appendFormDataIfDefined(form, `${base}.label`, el.label);
                      this.appendFormDataIfDefined(form, `${base}.text`, el.text);
                      this.appendFormDataIfDefined(form, `${base}.fontSize`, el.fontSize);
                      this.appendFormDataIfDefined(form, `${base}.type`, el.type);
                      this.appendFormDataIfDefined(form, `${base}.file`, el.file);
                      this.appendFormDataIfDefined(form, `${base}.height`, el.height);
                      this.appendFormDataIfDefined(form, `${base}.align`, el.align);
                      this.appendFormDataIfDefined(form, `${base}.link`, el.link);
                    });
                }
            });

          const res = await apiHandler.post<IDynamicPage, FormData>(
            this.resolveURL(url, version),
            {},
            form
          );
          return res.data;
       }
     
  
}



