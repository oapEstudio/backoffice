export interface SerializableFile {
  name: string;
  type: string;
  dataUrl: string; 
  size?: number;
}

export const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(String(fr.result));
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });

export const dataUrlToFile = async (sf: SerializableFile): Promise<File> => {
  const res = await fetch(sf.dataUrl);
  const blob = await res.blob();

  const typedBlob = sf.type ? blob.slice(0, blob.size, sf.type) : blob;
  return new File([typedBlob], sf.name, { type: sf.type || typedBlob.type });
};
