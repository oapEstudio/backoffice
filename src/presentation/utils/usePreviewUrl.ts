import { useEffect, useState } from 'react';

type MaybeSrc = File | Blob | string | { preview?: string } | null | undefined;

export function usePreviewUrl(src: MaybeSrc) {
  const [url, setUrl] = useState<string | undefined>(undefined);

  useEffect(() => {

    if (!src) { setUrl(undefined); return; }


    if (typeof src === 'string') { setUrl(src); return; }


    const maybePreview = (src as any)?.preview;
    if (typeof maybePreview === 'string') { setUrl(maybePreview); return; }


    if (src instanceof Blob) {
      const objectUrl = URL.createObjectURL(src);
      setUrl(objectUrl);
      return () => { try { URL.revokeObjectURL(objectUrl); } catch {} };
    }

    setUrl(undefined);
  }, [src]);

  return url;
}
