export interface IHelpUpdateDto {
  helpType?: string;
  helpTypeId?: number;
  name: string;
  title: string;
  description: string;
  parentId?: string;
  parent?: string;
  link: string;
  statusId: number;
  status?: string;
  helpDocumentTypeId?: string;
  helpDocumentType?: string;
  documents?: File[];
  profiles?: string[];
  id?: string;
}