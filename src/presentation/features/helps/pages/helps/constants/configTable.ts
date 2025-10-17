import type { IColumn } from "../../../../../components/ui/table/table.interface";

export const Headers: IColumn[] =[{
    align: 'left',
    id: 'helpType',
    label: 'Tipo',
    order: 'helpType'
},{
    align: 'left',
    id: 'name',
    label: 'Nombre',
    order: 'name'
},{
    align: 'left',
    id: 'title',
    label: 'Título',
    order: 'title'
},{
    align: 'left',
    id: 'lastChangeView',
    label: 'Última modificación',
    order: 'dateUpdated'
},{
    align: 'center',
    id: 'state',
    label: 'Estado',
    order: 'status'
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
    label: 'Acciones',
    order: 'actions'
}
];