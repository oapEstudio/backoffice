import type { IPaginatedResponse } from "../../../../application/common/IPaginatedResponse";
import type { IHelpDesk } from "../../../../domain/entities/IHelpDesk";
import type { IProfile } from "../../../../domain/entities/IProfile";

export const mock : IPaginatedResponse<IHelpDesk> =  {
    "data": [
        {
            id: "1",
            name: "Lorem ipsum dolor sit amet consectetur.",
            type: "Sección",
            statusId: 1,
            statusDescription: "Activo",
            statusColor: "#52c41a",
            dateLastUpdate: new Date("2025-02-01T14:00:00"),
            updatedBy: "admin@ypf.com",
            url: "https://ayuda.ypf.com/seccion-1",
            groups: ["EESS Abanderada"],
            groupsCount: "0"
        },
        {
            id: "2",
            name: "Lorem ipsum dolor sit amet consectetur.",
            type: "Artículo",
            statusId: 1,
            statusDescription: "Activo",
            statusColor: "#52c41a",
            dateLastUpdate: new Date("2025-02-01T14:00:00"),
            updatedBy: "admin@ypf.com",
            url: "https://ayuda.ypf.com/articulo-1",
            groups: ["EESS Abanderada"],
            groupsCount: "0"
        },
        {
            id: "3",
            name: "Lorem ipsum dolor sit amet consectetur.",
            type: "Documento",
            statusId: 1,
            statusDescription: "Activo",
            statusColor: "#52c41a",
            dateLastUpdate: new Date("2025-02-01T14:00:00"),
            updatedBy: "admin@ypf.com",
            url: "https://ayuda.ypf.com/documento-1",
            groups: ["EESS Abanderada"],
            groupsCount: "1"
        },
        {
            id: "4",
            name: "Lorem ipsum dolor sit amet consectetur.",
            type: "Documento",
            statusId: 1,
            statusDescription: "Activo",
            statusColor: "#52c41a",
            dateLastUpdate: new Date("2025-02-01T14:00:00"),
            updatedBy: "admin@ypf.com",
            url: "https://ayuda.ypf.com/documento-2",
            groups: ["EESS Abanderada"],
            groupsCount: "1"
        },
        {
            id: "5",
            name: "Lorem ipsum dolor sit amet consectetur.",
            type: "Documento",
            statusId: 1,
            statusDescription: "Activo",
            statusColor: "#52c41a",
            dateLastUpdate: new Date("2025-02-01T14:00:00"),
            updatedBy: "admin@ypf.com",
            url: "https://ayuda.ypf.com/documento-3",
            groups: ["EESS Abanderada"],
            groupsCount: "1"
        },
        {
            id: "6",
            name: "Lorem ipsum dolor sit amet consectetur.",
            type: "Sección",
            statusId: 1,
            statusDescription: "Activo",
            statusColor: "#52c41a",
            dateLastUpdate: new Date("2025-02-01T14:00:00"),
            updatedBy: "admin@ypf.com",
            url: "https://ayuda.ypf.com/seccion-2",
            groups: ["EESS Abanderada"],
            groupsCount: "1"
        },
        {
            id: "7",
            name: "Lorem ipsum dolor sit amet consectetur.",
            type: "Artículo",
            statusId: 1,
            statusDescription: "Activo",
            statusColor: "#52c41a",
            dateLastUpdate: new Date("2025-02-01T14:00:00"),
            updatedBy: "admin@ypf.com",
            url: "https://ayuda.ypf.com/articulo-2",
            groups: ["EESS Abanderada"],
            groupsCount: "1"
        },
        {
            id: "8",
            name: "Lorem ipsum dolor sit amet consectetur.",
            type: "Instructivo",
            statusId: 2,
            statusDescription: "Inactivo",
            statusColor: "#ff4d4f",
            dateLastUpdate: new Date("2025-02-01T14:00:00"),
            updatedBy: "admin@ypf.com",
            url: "https://ayuda.ypf.com/instructivo-1",
            groups: ["EESS Abanderada"],
            groupsCount: "1"
        },
        {
            id: "9",
            name: "Lorem ipsum dolor sit amet consectetur.",
            type: "Documento",
            statusId: 2,
            statusDescription: "Inactivo",
            statusColor: "#ff4d4f",
            dateLastUpdate: new Date("2025-02-01T14:00:00"),
            updatedBy: "admin@ypf.com",
            url: "https://ayuda.ypf.com/documento-4",
            groups: ["EESS Abanderada"],
            groupsCount: "1"
        },
        {
            id: "10",
            name: "Lorem ipsum dolor sit amet consectetur.",
            type: "Documento",
            statusId: 2,
            statusDescription: "Inactivo",
            statusColor: "#ff4d4f",
            dateLastUpdate: new Date("2025-02-01T14:00:00"),
            updatedBy: "admin@ypf.com",
            url: "https://ayuda.ypf.com/documento-5",
            groups: ["EESS Abanderada"],
            groupsCount: "1"
        },
        {
            id: "11",
            name: "Lorem ipsum dolor sit amet consectetur.",
            type: "Documento",
            statusId: 1,
            statusDescription: "Activo",
            statusColor: "#52c41a",
            dateLastUpdate: new Date("2025-02-01T14:00:00"),
            updatedBy: "admin@ypf.com",
            url: "https://ayuda.ypf.com/documento-6",
            groups: ["EESS Abanderada"],
            groupsCount: "1"
        },
        {
            id: "12",
            name: "Lorem ipsum dolor sit amet consectetur.",
            type: "Invisible",
            statusId: 3,
            statusDescription: "Invisible",
            statusColor: "#d9d9d9",
            dateLastUpdate: new Date("2025-02-01T14:00:00"),
            updatedBy: "admin@ypf.com",
            url: "https://ayuda.ypf.com/invisible-1",
            groups: ["YPF Ruta crédito"],
            groupsCount: "1"
        },
        {
            id: "13",
            name: "Lorem ipsum dolor sit amet consectetur.",
            type: "Invisible",
            statusId: 3,
            statusDescription: "Invisible",
            statusColor: "#d9d9d9",
            dateLastUpdate: new Date("2025-02-01T14:00:00"),
            updatedBy: "admin@ypf.com",
            url: "https://ayuda.ypf.com/invisible-2",
            groups: ["YPF Ruta crédito"],
            groupsCount: "1"
        }
    ],
    "count": 13,
    "parameters": {
        "sortBy": null,
        "page": 1,
        "pageSize": 10,
        "sortDescending": true
    }
}

export const MOCK_HELP_DESK_PAGINATED : IPaginatedResponse<IHelpDesk> = {
  data: mock.data,
  count: 13, 
  parameters: {
    sortBy: 'dateLastUpdate',
    page: 1,
    pageSize: 10,
    sortDescending: true,
    filters: {}
  }
};