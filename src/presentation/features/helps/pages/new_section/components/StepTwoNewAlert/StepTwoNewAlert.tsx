import type { SelectOption } from '../../../../../../components/ui/inputs/select/select.interface';
import HelpSectionDetailsFields from '../../../../shared/components/details-fields/HelpSectionDetailsFields'

interface StepTwoNewAlertProps {
  selectItemsStatuses: SelectOption[];
}

export const StepTwoNewAlert: React.FC<StepTwoNewAlertProps> = ({
  selectItemsStatuses = []
}) => {
  return (
    <HelpSectionDetailsFields selectItemsStatuses={selectItemsStatuses} />
  )
}
