import type { IFilter } from "../../../../domain/entities/IFilter";
import { colors } from "../../../common/colors";
import type { SelectOption } from "../../../components/ui/inputs/select/select.interface";
import { CustomStack } from "../../../components/ui/stack/Stack";
import { selectedIconsHelpDocumentTypeCommon } from "../utils/selected-icon-help-document-type-common";

export function toHelpSelect(f: IFilter): SelectOption {
  return {
    label: f.description,
    value: f.id
  }
}


export function toHelpDocumentTypeSelectCommon(f: IFilter): SelectOption {

  const icon = selectedIconsHelpDocumentTypeCommon(f.id)

  return {
    label: <CustomStack spacing={2} direction="row" sx={{alignItems: 'center', justifyContent: 'space-between', width: '100%', color: colors.grey800, background: 'transparent' }}>
                <span style={{color: colors.grey900}}>{f.description}</span>
                  <>{icon}</>
           </CustomStack>,
    value: f.id
  }
}