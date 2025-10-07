import type { IGroup } from "../../../../../../../domain/entities/IGroup";

export interface IProfileFormValues {
  name: string;
  description: string;
  statusId: number;
  groups: IGroup[];
}

