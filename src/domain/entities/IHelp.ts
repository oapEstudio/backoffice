
export interface IHelp {
     id: string;
     name: string;
     helpTypeId: number;
     helpType: string;
     parentId: string;
     parent: string;
     link: string;
     statusId: number;
     status: string;
     helpDocumentTypeId: number;
     helpDocumentType: string;
     document: any[];
     profile: any[]; //TODO cambiar 
     dateCreated: Date;
     dateUpdated: string;
     updatedBy: string;
}
