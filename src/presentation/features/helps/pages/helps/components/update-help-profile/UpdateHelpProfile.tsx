import { Controller, FormProvider, useForm } from "react-hook-form";
import CustomModal from "../../../../../../components/ui/modal/modal.component";
import DualProfileFetch from "../../../../../../components/widgets/dual-profile-add-fetch/DualProfileAddFetch";
import { Typography } from "@mui/material";
import Loading from "../../../../../../components/ui/loading";
import { CustomBox } from "../../../../../../components/ui/box/CustomBox";
import { useUpdateHelpProfileForm } from "../../../../hooks/useUpdateHelpProfileForm";

interface UpdateHelpProfilesProps {
  open: boolean;
  helpId: string;
  isLoadingProfiles: boolean;
  selectedProfiles?: Array<{ id: string; name: string }>;
  leftSeedProfiles?: Array<{ id: string; name: string }>;
  onClose: () => void;
  onSaved: () => void;
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

  const {
    form,
    control,
    isValid,
    loading,
    onCancel,
    handleSave,
    profileValidator,
  } = useUpdateHelpProfileForm({
    open,
    helpId,
    selectedProfiles,
    onClose,
    onSaved,
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
          rules={{ validate: profileValidator }}
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
                <Typography color="error.main" variant="caption" sx={{ mt: 1, display: "block" }}>
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
