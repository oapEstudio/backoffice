import type { IStorageSas, StorageTemplate } from "../../domain/entities/IStorageSas";

export interface IStorageRepository {
    
    getStorageSas(
        template: StorageTemplate,
        forceRefresh?: boolean,
    ): Promise<IStorageSas>;
    
    refreshStorageSas(template: StorageTemplate): Promise<IStorageSas>;
}