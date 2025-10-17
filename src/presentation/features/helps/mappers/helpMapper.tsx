import { styled } from "@mui/material/styles";
import type { IRow } from "../../../components/ui/table/table.interface";
import { formatDate } from '../../../utils/formatDate';
import type { IHelp } from "../../../../domain/entities/IHelp";
import { CopyUrlButton } from "../../../components/widgets/copy-url-button/CopyUrlButton";
import { CustomStack } from "../../../components/ui/stack/Stack";
import { DangerIcon, EditActionIcon } from "../../../components/ui/icons";
import IconButton from "@mui/material/IconButton";


export interface IHelpRow extends IRow {
  name: string;
  title: string;
  state: any;
  helpTypeId: number;
  lastChangeView: string;
  statusId: number;
  profiles: any;
  url: any;
  helpType: string;
  cancellation: any;
}

export function toHelpsRow(h: IHelp, callbackEdit?: any, callbackCancellation?: any): IHelpRow {

  const styleContentElement = {
    justifyContent: "left",
    paddingLeft: "5%"
  };

  const WrapperContainerEdit = styled('div')(() => ({
    cursor: 'pointer',
    textAlign: 'center',
    paddingLeft: '20px'
  }));

  const buttonEdit = (
    <CustomStack direction='row' spacing={2} sx={styleContentElement}>
      <span>
        {h.profile.length}
      </span>
      <WrapperContainerEdit>
        <EditActionIcon handleClick={callbackEdit} parameterHandleClick={h} />
      </WrapperContainerEdit>
    </CustomStack>
  );

  const WrapperContainerStatus = styled('div')(() => ({
    color: h.statusColor,
    textAlign: 'center',
    paddingRight: '20px'
  }));

  const urlComp = <CopyUrlButton url={h.link} />;

  const stateComp = <>
    <WrapperContainerStatus>
      {h.statusDescription}
    </WrapperContainerStatus>
  </>

  const cancelationComp = <IconButton onClick={()=>callbackCancellation(h)}>
                                    <DangerIcon />
                            </IconButton>
  return {
    id: h.id,
    helpType: h.helpType,
    helpTypeId: h.helpTypeId,
    title: h.title,
    name: h.name,
    lastChangeView: `${formatDate(h.dateUpdated, { includeTime: true })} - ${h.updatedBy}`,
    state: stateComp,
    url: h.link ? urlComp : null,
    statusId: h.statusId,
    profiles: buttonEdit,
    cancellation: cancelationComp,
    styleContentElement
  };
}
