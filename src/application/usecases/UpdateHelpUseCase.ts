import type { IHelp } from "../../domain/entities/IHelp";
import type { IHelpUpdateDto } from "../dtos/IHelpUpdateDto";
import type { IHelpRepository } from "../interfaces/IHelpRepository";

export class UpdateHelpUseCase {
  constructor(private repo: IHelpRepository) {}

  execute(id: string, payload: IHelpUpdateDto): Promise<IHelp> {
    return this.repo.updateHelp(id, payload);
  }
}

