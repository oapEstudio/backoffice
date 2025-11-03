import { dataUrlToFile, fileToDataUrl, type SerializableFile } from "../../../../utils/files-serialize";
import type { IElementDynamicPage } from "../../pages/new_page/components/element-dynamic-page/ElementDynamicPage";
import type { ISectionPage } from "../../pages/new_page/components/section-page/SectionPage";


type SerializableElement = Omit<IElementDynamicPage, 'file'> & {
  file?: SerializableFile;           
  previewSrc?: string;               
};
type SerializableSection = Omit<ISectionPage, 'elements'> & {
  elements: SerializableElement[];
};

export const serializeSections = async (sections: ISectionPage[]): Promise<SerializableSection[]> => {
  const out: SerializableSection[] = [];

  for (const s of sections) {
    const serElems: SerializableElement[] = [];

    for (const el of s.elements) {
      
        if (el.file instanceof File) {
        const dataUrl = await fileToDataUrl(el.file);
        const { file: _ignored, ...rest } = el; 

        serElems.push({
          ...rest,
          file: {
            name: el.file.name,
            type: el.file.type,
            dataUrl,
            size: el.file.size,
          },
          previewSrc: dataUrl,
        });
      } else {
        
        const { file: _ignored, ...rest } = el as unknown as Omit<IElementDynamicPage, 'file'> & { file?: never };

        serElems.push(rest as SerializableElement);
      }
    }

    out.push({ ...s, elements: serElems });
  }

  return out;
};

export const deserializeSections = async (sections: SerializableSection[]): Promise<ISectionPage[]> => {
  const out: ISectionPage[] = [];

  for (const s of sections) {
    const elems: IElementDynamicPage[] = [];
    for (const el of s.elements) {

      let file: File | undefined = undefined;

      if (el.file?.dataUrl && el.file.name) {
        file = await dataUrlToFile(el.file);
      }

      elems.push({
        ...el,
        file
      } as IElementDynamicPage);
    }
    out.push({ ...s, elements: elems });
  }
  return out;
};
