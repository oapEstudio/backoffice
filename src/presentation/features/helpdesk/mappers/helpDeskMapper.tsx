// src/presentation/mappers/profileMapper.ts

import { styled } from "@mui/material/styles";
import type { IRow } from "../../../components/ui/table/table.interface";
import { formatDate } from '../../../utils/formatDate';
import type { IHelpDesk } from "../../../../domain/entities/IHelpDesk";
import { CopyUrlButton } from "../../../components/widgets/copy-url-button/CopyUrlButton";
import { CustomStack } from "../../../components/ui/stack/Stack";
import { EditActionIcon } from "../../../components/ui/icons";


export interface IHelpDeskRow extends IRow {
  name: string;
  state: any;
  lastChangeView: string;
  statusId: number;
  profiles: any;
  url: any;
  type: string;
}

export function toHelpDeskRow(h: IHelpDesk, callbackEdit?: any): IHelpDeskRow {

  const styleContentElement = {
    justifyContent: "left",
    paddingLeft: "5%"
  };

  const WrapperContainerEdit = styled('div')(({ theme }) => ({
    cursor: 'pointer'
  }));


  const buttonEdit = (
    <CustomStack direction='row' spacing={2} sx={styleContentElement}>
      <span>
        {h.groups.join(', ')}
      </span>
      <WrapperContainerEdit>
        <EditActionIcon handleClick={callbackEdit} parameterHandleClick={h} />
      </WrapperContainerEdit>
    </CustomStack>
  );


  const WrapperContainerStatus = styled('div')(({ theme }) => ({
    color: h.statusColor,
    paddingLeft: '1%',
  }));


  const urlComp = <CopyUrlButton url={h.url} />;

  const stateComp = <>
    <WrapperContainerStatus>
      {h.statusDescription}
    </WrapperContainerStatus>
  </>

  return {
    id: h.id,
    type: h.type,
    name: h.name,
    lastChangeView: `${formatDate(h.dateLastUpdate, { includeTime: true })} - ${h.updatedBy}`,
    state: stateComp,
    url: urlComp,
    statusId: h.statusId,
    profiles: buttonEdit,
    styleContentElement
  };
}
