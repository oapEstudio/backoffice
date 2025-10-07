import React, { useEffect } from 'react'
import CustomModal from '../../../../../../components/ui/modal/modal.component'
import { eToast, Toast } from '../../../../../../components/ui/toast/CustomToastService';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import { useUpdateMenuProfileGroup } from '../../../../hooks/useUpdateMenuProfileGroup';
import DualProfileFetch from '../../../../../../components/widgets/dual-profile-add-fetch/DualProfileAddFetch';

interface AddProfileProps {
  open: boolean;
  
  initialProfiles: IGroupProfilesFormValues;
  selectedProfiles?: Array<{ id: string; name: string }>;
  menuID: string;
  leftSeedProfiles?: Array<{ id: string; name: string }>;
  onClose: () => void;
  onSaved: () => void;
}

interface IGroupProfilesFormValues {
  profiles: string[];
}

export const AddProfile: React.FC<AddProfileProps> = ({
  open,
  initialProfiles,
  selectedProfiles,         
  leftSeedProfiles,
  onClose,
  onSaved,
  menuID
}) => {
  const { update, loading, error } = useUpdateMenuProfileGroup();

  const form = useForm<IGroupProfilesFormValues>({
    defaultValues: {
      profiles: initialProfiles?.profiles ?? []
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
      reset(initialProfiles);
    }
  }, [open, initialProfiles, reset]);

  const onCancel = () => {
    reset();
    onClose();
  };

  const handleSave = handleSubmit(async (data) => {
    try {
      await update(menuID, { profileIds: data.profiles });
      Toast({ message: 'Perfiles actualizados con éxito', type: eToast.Success });
      onSaved();
      reset();
      onClose();
    } catch {
      Toast({ message: 'Error al asignar perfiles al menú', type: eToast.Error });
    }
  });

  return (
    <CustomModal
      title={'Selección de perfil'}
      open={open}
      onClose={onClose}
      onCancel={onCancel}
      onOk={handleSave}
      maxWidth="sm"
      disabled={!isValid || loading}
    >
      <FormProvider {...form}>
        <Controller
          name="profiles"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <DualProfileFetch
                remountKey={open ? 'open' : 'closed'}
                selectedProfiles={selectedProfiles}            
                selectedFilters={field.value}
                initialLeftProfiles={leftSeedProfiles}             
                onChange={field.onChange}               
              />
              {error && (
                <Typography color="error" variant="caption">
                  {error.message}
                </Typography>
              )}
            </>
          )}
        />
      </FormProvider>
    </CustomModal>
  );
};
