import { dataUrlToFile } from "./dataUrlToFile";

export function pdfDataUrlToFile(
  dataUrl: string,
  filename = 'document.pdf'
): File | null {
  const f = dataUrlToFile(dataUrl, filename.replace(/\.pdf$/i, '').trim() || 'document');
  return f && f.type === 'application/pdf' ? f : null;
}
