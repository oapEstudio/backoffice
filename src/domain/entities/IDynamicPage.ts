import type { IProfile } from "./IProfile";

export interface IDynamicPage{
    id:                         string;
    name:                       string;   
    description:                string;
    dateUpdated:                Date;
    url:                        string;
    statusId:                   number;
    statusDescription:          string;
    statusColor:                string;
    profiles:                    IProfile[];
    updatedBy:                  string;
}