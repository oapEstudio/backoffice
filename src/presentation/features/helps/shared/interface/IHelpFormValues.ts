export interface IHelpFormValues {
  name: string;
  typeSearch?: number; 
  description: string;
  parentId?: string;
  profiles: {id: string,name: string}[],
  title: string;
  document: File[] | null,
  state: string;
  helpTypeId: string;
  helpDocumentTypeId?: string;
  link: string;
}