
export async function urlOrDataUrlToFile(
  input: string,
  filenameFallback = 'file'
): Promise<File | null> {
  if (!input) return null;


  let src = input.trim().replace(/(^"+|"+$)/g, '');
  if (/%22$/i.test(src)) src = src.replace(/%22$/i, '');


  if (/^data:/i.test(src)) {
    const f = dataUrlToFileSync(src, filenameFallback);
    return f;
  }


  if (/^https?:\/\//i.test(src)) {
    try {
      const res = await fetch(src, { mode: 'cors' }); 
      if (!res.ok) return null;

      const blob = await res.blob();

      
      let mime = (res.headers.get('content-type') || '').toLowerCase().split(';')[0].trim();

      
      const urlObj = new URL(src, location.origin);
      const path = urlObj.pathname.toLowerCase();
      const extFromPath = extFromPathname(path);

      
      const mimeToExt: Record<string, 'pdf'|'zip'|'docx'|'xlsx'|'png'|'jpg'> = {
        'application/pdf': 'pdf',
        'application/zip': 'zip',
        'application/x-zip-compressed': 'zip',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
        'image/png': 'png',
        'image/x-png': 'png',
        'image/jpeg': 'jpg',
        'image/jpg': 'jpg',
        'image/pjpeg': 'jpg',
      };

      const extToMime: Record<string, string> = {
        pdf: 'application/pdf',
        zip: 'application/zip',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        png: 'image/png',
        jpg: 'image/jpeg',
      };

      let ext: keyof typeof extToMime | undefined;

      if (mime && mimeToExt[mime as keyof typeof mimeToExt]) {
        ext = mimeToExt[mime as keyof typeof mimeToExt];
      } else if (extFromPath && extToMime[extFromPath]) {
        ext = extFromPath as keyof typeof extToMime;
        mime = extToMime[ext];
      } else {

        const buf = new Uint8Array(await blob.arrayBuffer());
        const sniff = sniffExt(buf);
        if (sniff) {
          ext = sniff;
          mime = extToMime[sniff];
        } else {
    
          return null;
        }
      }


      const pathName = decodeURIComponent(path.split('/').pop() || '');
      const nameFromPath = pathName && /\.[a-z0-9]+$/i.test(pathName)
        ? pathName.replace(/\.[a-z0-9]+$/i, `.${ext}`)
        : `${filenameFallback}.${ext}`;

      return new File([blob], nameFromPath, { type: mime });
    } catch {
      return null;
    }
  }


  return null;
}


function dataUrlToFileSync(dataUrl: string, filenameFallback = 'file'): File | null {
  const m = /^data:([^;]+)(;base64)?,(.*)$/i.exec(dataUrl);
  if (!m) return null;

  let mime = m[1].toLowerCase().trim();
  const isBase64 = !!m[2];
  const raw = m[3];

  let binaryString: string;
  try {
    binaryString = isBase64 ? atob(raw) : decodeURIComponent(raw);
  } catch {
    return null;
  }

  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i);

  const mimeToExt: Record<string, 'pdf'|'zip'|'docx'|'xlsx'|'png'|'jpg'> = {
    'application/pdf': 'pdf',
    'application/zip': 'zip',
    'application/x-zip-compressed': 'zip',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
    'image/png': 'png',
    'image/x-png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/pjpeg': 'jpg',
  };

  const extToMime: Record<string, string> = {
    pdf: 'application/pdf',
    zip: 'application/zip',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    png: 'image/png',
    jpg: 'image/jpeg',
  };

  let ext = mimeToExt[mime];

  if (!ext) {
    const sniffed = sniffExt(bytes);
    if (!sniffed) return null;
    ext = sniffed;
    mime = extToMime[sniffed];
  }

  const nameHasExt = /\.[a-z0-9]+$/i.test(filenameFallback);
  const fileName = nameHasExt
    ? filenameFallback.replace(/\.[a-z0-9]+$/i, `.${ext}`)
    : `${filenameFallback}.${ext}`;

  return new File([bytes], fileName, { type: mime });
}

function sniffExt(bytes: Uint8Array): 'pdf'|'png'|'jpg'|'zip'|'docx'|'xlsx'|null {
  const len = bytes.length;

  const isPDF = () =>
    len >= 5 &&
    bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46 && bytes[4] === 0x2d;

  const isPNG = () =>
    len >= 8 &&
    bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 &&
    bytes[4] === 0x0d && bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a;

  const isJPG = () => len >= 2 && bytes[0] === 0xff && bytes[1] === 0xd8;

  const isZIP = () =>
    len >= 4 && bytes[0] === 0x50 && bytes[1] === 0x4b && bytes[2] === 0x03 && bytes[3] === 0x04;

  if (isPDF()) return 'pdf';
  if (isPNG()) return 'png';
  if (isJPG()) return 'jpg';
  if (isZIP()) {
   
    return 'zip';
  }
  return null;
}

function extFromPathname(path: string): 'pdf'|'zip'|'docx'|'xlsx'|'png'|'jpg'|undefined {
  const m = /\.([a-z0-9]+)$/i.exec(path);
  if (!m) return undefined;
  const ext = m[1].toLowerCase();
  if (ext === 'jpeg') return 'jpg';
  if (['pdf','zip','docx','xlsx','png','jpg'].includes(ext)) return ext as any;
  return undefined;
}
