export interface IStorageSas {
    sas: IBlobStorageSas;
    pathTemplate: string;   
}
export interface IBlobStorageSas {
    containerPath: string;
    sasToken: string;
    expiresOn: Date
}
export enum StorageTemplate {
    Notification = "Notification",
    Help = "Help",
    Pages = "Pages",
}