import { STATE_HELP_CANCEL } from "../../presentation/features/helps/shared/constants/helps";
import type { IHelpRepository } from "../interfaces/IHelpRepository";

export class CancellationHelpUseCase {

    constructor(private repo: IHelpRepository) { }


    async execute(id: string) {

        try {
            return this.repo.updateHelpsStatus(id, STATE_HELP_CANCEL.toString());
        } catch (err: any) {
            if (err instanceof Error) {
                throw new Error(`${err.message}`)
            }
            throw err;
        }
    }
}