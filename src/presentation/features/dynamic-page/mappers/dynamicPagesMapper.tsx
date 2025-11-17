import { styled } from "@mui/material/styles";
import type { IRow } from "../../../components/ui/table/table.interface";
import { formatDate } from "../../../utils/formatDate";
import { EditActionIcon, DangerIcon } from '../../../components/ui/icons/index';
import { CustomStack } from '../../../components/ui/stack/Stack';
import type React from "react";
import IconButton from "@mui/material/IconButton";
import type { IDynamicPage } from "../../../../domain/entities/IDynamicPage";

export interface IDynamicPageRow extends IRow {
  id?: string;
  name: string;
  lastChangeView: string;
  status: any;
  profiles: React.ReactNode,
  cancellation: React.ReactNode
}

export function toDynamicPageRow(d: IDynamicPage, callbackEdit: any, callbackCancellation: any): IDynamicPageRow {

    const styleContentElement= {
      justifyContent: "left",
      paddingLeft: "5%"
    };

    const WrapperContainerEdit = styled('div')(({ theme }) => ({
    cursor: 'pointer'
    }));

    const WrapperContainerStatus = styled('div')(({theme, color: string})=>({
      color: d.statusColor,
      paddingLeft: '1%'
    }));
    
  
    const buttonEdit = <>
                  <CustomStack direction='row' spacing={2} sx={styleContentElement}>
                      <span>
                          {d.profiles?.length}
                      </span>
                      <WrapperContainerEdit>
                          <EditActionIcon handleClick={callbackEdit} parameterHandleClick={d} />
                        </WrapperContainerEdit>
                  </CustomStack>
                </>;


    const cancelationComp = <IconButton onClick={()=>callbackCancellation(d)}>
                                    <DangerIcon />
                            </IconButton>
                             
    const stateComp = <>
      <WrapperContainerStatus>
        {d.statusDescription}
      </WrapperContainerStatus>
    </>
    
   
    return {
        id: String(d.id),
        name: d.title,       
        lastChangeView:  `${formatDate(d.dateUpdated,{includeTime: true})} - ${d.updatedBy}`,
        profiles: buttonEdit,
        status: stateComp,       
        cancellation: cancelationComp,
        url: d.urlRelative        
    }
}





