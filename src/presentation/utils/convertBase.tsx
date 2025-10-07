export function getBase64Data(base64String: string) {
  const parts = base64String.split(",");
  if (parts.length > 1) {
    return parts[1];
  } else {
    return base64String;
  }
}
