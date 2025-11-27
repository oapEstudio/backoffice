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
    id: 'lastChangeView',
    label: 'Última modificación',
    order: 'dateUpdated'
},{
    align: 'center',
    id: 'state',
    label: 'Estado',
    order: 'statusDescription'
},{
    align: 'center',
    id: 'url',
    label: 'URL',
    order: 'link'
},{
    align: 'left',
    id: 'profiles',
    label: 'Perfiles',
},{
    align: 'left',
    id: 'actions',
    label: 'Acciones',
},{
    align: 'left',
    id: 'cancellation',
    label: 'Baja'
}
];