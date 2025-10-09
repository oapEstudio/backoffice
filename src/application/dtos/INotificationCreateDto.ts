export interface INotificationCreateDto {
    notificationTypeId: string;
    name:               string;
    title:              string;
    description:        string;
    image:         File | null;
    buttonText:         string;
    buttonLink:         string;
    statusId:           number;
    dateFrom:           string | null;
    timeFrom:           string | null;
    dateTO:             string | null;
    timeTO:             string | null;
    profiles:           string[];
}
