import type { SelectOption } from '../../../../../../components/ui/inputs/select/select.interface';
import HelpInvisibleDocumentDetailsFields from '../../../../shared/components/details-fields/HelpInvisibleDocumentDetailsField';

interface StepOneNewInvisibleDocumentProps {
  selectItemsStatuses: SelectOption[];
  selectItemsDocumentType: SelectOption[];
}

export const StepOneNewInvisibleDocument: React.FC<StepOneNewInvisibleDocumentProps> = ({
  selectItemsStatuses = [],
  selectItemsDocumentType = [],
}) => {
  return (
    <HelpInvisibleDocumentDetailsFields selectItemsStatuses={selectItemsStatuses} selectItemsDocumentType={selectItemsDocumentType} />
  )
}
