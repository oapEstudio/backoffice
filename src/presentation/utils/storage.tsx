/* eslint-disable @typescript-eslint/no-explicit-any */
export function getItem(key: string): any {
  const result = localStorage.getItem(key);
  return result ? JSON.parse(result) : null;
}

export function setItem(key: string, data: any): void {
  const value = data ? JSON.stringify(data) : "";
  localStorage.setItem(key, value);
}

export function removeItem(key: string): void {
  localStorage.removeItem(key);
}
