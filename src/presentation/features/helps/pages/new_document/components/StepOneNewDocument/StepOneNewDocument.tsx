import type { SelectOption } from '../../../../../../components/ui/inputs/select/select.interface';
import HelpDocumentDetailsFields from '../../../../shared/components/details-fields/HelpDocumentDetailsField';

interface StepOneNewDocumentProps {
  selectItemsStatuses: SelectOption[];
  selectItemsDocumentType: SelectOption[];
}

export const StepOneNewDocument: React.FC<StepOneNewDocumentProps> = ({
  selectItemsStatuses = [],
  selectItemsDocumentType = [],
}) => {
  return (
    <HelpDocumentDetailsFields selectItemsStatuses={selectItemsStatuses} selectItemsDocumentType={selectItemsDocumentType} />
  )
}
