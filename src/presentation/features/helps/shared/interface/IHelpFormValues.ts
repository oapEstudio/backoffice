import type { SelectOption } from "../../../../components/ui/inputs/multiselect/multiselect.interface";

export interface IHelpFormValues {
  name: string;
  description: string;
  parentId?: string;
  profiles: {id: string,name: string}[],
  title: string;
  document: File[],
  state: string;
  helpTypeId: string;
  helpDocumentTypeId: string | null;
  link: string;
}