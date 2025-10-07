import type { INotificationUpdateProfiles } from "../dtos/INotificationUpdateProfiles";
import type { INotificationRepository } from "../interfaces/INotificationRepository";

export class UpdateNotificationsProfilesUseCase{
    
    constructor(private repo: INotificationRepository){}


    async execute(id: string, data: INotificationUpdateProfiles){
        
         try {
             return this.repo.updateNotificationsProfiles(id,data);
          } catch (err) {
            
              if (err instanceof Error) {
                throw new Error(`No se pudo actualizar la notificación: ${err.message}`)
              }
              throw err
          }   
    }
}