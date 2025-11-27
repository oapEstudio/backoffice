import type { ISectionPage } from '../../pages/new_page/components/section-page/SectionPage';
import { KEY_STORAGE_PROPS_DYNAMIC_PAGE } from '../constants/constants';
import { type DPManifest, blobFromFileOrDataUrl } from './dp-storage';
import { set as idbSet } from 'idb-keyval';
import { dpStore } from './dp-store';

export async function saveDynamicPageToStorage(sections: ISectionPage[],hasMenu: boolean) {
  const manifest: DPManifest = {
    version: 1,
    hasMenu: hasMenu,
    sections: [],
  };

  for (const s of sections) {

    const manElems: DPManifest['sections'][number]['elements'] = [];

    let backgroundImageKey: string | undefined;

    const bgInput = (s as any).backgroundImage?.dataUrl ?? (s as any).backgroundImage; 
    

    if (bgInput) {

      const bgBlob = await blobFromFileOrDataUrl(bgInput);

      backgroundImageKey = crypto.randomUUID();

      await idbSet(`dp:file:${backgroundImageKey}`, bgBlob, dpStore);
    }

    for (const el of s.elements) {
    
      const { file, ...rest } = el as any;

      let fileKey: string | undefined;
      
      if (file) {
       
        const blob = await blobFromFileOrDataUrl(          
          file.dataUrl ?? file
        );

        fileKey = `${crypto.randomUUID()}`;
        
        await idbSet(`dp:file:${fileKey}`, blob, dpStore);
      }

      manElems.push({
        ...rest,
        fileKey,
      });
    }

    manifest.sections.push({
      id: s.id,
      order: s.order,
      backgroundImageKey,
      elements: manElems,
      backgroundColor: s.backgroundColor
    });
  }

  const json = JSON.stringify(manifest);  

  localStorage.setItem(KEY_STORAGE_PROPS_DYNAMIC_PAGE, json);
}
