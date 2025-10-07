export interface FormatDateOptions {
  locale?: string;
  includeTime?: boolean;
}

export function formatDate(
  date: Date | string | number,
  { locale = "es-AR", includeTime = false }: FormatDateOptions = {}
): string {
  const d =
    typeof date === "string" || typeof date === "number"
      ? new Date(date)
      : date;

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  if (!includeTime) {
    return dateFormatter.format(d);
  }

  const timeFormatter = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });


  return `${dateFormatter.format(d)} - ${timeFormatter.format(d)}`;
}
