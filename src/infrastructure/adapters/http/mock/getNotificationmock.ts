import type { IPaginatedResponse } from "../../../../application/common/IPaginatedResponse";
import type { INotification } from "../../../../domain/entities/INotification";

// Mock de datos
const mockNotifications: any[] = [
  {
    typeNotificationId: '1',
    typeNotification: 'ALERTA',
    titleNotification: 'Mantenimiento programado',
    dateLastUpdate: new Date('2025-09-10T14:20:00Z'),
    expiration: new Date('2025-10-01T00:00:00Z'),
    status: 'ACTIVE',
    profile: ['ADMIN', 'OPS']
  },
  {
    typeNotificationId: '2',
    typeNotification: 'NOVEDAD',
    titleNotification: 'Nueva versión del backoffice',
    dateLastUpdate: new Date('2025-09-15T09:00:00Z'),
    expiration: new Date('2025-12-31T23:59:59Z'),
    status: 'ACTIVE',
    profile: ['ADMIN', 'USER']
  },
  {
    typeNotificationId: '3',
    typeNotification: 'RECORDATORIO',
    titleNotification: 'Actualizá tu perfil',
    dateLastUpdate: new Date('2025-08-30T18:45:00Z'),
    expiration: new Date('2025-09-30T23:59:59Z'),
    status: 'INACTIVE',
    profile: ['USER']
  }
];

// Mock de respuesta paginada
export const mockPaginatedResponse: IPaginatedResponse<INotification> = {
  data: mockNotifications,
  count: 42, // total en el backend
  parameters: {
    sortBy: 'dateLastUpdate',
    page: 1,
    pageSize: 10,
    sortDescending: true,
    filters: {
      status: ['ACTIVE', 'INACTIVE'],
      typeNotification: ['ALERTA', 'NOVEDAD', 'RECORDATORIO']
    }
  }
};

// Promise mockeada 
export const mockNotificationsPromise: Promise<IPaginatedResponse<INotification>> =
  Promise.resolve(mockPaginatedResponse);


export const resolveAfter = <T,>(value: T, ms = 400) =>
  new Promise<T>((res) => setTimeout(() => res(value), ms));

// Uso con delay:
// const response = await resolveAfter(mockPaginatedResponse, 300);
