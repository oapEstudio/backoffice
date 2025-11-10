import type { SelectOption } from '../../../../../../components/ui/inputs/select/select.interface';
import HelpSectionDetailsFields from '../../../../shared/components/details-fields/HelpSectionDetailsFields'

interface StepOneNewSectionProps {
  selectItemsStatuses: SelectOption[];
}

export const StepOneNewSection: React.FC<StepOneNewSectionProps> = ({
  selectItemsStatuses = []
}) => {
  return (
    <HelpSectionDetailsFields selectItemsStatuses={selectItemsStatuses} />
  )
}
