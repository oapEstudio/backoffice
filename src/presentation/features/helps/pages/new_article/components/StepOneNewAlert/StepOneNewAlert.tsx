import type { SelectOption } from '../../../../../../components/ui/inputs/select/select.interface';
import HelpArticleDetailsFields from '../../../../shared/components/details-fields/HelpArticleDetailsField';

interface StepOneNewAlertProps {
  selectItemsStatuses: SelectOption[];
  selectItemsSection: any[];
}

export const StepOneNewAlert: React.FC<StepOneNewAlertProps> = ({
  selectItemsStatuses = [],
  selectItemsSection = []
}) => {
  return (
    <HelpArticleDetailsFields selectItemsSection={selectItemsSection} selectItemsStatuses={selectItemsStatuses} />
  )
}
