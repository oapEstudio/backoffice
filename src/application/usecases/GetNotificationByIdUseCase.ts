import type { INotification } from "../../domain/entities/INotification";
import type { INotificationRepository } from "../interfaces/INotificationRepository";

export class GetNotificationByIdUseCase {
  constructor(private repo: INotificationRepository) {}

  execute(id: string): Promise<INotification> {
    return this.repo.getNotificationById(id);
  }
}

