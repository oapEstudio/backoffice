import type { IProfile } from "./IProfile";

export interface INotification {
    id:                          string;
    notificationTypeId:          number;
    notificationTypeDescription: string;
    notificationTypeColor:       string;
    name:                   string;
    title:                       string;
    description:                 string;
    imagenLink:                  string;
    buttonText:                  string;
    buttonLink:                  string;
    statusId:                    number;
    statusDescription:           string;
    statusColor:                 string;
    hasImmediatePublication:     boolean;
    dateFrom:                    Date;
    dateTO:                      Date;
    timeTO:                      Date;
    timeFrom:                    Date;
    hasExpiration:               boolean;
    profiles:                    IProfile[];
    dateCreated:                 Date;
    dateUpdated:                 Date;
    updatedBy:                   string;
}
