export const HELP_SECTION = 1;
export const HELP_ARTICLE = 2;
export const HELP_DOCUMENT = 3;
export const HELP_INVISIBLE = 4;

export const HELP_TYPES: Record<number, string> = {
  [HELP_SECTION]: 'Sección',
  [HELP_ARTICLE]: 'Artículo',
  [HELP_DOCUMENT]: 'Documento',
  [HELP_INVISIBLE]: 'Invisible',
};

export const STATE_HELP_NEW: number = 1;
export const STATE_HELP_ACTIVE: number = 2;
export const STATE_HELP_INACTIVE: number = 3;
export const STATE_HELP_CANCEL: number = 4;


export const HELP_DOCUMENT_LINK = 1;
export const HELP_DOCUMENT_DOWNLOAD = 2;
export const HELP_DOCUMENT_PDF = 3;
