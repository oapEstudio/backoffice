import type { IColumn } from "../../../../components/ui/table/table.interface";

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
    label: 'Última modificación',
    order: 'lastChange'
},{
    align: 'center',
    id: 'state',
    label: 'Estado',
    order: 'statusDescription'
},{
    align: 'center',
    id: 'url',
    label: 'URL',
    order: 'url'
},{
    align: 'left',
    id: 'profiles',
    label: 'Perfiles',
    order: 'profiles'
},{
    align: 'center',
    id: 'actions',
    label: 'Acciones'
}
];