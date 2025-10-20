import { CustomBox } from "../../../../../components/ui/box/CustomBox";
import { Button } from "../../../../../components/ui/button";
import { CustomStack } from "../../../../../components/ui/stack/Stack";

interface ActionStepProps {
  handleNext: () => void;
  handleBack: () => void;
  labelNext: string;
  labelBack: string;
  isValid: boolean;
  isLast: boolean;
}

export const ActionStep: React.FC<ActionStepProps> = ({
  handleNext,
  handleBack,
  isValid,
  isLast,
  labelNext,
  labelBack  
}) => {


  return (
    <CustomBox sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
      <CustomStack direction="row" spacing={2}>
        <Button variant="secondary" title={labelBack} onClick={handleBack} />

        <Button
          onClick={handleNext}
          disabled={!isValid}
          variant="primary"
          title={labelNext}
          
        />
      </CustomStack>
    </CustomBox>
  )
}
