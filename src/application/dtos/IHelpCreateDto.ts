export interface IHelpCreateDto {
  helpType?: string;
  helpTypeId?: number;
  name: string;
  title: string;
  description: string;
  parentId: string;
  parent?: string;
  link: string;
  statusId: number | null;
  status?: string;
  helpDocumentTypeId?: string;
  helpDocumentType?: string;
  documents?: File[];
  profiles?: string[];
}