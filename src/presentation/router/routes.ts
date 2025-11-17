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
export const NEW_BELL: IRoute = {
    title: 'Nueva campana',
    order:  'NotificacionCampana',
    name: '/new_bell_notification',
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
    title: 'Nueva páginas',
    order:  'Nueva páginas',
    name: '/new_dynamic_page',
    children: [],
    viewNav: true
}

export const DYNAMIC_PAGE: IRoute = {
    title: 'Páginas',
    order:  'Páginas',
    name: '/dynamic_page',
    children: [],
    viewNav: true
}

export const PREVIEW_DYNAMIC_PAGE: IRoute = {
    title: 'Previsualización',
    order:  'Previsualización',
    name: '/dynamic_page_preview',
    children: [],
    viewNav: false
}
export const HELP: IRoute = {
    title: 'Ayuda',
    order:  'Ayuda',
    name: '/helps',
    children: [],
    viewNav: true
}
export const NEW_SECTION: IRoute = {
    title: 'Nueva Sección',
    order:  'HelpSection',
    name: '/new_section_help',
    children: [],
    viewNav: true
}
export const NEW_ARTICLE: IRoute = {
    title: 'Nuevo Artículo',
    order:  'HelpArticle',
    name: '/new_article_help',
    children: [],
    viewNav: true
}

export const NEW_DOCUMENT: IRoute = {
    title: 'Nuevo Documento',
    order:  'HelpDocument',
    name: '/new_document_help',
    children: [],
    viewNav: true
}

export const NEW_DOCUMENT_INVISIBLE: IRoute = {
    title: 'Nuevo Documento Invisible',
    order:  'HelpDocumentInvisible',
    name: '/new_document_invisible_help',
    children: [],
    viewNav: true
}

export const EDIT_DYNAMIC_PAGE: IRoute = {
    title: 'Nuevo Documento Invisible',
    order:  'EditDynamicPage',
    name: '/edit_dynamic_page/:id',
    children: [],
    viewNav: true
}

export const ROUTES: IRoute[] =[
    HOME, FATHER_PROFILE, NOTIFICATION, FUNTIONALITIES, DYNAMIC_PAGE, HELP
];
