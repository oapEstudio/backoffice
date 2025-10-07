// src/presentation/mappers/profileMapper.ts

import { styled } from "@mui/material/styles";
import type { IProfile } from "../../../../domain/entities/IProfile";
import { CustomStack } from "../../../components/ui/stack/Stack";
import { EditActionIcon } from "../../../components/ui/icons";
import type { IRow } from "../../../components/ui/table/table.interface";
import type { IGroup } from "../../../../domain/entities/IGroup";
import { formatDate } from '../../../utils/formatDate';

export interface IProfileRow extends IRow {
  name: string; 
  state: any;
  creationDate: Date;
  lastChange: Date;
  lastChangeView: string;
  groups: any; 
  background?: string;
  description: string;
  statusId: number;
  updatedBy: string;
}

export function toProfileRow(p: IProfile,callbackEdit: any): IProfileRow {

  const styleContentElement= {
    justifyContent: "left",
    paddingLeft: "5%"
  };

  const WrapperContainerEdit = styled('div')(({ theme }) => ({
  cursor: 'pointer'
  }));

  const WrapperContainerStatus = styled('div')(({theme})=>({
    color: p.statusColor,
    paddingLeft: '1%'
  }));
  const buttonEdit = <>
                <CustomStack direction='row' spacing={2} sx={styleContentElement}>
                     <span>
                        {p.groupsCount}
                     </span>
                     <WrapperContainerEdit>
                        <EditActionIcon handleClick={callbackEdit} parameterHandleClick={p} />
                      </WrapperContainerEdit>
                </CustomStack>
              </>;

  const stateComp = <>
    <WrapperContainerStatus>
      {p.statusDescription}
    </WrapperContainerStatus>
  </>
  return {
    id: p.id,
    name: p.name,
    creationDate: p.dateCreated,
    lastChangeView: `${formatDate(p.dateUpdated,{includeTime: true})} - ${p.updatedBy}`,
    lastChange: p.dateUpdated,
    state: stateComp,
    groups: buttonEdit,    
    description: p.description,
    statusId: p.statusId,
    updatedBy: p.updatedBy
  };
}
