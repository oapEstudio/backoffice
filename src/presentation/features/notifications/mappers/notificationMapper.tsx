import { styled } from "@mui/material/styles";
import type { IFilter } from "../../../../domain/entities/IFilter";
import type { INotification } from "../../../../domain/entities/INotification";
import type { SelectOption } from "../../../components/ui/inputs/select/select.interface";
import type { IRow } from "../../../components/ui/table/table.interface";
import { formatDate } from "../../../utils/formatDate";
import { EditActionIcon, DangerIcon } from '../../../components/ui/icons/index';
import { CustomStack } from '../../../components/ui/stack/Stack';
import type React from "react";
import IconButton from "@mui/material/IconButton";
import { NOTIFICATION_ALERT } from "../shared/constants/notifications";

export interface INotificationRow extends IRow {
  id?: string;
  name: string;
  type: string;
  lastChangeView: string;
  dateFrom: string;
  expired: string;
  status: any;
  profiles: React.ReactNode,
  cancellation: React.ReactNode
}

export function toNotificationRow(n: INotification,callbackEdit: any, callbackCancellation: any): INotificationRow {

    const styleContentElement= {
      justifyContent: "left",
      paddingLeft: "5%"
    };

    const WrapperContainerEdit = styled('div')(({ theme }) => ({
    cursor: 'pointer'
    }));

    const WrapperContainerStatus = styled('div')(({theme, color: string})=>({
      color: n.statusColor,
      paddingLeft: '1%'
    }));
    
    const WrapperContainerNotification = styled('div')(({theme, color: string})=>({
      color: n.notificationTypeColor,
      paddingLeft: '1%'
    }));

    const buttonEdit = <>
                  <CustomStack direction='row' spacing={2} sx={styleContentElement}>
                      <span>
                          {n.profiles.length}
                      </span>
                      <WrapperContainerEdit>
                          <EditActionIcon handleClick={callbackEdit} parameterHandleClick={n} />
                        </WrapperContainerEdit>
                  </CustomStack>
                </>;


    const cancelationComp = <IconButton onClick={()=>callbackCancellation(n)}>
                                    <DangerIcon />
                            </IconButton>
                             
    const stateComp = <>
      <WrapperContainerStatus>
        {n.statusDescription}
      </WrapperContainerStatus>
    </>
    
    const notificationComp = <>
      <WrapperContainerNotification>
        {n.notificationTypeDescription}
      </WrapperContainerNotification>
    </>

   

    return {
        id: String(n.id),
        name: n.name,
        expired: n.dateTO?formatDate(n.dateTO,{includeTime: true}): 'Sin definir',
        lastChangeView:  `${formatDate(n.dateUpdated,{includeTime: true})} - ${n.updatedBy}`,
        profiles: buttonEdit,
        status: stateComp,
        type: n.notificationTypeDescription,
        cancellation: cancelationComp,
        background:  backgroundCalculed(n),
        dateFrom: n.dateFrom?formatDate(n.dateFrom,{includeTime: false}): 'Sin definir',
    }
}


export function toNotificationSelect(f: IFilter): SelectOption {
  return {
    label: f.description,
    value: f.id
  }
}


function backgroundCalculed(n: INotification): string | null{

    const dateTo =n.dateTO;
    const defaultBackGroundColor =  n.notificationTypeId == NOTIFICATION_ALERT? '#FFD3D3': null;
    
    if(!dateTo) return null;
    
    const t = dateTo instanceof Date ? dateTo.getTime() : new Date(dateTo).getTime();
   
    const expired = !Number.isNaN(t) && t < Date.now();

    return expired?'#FFEB8A80' : defaultBackGroundColor
}