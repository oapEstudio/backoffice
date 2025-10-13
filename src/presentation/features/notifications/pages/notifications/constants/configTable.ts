import type { IColumn } from "../../../../../components/ui/table/table.interface";

export const Headers: IColumn[] =[{
    align: 'left',
    id: 'type',
    label: 'Tipo'
},{
    align: 'left',
    id: 'name',
    label: 'Nombre',
    order: 'name'
},{
    align: 'left',
    id: 'lastChangeView',
    label: 'Modificación',
    order: 'lastChange'
},{
    align: 'left',
    id: 'dateFrom',
    label: 'Publicación',
    order: 'dateFrom'
},{
    align: 'left',
    id: 'expired',
    label: 'Expiración',
    order: 'dateTO'
},{
    align: 'left',
    id: 'status',
    label: 'Estado',
    order: 'statusDescription'
},{
    align: 'left',
    id: 'profiles',
    label: 'Perfiles',
    order: 'profiles'
},{
    align: 'left',
    id: 'actions',
    label: 'Acciones'
},{
    align: 'left',
    id: 'cancellation',
    label: 'Baja'
}];