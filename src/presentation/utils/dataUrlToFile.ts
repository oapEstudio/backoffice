export function dataUrlToFile(
  dataUrl: string,
  filenameFallback = 'file'
): File | null {

  const m = /^data:([^;]+)(;base64)?,(.*)$/i.exec(dataUrl);
  
  if (!m) return null;

  const mime = m[1];             
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


  const extMap: Record<string, string> = {
    'application/pdf': 'pdf',
    'image/svg+xml': 'svg',
    'text/plain': 'txt',
    'text/html': 'html',
    'application/json': 'json',
    'image/jpeg': 'jpg',  
  };

  const fallbackExt = mime.split('/')[1]?.split('+')[0] || 'bin';
  const ext = extMap[mime] ?? fallbackExt;

  return new File([bytes], `${filenameFallback}.${ext}`, { type: mime });
}
