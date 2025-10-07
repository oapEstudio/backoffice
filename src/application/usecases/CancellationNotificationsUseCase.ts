import { STATE_NOTIFICATION_CAROUSEL_CANCEL } from "../../presentation/features/notifications/shared/constants/notifications";
import type { INotificationRepository } from "../interfaces/INotificationRepository";

export class CancellationNotificationUseCase{
    
    constructor(private repo: INotificationRepository){}


    async execute(id: string){
        
         try {
             return this.repo.updateNotificationsStatus(id,STATE_NOTIFICATION_CAROUSEL_CANCEL.toString());
          } catch (err) {
            
              if (err instanceof Error) {
                throw new Error(`No se pudo dar de baja la notificación: ${err.message}`)
              }
              throw err
          }   
    }
}