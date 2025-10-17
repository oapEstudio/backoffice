import { styled } from "@mui/material/styles";
import type { IRow } from "../../../components/ui/table/table.interface";
import { formatDate } from '../../../utils/formatDate';
import type { IHelp } from "../../../../domain/entities/IHelp";
import { CopyUrlButton } from "../../../components/widgets/copy-url-button/CopyUrlButton";
import { CustomStack } from "../../../components/ui/stack/Stack";
import { EditActionIcon } from "../../../components/ui/icons";


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
}

export function toHelpsRow(h: IHelp, callbackEdit?: any): IHelpRow {

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
        {h.profile.length}
      </span>
      <WrapperContainerEdit>
        <EditActionIcon handleClick={callbackEdit} parameterHandleClick={h} />
      </WrapperContainerEdit>
    </CustomStack>
  );

  const WrapperContainerStatus = styled('div')(({ theme }) => ({
    color: '',
    paddingLeft: '1%',
  }));


  const urlComp = <CopyUrlButton url={h.link} />;

  const stateComp = <>
    <WrapperContainerStatus>
      {h.status}
    </WrapperContainerStatus>
  </>

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
    styleContentElement
  };
}
