
export interface IHelp {
     id: string;
     name: string;
     title: string;
     description: string;
     helpTypeId: number;
     helpType: string;
     parentId: string;
     parent: string;
     link: string;
     statusId: number;
     status: string;
     helpDocumentTypeId: number;
     helpDocumentType: string;
     document: File[];
     profile: any[];  
     dateCreated: Date;
     dateUpdated: string;
     updatedBy: string;
}
