
export function dataUrlToFile(dataUrl: string, filenameFallback = 'image') {
  const m = /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.*)$/.exec(dataUrl);
  if (!m) return null;
  const mime = m[1];
  const b64 = m[2];
  const bin = atob(b64);
  const len = bin.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = bin.charCodeAt(i);
  const ext = mime.split('/')[1]?.split('+')[0] || 'png';
  const file = new File([bytes], `${filenameFallback}.${ext}`, { type: mime });
  return file;
}
