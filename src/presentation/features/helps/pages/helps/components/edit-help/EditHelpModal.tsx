import React, { useMemo } from "react";
import type { IHelp } from "../../../../../../../domain/entities/IHelp";
import { FormProvider, useForm } from "react-hook-form";
import type { IHelpFormValues } from "../../../../shared/interface/IHelpFormValues";
import CustomModal from "../../../../../../components/ui/modal/modal.component";
import { HELP_ARTICLE, HELP_DOCUMENT, HELP_SECTION, HELP_TYPES } from "../../../../shared/constants/helps";
import Loading from "../../../../../../components/ui/loading";
import HelpSectionDetailsFields from "../../../../shared/components/HelpSectionDetailsFields";

interface EditEditModalProps {
  open: boolean;
  helpType: number;
  helpId: string | null;
  onClose: () => void;
  onSaved: () => void;
}
 
export const EditHelpModal: React.FC<EditEditModalProps> = ({ open, helpId, helpType, onClose, onSaved, }) => {
  //const { fetchById, loading: loadingFetch } = useGetNotificationById();
  //const { update, loading: loadingUpdate } = useUpdateNotification();
  const [current, setCurrent] = React.useState<IHelp | null>(null);
 
  const form = useForm<IHelpFormValues>({
    defaultValues: {
        name: '',
        description: '',
        parentId: '',
        profiles: [],
        title: '',
        document: [],
        state: '',
        helpTypeId: '',
        helpDocumentTypeId: '',
        link: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  
  const helpFields = useMemo(() => {
    switch (helpType) {
      case HELP_SECTION:
        return <HelpSectionDetailsFields autoCleanup disabledState={false} />;
      case HELP_ARTICLE:
        return  null;
      case HELP_DOCUMENT:
        return null;
      default:
        return null;
    }
  }, [helpType]);


  return (
    <CustomModal
      title={`Editar ${HELP_TYPES[helpType]}`}
      open={open}
      onClose={onClose}
      onCancel={onClose}
      onOk={() => {}}
      disabled={!form.formState.isValid}
      maxWidth="sm"
    >
      <FormProvider {...form}>{helpFields}</FormProvider>
    </CustomModal>
  );
};
 
export default EditHelpModal;