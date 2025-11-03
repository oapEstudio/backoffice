import type { SelectOption } from '../../../../../../components/ui/inputs/select/select.interface';
import HelpInvisibleDocumentDetailsFields from '../../../../shared/components/details-fields/HelpInvisibleDocumentDetailsField';

interface StepOneNewAlertProps {
  selectItemsStatuses: SelectOption[];
}

export const StepOneNewAlert: React.FC<StepOneNewAlertProps> = ({
  selectItemsStatuses = [],
}) => {
  return (
    <HelpInvisibleDocumentDetailsFields selectItemsStatuses={selectItemsStatuses} />
  )
}
