import type { INotificationCreateDto } from "../dtos/INotificationCreateDto";
import type { INotificationRepository } from "../interfaces/INotificationRepository";

export class CreateNotificationUseCase {
    
  constructor(private repo: INotificationRepository) {}

  execute(dto: INotificationCreateDto): Promise<string> {
    
    try {
       return this.repo.createNotification(dto);
    } catch (err) {
      
        if (err instanceof Error) {
          throw new Error(`No se pudo crear la notificación: ${err.message}`)
        }
        throw err
    }
  }
}