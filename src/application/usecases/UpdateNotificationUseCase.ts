import type { INotification } from "../../domain/entities/INotification";
import type { INotificationUpdateDto } from "../dtos/INotificationUpdateDto";
import type { INotificationRepository } from "../interfaces/INotificationRepository";

export class UpdateNotificationUseCase {
  constructor(private repo: INotificationRepository) {}

  execute(id: string, payload: INotificationUpdateDto): Promise<INotification> {
    return this.repo.updateNotification(id, payload);
  }
}

