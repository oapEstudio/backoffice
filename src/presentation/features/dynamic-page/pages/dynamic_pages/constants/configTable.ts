import type { IColumn } from "../../../../../components/ui/table/table.interface";

export const Headers: IColumn[] =[{
    align: 'left',
    id: 'name',
    label: 'Nombre',
    order: 'title'
},{
    align: 'left',
    id: 'lastChangeView',
    label: 'Última modificación',
    order: 'lastChange'
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
    id: 'url',
    label: 'URL',
    order: 'urlRelative'
},{
    align: 'left',
    id: 'actions',
    label: 'Acciones'
},{
    align: 'left',
    id: 'cancellation',
    label: 'Baja'
}];