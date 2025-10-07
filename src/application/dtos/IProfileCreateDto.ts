export interface IProfileCreateDto {
  name: string;
  description: string;
  statusId: number;
  groups: string[]
}