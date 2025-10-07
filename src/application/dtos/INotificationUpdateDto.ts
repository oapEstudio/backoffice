export interface INotificationUpdateDto{
    notificationTypeId: string;
    slideName: string;
    title: string;
    description: string;
    image: File;
    buttonText: string;
    buttonLink: string;
    statusId: number;
    dateFrom: Date;
    timeFrom: Date;
    dateTo: Date;
    timeTo: Date;
}