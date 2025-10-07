import type { IPageParameters, IPaginatedResponse } from "../../../application/common/IPaginatedResponse";
import type { IProfile } from "../../../domain/entities/IProfile";
import { apiHandler } from "./apiHandler";

import { RepositoryAbstract } from "./RepositoryAbstract";
import { env } from "../../config/env";
import type { INotification } from "../../../domain/entities/INotification";
import type { INotificationRepository } from "../../../application/interfaces/INotificationRepository";
import { mockPaginatedResponse, resolveAfter } from "./mock/getNotificationmock";
import type { INotificationCreateDto } from "../../../application/dtos/INotificationCreateDto";
import type { INotificationUpdateProfiles } from "../../../application/dtos/INotificationUpdateProfiles";
import type { INotificationUpdateDto } from "../../../application/dtos/INotificationUpdateDto";


export class NotificationRepository extends RepositoryAbstract implements INotificationRepository {

  resource = env.resources.notifications;


  async getNotifications(params: IPageParameters): Promise<IPaginatedResponse<INotification>> {
    
  
    //return  await resolveAfter(mockPaginatedResponse, 300);
    const mapped = this.paramsMap(params);
    const qs = this.toQueryStringPagination(mapped);

    const version = this.resource.getAll.version;
    const url = `${this.resource.getAll.endpoint}?${qs}`;

    const response = await apiHandler.get<IPaginatedResponse<INotification>>(this.resolveURL(url,version));

    return response.data;
    
  }

  async updateNotificationsProfiles(id: string, payload: INotificationUpdateProfiles) {
      
           const url = this.resource.edit.profiles.endpoint.replace('{id}',id);
           const version = this.resource.edit.profiles.version;
      
           const res = await apiHandler.put<any>(this.resolveURL(url,version),{},payload);
      
           return res.data;
  }

 async updateNotificationsStatus(id: string, statusId: string): Promise<INotification>{
           const url = this.resource.edit.status.endpoint.replace('{id}',id);

           const version = this.resource.edit.status.version;
      
           const res = await apiHandler.put<any>(this.resolveURL(url,version),{},{
            statusId
           });
      
           return res.data;

 }


  async createNotification(dto: INotificationCreateDto): Promise<string> {
    const version = this.resource.create.version;
    const url = `${this.resource.create.endpoint}`;
    const form = new FormData();

    form.append('notificationTypeId', String(dto.notificationTypeId ?? ''));
    form.append('slideName', String(dto.slideName ?? ''));
    form.append('title', String(dto.title ?? ''));
    form.append('description', String(dto.description ?? ''));

    if (dto.image instanceof File) {
      form.append('image', dto.image, dto.image.name);
    }
    
    form.append('buttonText', String(dto.buttonText ?? ''));
    form.append('buttonLink', String(dto.buttonLink ?? ''));
    form.append('statusId', String(dto.statusId ?? ''));

    if (dto.dateFrom) form.append('dateFrom', dto.dateFrom);
    if (dto.timeFrom) form.append('timeFrom', dto.timeFrom);
    if (dto.dateTO) form.append('dateTO', dto.dateTO);
    if (dto.timeTO) form.append('timeTO', dto.timeTO);

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

  async getNotificationById(id: string): Promise<INotification> {
    const version = this.resource.edit.notification.version;
    const url = this.resource.edit.notification.endpoint.replace('{id}', id);
    const res = await apiHandler.get<INotification>(this.resolveURL(url, version));
    return res.data;
  }

  async updateNotification(id: string, payload: INotificationUpdateDto): Promise<INotification> {
    const version = this.resource.edit.notification.version;
    const url = this.resource.edit.notification.endpoint.replace('{id}', id);

    const form = new FormData();
    form.append('notificationTypeId', String(payload.notificationTypeId ?? ''));
    form.append('slideName', String(payload.slideName ?? ''));
    form.append('title', String(payload.title ?? ''));
    form.append('description', String(payload.description ?? ''));
    if (payload.image instanceof File) {
      form.append('image', payload.image, payload.image.name);
    }
    form.append('buttonText', String(payload.buttonText ?? ''));
    form.append('buttonLink', String(payload.buttonLink ?? ''));
    form.append('statusId', String(payload.statusId ?? ''));

    if (payload.dateFrom) form.append('dateFrom', payload.dateFrom as unknown as string);
    if (payload.timeFrom) form.append('timeFrom', payload.timeFrom as unknown as string);
    if (payload.dateTo) form.append('dateTO', payload.dateTo as unknown as string);
    if (payload.timeTo) form.append('timeTO', payload.timeTo as unknown as string);

    const res = await apiHandler.put<INotification, FormData>(this.resolveURL(url, version), {}, form);
    return res.data;
  }

 

}



