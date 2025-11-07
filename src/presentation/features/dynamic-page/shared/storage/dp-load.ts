import type { IElementDynamicPage } from '../../pages/new_page/components/element-dynamic-page/ElementDynamicPage';
import type { ISectionPage } from '../../pages/new_page/components/section-page/SectionPage';
import { KEY_STORAGE_PROPS_DYNAMIC_PAGE } from '../constants/constants';
import { type DPManifest } from './dp-storage';
import { get as idbGet } from 'idb-keyval';
import { dpStore } from './dp-store';

export async function loadDynamicPageFromStorage(): Promise<ISectionPage[]> {
  
    const raw = localStorage.getItem(KEY_STORAGE_PROPS_DYNAMIC_PAGE);

  if (!raw) return [];
  
  const manifest = JSON.parse(raw) as DPManifest;

  const sections: ISectionPage[] = [];

  for (const s of manifest.sections) {
    const elements: IElementDynamicPage[] = [];

    for (const el of s.elements) {
      
        let file: any = undefined;
      
        if (el.fileKey) {
      
          const blob = await idbGet(`dp:file:${el.fileKey}`, dpStore);
          
          if (blob) {
            
                file = new File([blob], `file-${el.fileKey}`, { type: blob.type });            
          }
      }

      elements.push({
        id: (el as any).id ?? Math.random(),
        label: el.label,
        type: el.type as any,
        height: el.height as any,
        align: el.align as any,
        file,
      });
    }

    sections.push({
      id: s.id,
      order: s.order,
      elements,
    });
  }

  return sections;
}
