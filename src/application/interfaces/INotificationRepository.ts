import type { INotification } from "../../domain/entities/INotification";
import type { IPageParameters, IPaginatedResponse } from "../common/IPaginatedResponse";
import type { INotificationCreateDto } from "../dtos/INotificationCreateDto";
import type { INotificationUpdateDto } from "../dtos/INotificationUpdateDto";
import type { INotificationUpdateProfiles } from "../dtos/INotificationUpdateProfiles";

export interface INotificationRepository{
    
    getNotifications(params: IPageParameters): Promise<IPaginatedResponse<INotification>>;
    createNotification(param: INotificationCreateDto): Promise<string>;
    updateNotificationsProfiles(id: string, payload: INotificationUpdateProfiles): Promise<INotification>;
    updateNotificationsStatus(id: string, statusId: string): Promise<INotification>;
    updateNotification(id: string,payload: INotificationUpdateDto): Promise<INotification>;
    getNotificationById(id: string): Promise<INotification>;
}