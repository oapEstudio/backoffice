import type { IPageParameters, IPaginatedResponse } from "../../../application/common/IPaginatedResponse";
import { RepositoryAbstract } from "./RepositoryAbstract";
import { env } from "../../config/env";
import type { IHelp } from "../../../domain/entities/IHelp";
import { apiHandler } from "./apiHandler";
import type { IHelpRepository } from "../../../application/interfaces/IHelpRepository";
import type { IHelpCreateDto } from "../../../application/dtos/IHelpCreateDto";
import type { IHelpUpdateProfiles } from "../../../application/dtos/IHelpUpdateProfiles";
import type { IHelpUpdateDto } from "../../../application/dtos/IHelpUpdateDto";


export class HelpRepository extends RepositoryAbstract implements IHelpRepository {

  resource = env.resources.helps;

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
    form.append('description', String(dto.description ?? ''));
    form.append('helpTypeId', String(dto.helpTypeId ?? ''));
    form.append('profiles', String(dto.profiles ?? ''));

    if (dto.documents instanceof File) {
    }

    form.append('statusId', String(dto.statusId ?? ''));


    if (Array.isArray(dto.profiles)) {
      for (const p of dto.profiles) form.append('profiles', String(p));
    }

    const res = await apiHandler.post<{ id: string }, FormData>(
      this.resolveURL(url, version),
      {},
      form
    );
    return res.data.id;
  }

  async updateHelp(id: string, dto: IHelpUpdateDto): Promise<IHelp> {
    console.log(dto)
    const version = this.resource.edit.helps.version;
    const url = this.resource.edit.helps.endpoint.replace('{id}', id);

    const form = new FormData();
    form.append('name', String(dto.name ?? ''));
    form.append('title', String(dto.title ?? ''));
    form.append('description', String(dto.description ?? ''));
    form.append('helpTypeId', String(dto.helpTypeId ?? ''));

    if (dto.documents instanceof File) {
    }

    form.append('statusId', String(dto.statusId ?? ''));


    const res = await apiHandler.put<IHelp, FormData>(this.resolveURL(url, version), {}, form);
    return res.data;
  }

  async updateHelpProfiles(id: string, payload: IHelpUpdateProfiles) {

    const url = this.resource.edit.profiles.endpoint.replace('{id}', id);
    const version = this.resource.edit.profiles.version;

    const res = await apiHandler.put<any>(this.resolveURL(url, version), {}, payload);

    return res.data;
  }

  async updateHelpsStatus(id: string, statusId: string): Promise<IHelp> {
    const url = this.resource.edit.status.endpoint.replace('{id}', id);

    const version = this.resource.edit.status.version;

    const res = await apiHandler.put<any>(this.resolveURL(url, version), {}, {
      statusId
    });

    return res.data;

  }
}



