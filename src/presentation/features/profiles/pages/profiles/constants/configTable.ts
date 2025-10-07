import type { IColumn } from "../../../../../components/ui/table/table.interface";

export const Headers: IColumn[] =[{
    align: 'left',
    id: 'name',
    label: 'Perfil'
},{
    align: 'left',
    id: 'lastChangeView',
    label: 'Ultima modificación',
    order: 'dateupdated'
},{
    align: 'left',
    id: 'groups',
    label: 'Grupos AD',
    order: 'groupsCount'
},{
    align: 'left',
    id: 'state',
    label: 'Estado',
    order: 'statusDescription'
},{
    align: 'left',
    id: 'actions',
    label: 'Acciones'
}];