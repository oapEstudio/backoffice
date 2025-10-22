import type { SelectOption } from '../../../../../../components/ui/inputs/select/select.interface';
import HelpArticleDetailsFields from '../../../../shared/components/details-fields/HelpArticleDetailsField';

interface StepOneNewAlertProps {
  selectItemsStatuses: SelectOption[];
}

export const StepOneNewAlert: React.FC<StepOneNewAlertProps> = ({
  selectItemsStatuses = [],
}) => {
  return (
    <HelpArticleDetailsFields selectItemsStatuses={selectItemsStatuses} />
  )
}
