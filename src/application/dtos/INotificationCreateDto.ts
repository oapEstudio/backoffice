export interface INotificationCreateDto {
    notificationTypeId: string;
    slideName:          string;
    title:              string;
    description:        string;
    image:         File;
    buttonText:         string;
    buttonLink:         string;
    statusId:           number;
    dateFrom:           string | null;
    timeFrom:           string | null;
    dateTO:             string | null;
    timeTO:             string | null;
    profiles:           string[];
}
