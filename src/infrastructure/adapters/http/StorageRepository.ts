
import type { IStorageRepository } from "../../../application/interfaces/IStorageRepository";
import type { IStorageSas, StorageTemplate } from "../../../domain/entities/IStorageSas";
import { env } from "../../config/env";

import { apiHandler } from "./apiHandler";
import { mock } from "./mock/getStorageSasMock";
import { RepositoryAbstract } from "./RepositoryAbstract";
 
export class StorageRepository
       extends RepositoryAbstract
       implements IStorageRepository {



    async getStorageSas(
        template: StorageTemplate,
        forceRefresh = false,
    ): Promise<IStorageSas> {
        
        
        const { endpoint, version } = env.resources.storage.sas;
 
        const url = this.resolveURL(endpoint, version);
        const query = new URLSearchParams({ template });
        const refreshQuery = forceRefresh ? "&refresh=true" : "";
 
        return mock;
        const response = await apiHandler.get<IStorageSas>(
            `${url}?${query.toString()}${refreshQuery}`,
        );
 
        return response.data;        
    }
 
    async refreshStorageSas(template: StorageTemplate): Promise<IStorageSas> {
        return this.getStorageSas(template, true);
    }
}