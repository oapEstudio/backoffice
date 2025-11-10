import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateHelpProfile } from './useUpdateHelpProfile';
import { eToast, Toast } from '../../../components/ui/toast/CustomToastService';


interface IFormValues {
  profiles: string[];
}

interface UseUpdateHelpProfileFormProps {
  open: boolean;
  helpId: string;
  selectedProfiles?: Array<{ id: string; name: string }>;
  onClose: () => void;
  onSaved: () => void;
}

export function useUpdateHelpProfileForm({
  open,
  helpId,
  selectedProfiles,
  onClose,
  onSaved,
}: UseUpdateHelpProfileFormProps) {
  const { update, loading } = useUpdateHelpProfile();

  const form = useForm<IFormValues>({
    defaultValues: {
      profiles: (selectedProfiles ?? []).map((p) => String(p.id)),
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const {
    control,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = form;

  useEffect(() => {
    if (open) {
      reset({ profiles: (selectedProfiles ?? []).map((p) => String(p.id)) });
    }
  }, [open, selectedProfiles, reset]);

  const onCancel = () => {
    reset();
    onClose();
  };

  const handleSave = handleSubmit(async (data) => {
    try {
      await update(helpId, { profiles: data.profiles });
      Toast({ 
        message: 'Perfiles actualizados con éxito', 
        type: eToast.Success 
      });
      onSaved();
      reset();
      onClose();
    } catch (err: any) {
      const message = err?.error?.message;
      Toast({ 
        message: message || 'Error al actualizar los perfiles', 
        type: eToast.Error 
      });
    }
  });

  const profileValidator = (v: string[] | undefined) => 
    (v?.length ?? 0) > 0 || 'Seleccione al menos un perfil';

  return {
    form,
    control,
    errors,
    isValid,
    loading,
    onCancel,
    handleSave,
    profileValidator,
  };
}