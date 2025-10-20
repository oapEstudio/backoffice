import type { IHelp } from "../../domain/entities/IHelp";
import type { IHelpRepository } from "../interfaces/IHelpRepository";

export class GetHelpByIdUseCase {
  constructor(private repo: IHelpRepository) {}

  execute(id: string): Promise<IHelp> {
    return this.repo.getHelpById(id);
  }
}

