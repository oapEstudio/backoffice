import type { SelectOption } from '../../../../../../components/ui/inputs/select/select.interface';
import HelpSectionDetailsFields from '../../../../shared/components/details-fields/HelpSectionDetailsFields'

interface StepOneNewAlertProps {
  selectItemsStatuses: SelectOption[];
}

export const StepOneNewAlert: React.FC<StepOneNewAlertProps> = ({
  selectItemsStatuses = []
}) => {
  return (
    <HelpSectionDetailsFields selectItemsStatuses={selectItemsStatuses} />
  )
}
