export interface IHelpFormValues {
  name: string;
  description: string;
  parentId: string | null;
  profiles: {id: string,name: string}[],
  title: string;
  document: File[],
  state: string;
  helpTypeId: string;
  helpDocumentTypeId: string | null;
  link: string;
}