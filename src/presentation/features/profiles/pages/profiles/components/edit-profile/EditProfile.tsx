// src/presentation/features/profiles/pages/profiles/components/EditProfileModal.tsx
import React, { useEffect } from "react"
import { useForm, FormProvider } from "react-hook-form"
import CustomModal from "../../../../../../components/ui/modal/modal.component"
import Button from "../../../../../../components/ui/button/button.component"
import type { IProfileFormValues } from "../../../shared/components/profile-form-values/IProfileFormValues"
import { useContext } from "react"
import { DependencyContext } from "../../../../../../contexts/DependencyContext"
import { ProfileForm } from "../../../shared/components/profile-form-values/ProfileFormValues"
import { useUpdateProfile } from "../../../../hooks/useUpdateProfile"
import { eToast, Toast } from "../../../../../../components/ui/toast/CustomToastService"

interface EditProfileModalProps {
  open: boolean
  onClose: () => void
  initialData: IProfileFormValues & { id: string }
  onSaved: () => void
}

export const EditProfile: React.FC<EditProfileModalProps> = ({
  open,
  onClose,
  initialData,
  onSaved,
}) => {

  const form = useForm<IProfileFormValues  & { id: string }>({
    defaultValues: {
      name: initialData.name,
      description: initialData.description,
      statusId: initialData.statusId,
      id: initialData.id
    },
    mode: "onChange",
  })

  const { updateProfile } = useContext(DependencyContext)

  const {update, loading: saving, error: saveError} = useUpdateProfile(updateProfile);

  useEffect(() => {
    if (open) {
      form.reset({
        name: initialData.name,
        description: initialData.description,
        statusId: initialData.statusId,
      })
    }
  }, [open, initialData, form])

  const handleSave = form.handleSubmit(async data => {
   
    await update(initialData.id, {
      name: data.name,
      description: data.description,
      statusId: data.statusId
    });

    if(!saving && saveError){
      Toast({
        message: saveError ?? 'Error al editar el perfil',
        type: eToast.Error
      });

      return;
    }
    onSaved()
    onClose()
  })

  const onCancel = ()=>{
    form.reset();
    onClose()
  }

  return (
    <CustomModal
      title="Editar Perfil"
      subtitle="Modificá su nombre, descripción y/o estado."
      open={open}
      labelOk="Aplicar"
      onClose={onClose}
      onCancel={onCancel}
      maxWidth="sm"
      onOk={handleSave}
      disabled={!form.formState.isValid}
    >
      <FormProvider {...form}>
        <ProfileForm isCreate={false} />
      </FormProvider>
    </CustomModal>
  )
}
