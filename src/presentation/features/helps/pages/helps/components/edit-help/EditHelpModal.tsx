import React from "react";
import { FormProvider } from "react-hook-form";
import CustomModal from "../../../../../../components/ui/modal/modal.component";
import { HELP_TYPES } from "../../../../shared/constants/helps";
import { useEditHelpModal } from "../../../../hooks/useEditHelpModal";
import Loading from "../../../../../../components/ui/loading";

interface EditHelpModalProps {
  open: boolean;
  helpType: number;
  helpId: string | null;
  onSuccess: () => void;
  onClose: () => void;
}

export const EditHelpModal: React.FC<EditHelpModalProps> = ({   
  open, 
  onSuccess, 
  onClose, 
  helpId, 
  helpType }) => {
  const { 
    form, 
    shouldShowFields, 
    isLoading, 
    handleOk,
    isDisabled 
  } = useEditHelpModal({
    open,
    helpId,
    helpType,
    onSuccess,
    onClose
  });

  return (
    <CustomModal
      title={`Editar ${HELP_TYPES[helpType]?.toLowerCase()}`}
      open={open}
      onOk={handleOk}
      onClose={onClose}
      onCancel={onClose}
      disabled={isDisabled}
      maxWidth="sm">
      <FormProvider {...form}>
        {isLoading ? <center> <Loading/> </center> : shouldShowFields }
      </FormProvider>
    </CustomModal>
  );
};

export default EditHelpModal;