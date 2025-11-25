import { styled } from "@mui/material/styles";
import type { IRow } from "../../../components/ui/table/table.interface";
import { formatDate } from "../../../utils/formatDate";
import { EditActionIcon, DangerIcon, DisplaySettingIcon } from '../../../components/ui/icons/index';
import { CustomStack } from '../../../components/ui/stack/Stack';
import type React from "react";
import IconButton from "@mui/material/IconButton";
import type { IDynamicPage } from "../../../../domain/entities/IDynamicPage";
import { EDIT_DYNAMIC_PAGE, MODE_ROUTE_CREATE, MODE_ROUTE_UPDATE } from '../../../router/routes';

import { Link } from "react-router-dom";
import { CopyUrlButton } from "../../../components/widgets/copy-url-button/CopyUrlButton";
import Typography from '@mui/material/Typography';
export interface IDynamicPageRow extends IRow {
  id?: string;
  name: string;
  lastChangeView: string;
  status: any;
  template: React.ReactNode;
  profiles: React.ReactNode;
  cancellation: React.ReactNode;
  url: React.ReactNode;
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
    
    const to = EDIT_DYNAMIC_PAGE.name
                                .replace(":id", String(d.id))
                                .replace(":mode", MODE_ROUTE_CREATE);

    const templateCom = (
      <IconButton component={Link} to={to}>
        <DisplaySettingIcon />
        <Typography  fontSize={12}>
          Nueva página
        </Typography>
      </IconButton>
    );

    const urlComp = d.url ? <CopyUrlButton url={d.url} /> : <p style={{ textAlign: 'center', paddingRight: '20%'}}> - </p>;
   
    return {
        id: String(d.id),
        name: d.title,       
        lastChangeView:  `${formatDate(d.dateUpdated,{includeTime: true})} - ${d.updatedBy}`,
        profiles: buttonEdit,
        status: stateComp,
        template: templateCom,        
        cancellation: cancelationComp,
        url: urlComp        
    }
}





