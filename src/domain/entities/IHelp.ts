
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
     statusDescription: string;
     statusColor: string;
     helpDocumentTypeId: number;
     helpDocumentType: string;
     document: any[];   
     profiles: any[]; 
     dateCreated: Date;
     dateUpdated: string;
     updatedBy: string;
     isParentSection: boolean;
}