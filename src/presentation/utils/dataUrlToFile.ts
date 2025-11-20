export function dataUrlToFile(
  dataUrl: string,
  filenameFallback = "file"
): File | null {

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


  const mimeToExt: Record<string, "pdf" | "zip" | "docx" | "xlsx" | "png" | "jpg"> = {
  
    "application/pdf": "pdf",

  
    "application/zip": "zip",
    "application/x-zip-compressed": "zip",

  
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",

  
    "image/png": "png",
    "image/x-png": "png",

  
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/pjpeg": "jpg",
  };

  const extToMime: Record<string, string> = {
    pdf: "application/pdf",
    zip: "application/zip",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    png: "image/png",
    jpg: "image/jpeg",
  };


  const isPDF = () =>
    len >= 5 &&
    bytes[0] === 0x25 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x44 &&
    bytes[3] === 0x46 &&
    bytes[4] === 0x2d;  

  const isPNG = () =>
    len >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a;

  const isJPG = () =>
    len >= 3 &&
    bytes[0] === 0xff &&
    bytes[1] === 0xd8;

  const isZIP = () =>
    len >= 4 &&
    bytes[0] === 0x50 &&
    bytes[1] === 0x4b &&
    bytes[2] === 0x03 &&
    bytes[3] === 0x04;


  let ext = mimeToExt[mime];


  if (!ext) {
    if (isPDF()) { ext = "pdf"; mime = extToMime[ext]; }
    else if (isPNG()) { ext = "png"; mime = extToMime[ext]; }
    else if (isJPG()) { ext = "jpg"; mime = extToMime[ext]; }
    else if (isZIP()) {
    
    
      const lowerName = filenameFallback.toLowerCase();
      if (/\.(docx)$/.test(lowerName)) { ext = "docx"; mime = extToMime[ext]; }
      else if (/\.(xlsx)$/.test(lowerName)) { ext = "xlsx"; mime = extToMime[ext]; }
      else { ext = "zip"; mime = extToMime[ext]; }
    } else {
    
      return null;
    }
  }



  const nameHasExt = /\.[a-z0-9]+$/i.test(filenameFallback);
  const fileName = nameHasExt
    ? filenameFallback.replace(/\.[a-z0-9]+$/i, `.${ext}`)
    : `${filenameFallback}.${ext}`;

  return new File([bytes], fileName, { type: mime });
}
