import type { IPageParameters, IPaginatedResponse } from "../common/IPaginatedResponse";
import type { INotificationRepository } from "../interfaces/INotificationRepository";
import type { INotification } from "../../domain/entities/INotification";

export class GetNotificationsUseCase {
    
  constructor(private repo: INotificationRepository) {}

  async execute(params: IPageParameters): Promise<IPaginatedResponse<INotification>> {
     try {
        return this.repo.getNotifications(params);
    } catch (err) {
      
        if (err instanceof Error) {
          throw new Error(`No se pudieron cargar las notificaciones: ${err.message}`)
        }
        throw err
    }
    
  }
}
