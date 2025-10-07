import type { Dayjs } from "dayjs";

export interface INotificationFormValues{
  name: string;
  profiles: {id: string,name: string}[],
  title: string;
  subtitle: string;
  img: File;
  hasButton: boolean;
  state: string;
  buttonLink: string;
  buttonTitle: string;
  hasPublication: boolean;
  hasExpired: boolean;
  dateFrom: Dayjs | null;
  dateTo: Dayjs | null;
  timeFrom: Dayjs | null;
  timeTo: Dayjs | null;

}