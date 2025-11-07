import { Controller, FormProvider, useForm } from "react-hook-form";
import { useUpdateHelpProfile } from "../../../../hooks/useUpdateHelpProfile";
import { useEffect } from "react";
import { eToast, Toast } from "../../../../../../components/ui/toast/CustomToastService";
import CustomModal from "../../../../../../components/ui/modal/modal.component";
import DualProfileFetch from "../../../../../../components/widgets/dual-profile-add-fetch/DualProfileAddFetch";
import { Typography } from "@mui/material";
import Loading from "../../../../../../components/ui/loading";
import { CustomBox } from "../../../../../../components/ui/box/CustomBox";

interface UpdateHelpProfilesProps {
  open: boolean;
  helpId: string;
  isLoadingProfiles: boolean;
  selectedProfiles?: Array<{ id: string; name: string }>;
  leftSeedProfiles?: Array<{ id: string; name: string }>;
  onClose: () => void;
  onSaved: () => void;
}

interface IFormValues {
  profiles: string[];
}

export const UpdateHelpProfile: React.FC<UpdateHelpProfilesProps> = ({
  open,
  helpId,
  isLoadingProfiles,
  selectedProfiles,
  leftSeedProfiles,
  onClose,
  onSaved,
}) => {
  const { update, loading } = useUpdateHelpProfile();

  const form = useForm<IFormValues>({
    defaultValues: {
      profiles: (selectedProfiles ?? []).map((p) => String(p.id)),
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  const {
    control,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = form

  useEffect(() => {
    if (open) {
      reset({ profiles: (selectedProfiles ?? []).map((p) => String(p.id)) })
    }
  }, [open, selectedProfiles, reset])

  const onCancel = () => {
    reset()
    onClose()
  }

  const handleSave = handleSubmit(async (data) => {
      try {
      await update(helpId, { profiles: data.profiles })
        Toast({ message: 'Perfiles actualizados con éxito', type: eToast.Success });
        onSaved();
        reset();
        onClose();
       } catch (err: any) {
        const message = err?.error?.message;
        Toast({ message: message ? message : 'Error al actualizar los perfiles', type: eToast.Error });
      }
  })

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
          rules={{ validate: (v) => (v?.length ?? 0) > 0 || 'Seleccione al menos un perfil' }}
          render={({ field, fieldState: { error } }) => (
            <>
              {isLoadingProfiles ? (
                <CustomBox display="flex" justifyContent="center" my={2}>
                  <Loading />
                </CustomBox>
              ) : (
                <DualProfileFetch
                  remountKey={open ? "open" : "closed"}
                  selectedProfiles={selectedProfiles}
                  initialLeftProfiles={leftSeedProfiles}
                  selectedFilters={field.value}
                  onChange={field.onChange}
                />
              )}
              {!!error && (
                <Typography color="error" variant="caption" sx={{ mt: 1, display: "block" }}>
                  {error.message}
                </Typography>
              )}
            </>

          )}
        />
      </FormProvider>
    </CustomModal>
  )
}

export default UpdateHelpProfile
