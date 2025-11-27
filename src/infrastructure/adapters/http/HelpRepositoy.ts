import type { IPageParameters, IPaginatedResponse } from "../../../application/common/IPaginatedResponse";
import { RepositoryAbstract } from "./RepositoryAbstract";
import { env } from "../../config/env";
import type { IHelp } from "../../../domain/entities/IHelp";
import { apiHandler } from "./apiHandler";
import type { IHelpRepository } from "../../../application/interfaces/IHelpRepository";
import type { IHelpCreateDto } from "../../../application/dtos/IHelpCreateDto";
import type { IHelpUpdateProfiles } from "../../../application/dtos/IHelpUpdateProfiles";
import type { IHelpUpdateDto } from "../../../application/dtos/IHelpUpdateDto";
import type { IStorageRepository } from "../../../application/interfaces/IStorageRepository";
import { StorageRepository } from "./StorageRepository";
import { StorageTemplate } from "../../../domain/entities/IStorageSas";


export class HelpRepository extends RepositoryAbstract implements IHelpRepository {

  resource = env.resources.helps;

  constructor(private readonly storageRepo: IStorageRepository = new StorageRepository()) {
        super();
      }
  async getHelps(params: IPageParameters): Promise<IPaginatedResponse<IHelp>> {

    const mapped = this.paramsMap(params);
    const qs = this.toQueryStringPagination(mapped);

    const version = this.resource.getAll.version;
    const url = `${this.resource.getAll.endpoint}?${qs}`;

    const response = await apiHandler.get<IPaginatedResponse<IHelp>>(this.resolveURL(url, version));

    return response.data;
  }

  async getHelpById(id: string): Promise<IHelp> {
    const version = this.resource.edit.helps.version;
    const url = this.resource.edit.helps.endpoint.replace('{id}', id);
    const res = await apiHandler.get<IHelp>(this.resolveURL(url, version));
    return res.data;
  }

  async createHelp(dto: IHelpCreateDto): Promise<string> {
    
    const version = this.resource.create.version;
    const url = `${this.resource.create.endpoint}`;

    const form = new FormData();
    
    form.append('name', String(dto.name ?? ''));
    form.append('title', String(dto.title ?? ''));
    form.append('helpTypeId', String(dto.helpTypeId ?? ''));
    form.append('helpDocumentTypeId', String(dto.helpDocumentTypeId ?? ''));
    form.append('description', String(dto.description ?? ''));
    form.append('parentId', String(dto.parentId ?? ''));
    form.append('link', String(dto.link ?? ''));

    if (dto.documents) {
      const files = Array.isArray(dto.documents) ? dto.documents : [dto.documents];
      
      files.forEach(async (file) => {

        if (file instanceof File) {
          const path = await this.uploadFileToStorage(
                                                          file,
                                                          this.storageRepo,       
                                                          StorageTemplate.Help,
                                                          dto.name,
                                                          file.name);
          form.append('documents', path);          
        }

      });
    }

    form.append('statusId', String(dto.statusId ?? ''));


    if (Array.isArray(dto.profiles)) {
      for (const p of dto.profiles) form.append('profiles', String(p));
    }

    try {
      const res = await apiHandler.post<{ id: string }, FormData>(
        this.resolveURL(url, version),
        {},
        form
      );

      return res.data.id;
    } catch (error: any) {
      throw { error };
    }
  }

  async updateHelp(id: string, dto: IHelpUpdateDto): Promise<IHelp> {
    const version = this.resource.edit.helps.version;
    const url = this.resource.edit.helps.endpoint.replace('{id}', id);

    const form = new FormData();
    form.append('name', String(dto.name ?? ''));
    form.append('title', String(dto.title ?? ''));
    form.append('helpTypeId', String(dto.helpTypeId ?? ''));
    form.append('helpDocumentTypeId', String(dto.helpDocumentTypeId ?? ''));
    form.append('description', String(dto.description ?? ''));
    form.append('parentId', String(dto.parentId ?? ''));
    form.append('link', String(dto.link ?? ''));

    if (dto.documents) {

      const files = Array.isArray(dto.documents) ? dto.documents : [dto.documents];

      files.forEach(async (file) => {
       
        if (file instanceof File) {
          const path = await this.uploadFileToStorage(
                                                          file,
                                                          this.storageRepo,       
                                                          StorageTemplate.Help,
                                                          dto.name,
                                                          file.name);
          form.append('documents', path);          
        }

      });
      
    }

    form.append('statusId', String(dto.statusId ?? ''));


    try {
      const res = await apiHandler.put<IHelp, FormData>(this.resolveURL(url, version), {}, form);
      return res.data;
    } catch (error: any) {
      throw { error };
    }
  }

  async updateHelpProfiles(id: string, payload: IHelpUpdateProfiles) {

    const url = this.resource.edit.profiles.endpoint.replace('{id}', id);
    const version = this.resource.edit.profiles.version;

    try {
      const res = await apiHandler.put<any>(this.resolveURL(url, version), {}, payload);
      return res.data;
    } catch (error: any) {
      throw { error };
    }
  }

  async updateHelpsStatus(id: string, statusId: string): Promise<IHelp> {
    const url = this.resource.edit.status.endpoint.replace('{id}', id);

    const version = this.resource.edit.status.version;

    try {
      const res = await apiHandler.put<any>(this.resolveURL(url, version), {}, {
        statusId
      });

      return res.data;
    } catch (error: any) {
      throw { error };
    }
  }
}



