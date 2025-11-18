import type { IDynamicPage } from "../../domain/entities/IDynamicPage";
import type { IDynamicPageRepository } from "../interfaces/IDynamicPageRepository";

export class GetDynamicPageByIdUseCase {
  constructor(private repo: IDynamicPageRepository) {}

  execute(id: string): Promise<IDynamicPage> {
    return this.repo.getDynamicPageById(id);
  }
}

