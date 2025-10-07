export interface IRoute {
    title: string;
    name: string;
    viewNav: boolean;
    children: IRoute[];
    order: string;
}


export const HOME: IRoute = {
    title: 'Inicio',
    name: '/',
    children: [],
    viewNav: true,
    order: 'aa'
}



export const NEW_PROFILE: IRoute = {
    title: 'Nuevo',
    order:  'Nuevo',
    name: '/new_profile',
    children: [],
    viewNav: true
}
export const NOTIFICATION: IRoute = {
    title: 'Notificaciones',
    order:  'Notificaciones',
    name: '/notifications',
    children: [],
    viewNav: true
}
export const NEW_CAROUSEL: IRoute = {
    title: 'Nuevo carrusel',
    order:  'NotificacionCarrusel',
    name: '/new_highlighted_notification',
    children: [],
    viewNav: true
}
export const NEW_ALERT: IRoute = {
    title: 'Nueva alerta',
    order:  'NotificacionAlert',
    name: '/new_alert_notification',
    children: [],
    viewNav: true
}
export const FUNTIONALITIES: IRoute = {
    title: 'Menús',
    order:  'Menús',
    name: '/menues',
    children: [],
    viewNav: true
}
export const UPLOAD_PACK: IRoute = {
    title: 'Ayuda',
    order:  'Ayuda',
    name: 'upload_pack',
    children: [],
    viewNav: true
}

export const FATHER_PROFILE: IRoute = {
    title: 'Perfiles',
    order:  'Perfiles',
    name: '/profiles',
    children: [],
    viewNav: true
}
export const NEW_DYNAMIC_PAGE: IRoute = {
    title: 'Páginas',
    order:  'Páginas',
    name: '/dynamic_page',
    children: [],
    viewNav: true
}
export const ROUTES: IRoute[] =[
    HOME, FATHER_PROFILE, NOTIFICATION, FUNTIONALITIES, UPLOAD_PACK, NEW_DYNAMIC_PAGE
];
