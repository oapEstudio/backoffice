
export interface IHelpDesk {
     id: string;
     name: string;
     type: string;
     statusId: number;
     statusDescription: string;
     statusColor: string;
     dateLastUpdate: Date;
     updatedBy: string;
     url: string;
     groups: string[]; //TODO cambiar 
     groupsCount: string;
}
