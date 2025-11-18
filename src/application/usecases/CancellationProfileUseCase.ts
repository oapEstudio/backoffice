import { STATE_PROFILE_CANCEL } from "../../presentation/features/shared/constants/profile";
import type { IProfileRepository } from "../interfaces/IProfileRepository";

export class CancellationProfileUseCase {

    constructor(private repo: IProfileRepository) { }


    async execute(id: string) {

        try {
            return this.repo.updateProfileStatus(id, STATE_PROFILE_CANCEL.toString());
        } catch (err: any) {
            if (err instanceof Error) {
                throw new Error(`${err.message}`)
            }
            throw err;
        }
    }
}