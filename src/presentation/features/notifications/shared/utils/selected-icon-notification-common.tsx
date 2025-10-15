import { DownloaddIcon, InfoIcon, LinksIcon, WarningTriangleIcon } from "../../../../components/ui/icons";

export function selectedIconsNotificationCommon(id: string): React.ReactNode{
    
  switch(id){
      case '1':
        return <LinksIcon /> ;
      case '2':
        return <InfoIcon /> ;
      case '3':
        return <DownloaddIcon /> ;
      case '4':
        return <WarningTriangleIcon />
    default:
      return <LinksIcon />;
    }

}