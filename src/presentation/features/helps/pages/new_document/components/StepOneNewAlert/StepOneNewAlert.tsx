import type { SelectOption } from '../../../../../../components/ui/inputs/select/select.interface';
import HelpDocumentDetailsFields from '../../../../shared/components/details-fields/HelpDocumentDetailsField';

interface StepOneNewAlertProps {
  selectItemsStatuses: SelectOption[];
  selectItemsDocumentType: SelectOption[];
}

export const StepOneNewAlert: React.FC<StepOneNewAlertProps> = ({
  selectItemsStatuses = [],
  selectItemsDocumentType = [],
}) => {
  return (
    <HelpDocumentDetailsFields selectItemsStatuses={selectItemsStatuses} selectItemsDocumentType={selectItemsDocumentType} />
  )
}
