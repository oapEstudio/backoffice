import { set as idbSet, get as idbGet, del as idbDel } from 'idb-keyval';

export type DPManifest = {
  version: 1;
  hasMenu: boolean;  
  sections: Array<{
    id: string;
    order: number;
    backgroundColor: string;
    backgroundImageKey?: string; 
    elements: Array<{
      id: string;
      order: number;
      label: string;
      text: string;
      fontSize: string;
      link: string;
      type: number;  
      height?: number;
      align?: 'left'|'center'|'right';
      fileKey?: string;    
    }>;
  }>;
};



export function dataUrlToBlob(dataUrl: string): Blob {

  const [meta, b64] = dataUrl.split(',');
  const mime = meta.match(/data:(.*);base64/)?.[1] ?? 'application/octet-stream';
  const bin = atob(b64);
  const len = bin.length;
  const u8 = new Uint8Array(len);

  for (let i = 0; i < len; i++) u8[i] = bin.charCodeAt(i);
  return new Blob([u8], { type: mime });
}

export async function blobFromFileOrDataUrl(input: File | string): Promise<Blob> {
    
  if (input instanceof File) return input;
  if (typeof input === 'string' && input.startsWith('data:')) return dataUrlToBlob(input);
  throw new Error('Formato de archivo no soportado');
}

export function estimateBytes(str: string) {
  return new Blob([str]).size;
}
