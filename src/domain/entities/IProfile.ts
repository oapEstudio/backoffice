import type { IGroup } from "./IGroup";

export interface IProfile {
  id: string;
  name: string;
  description: string;
  statusId: number;
  statusDescription: string;
  statusColor: string;
  groupsCount: string;
  groups: IGroup[];
  dateCreated: Date;
  dateUpdated: Date;
  updatedBy: string;
}