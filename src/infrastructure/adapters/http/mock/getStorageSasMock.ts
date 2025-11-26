import type { IStorageSas } from "../../../../domain/entities/IStorageSas";

export const mock: IStorageSas = {
    sas: {
        containerPath: "https://ydtztstahex001.blob.core.windows.net/extranet-dev",
        sasToken: "skoid=a14a12c7-951f-4c50-b97e-5b3ce7a4bb56&sktid=038018c3-616c-4b46-ad9b-aa9007f701b5&skt=2025-11-26T13%3A55%3A20Z&ske=2025-11-26T15%3A00%3A20Z&sks=b&skv=2025-11-05&sv=2025-11-05&st=2025-11-26T13%3A55%3A20Z&se=2025-11-26T15%3A00%3A20Z&sr=c&sp=rcwdl&sig=Of8Q89V%2FNS76XH%2BhexTSb9We%2FSznpaVGefWAE%2BXszDc%3D",
        expiresOn: new Date("2025-11-26T15:00:20.2416383+00:00")
    },
    pathTemplate: "helps/{name}/documents/{filename}"
}