import React, { useEffect } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import Typography from '@mui/material/Typography'

import CustomModal from '../../../../../../components/ui/modal/modal.component'
import DualProfileFetch from '../../../../../../components/widgets/dual-profile-add-fetch/DualProfileAddFetch'
import { eToast, Toast } from '../../../../../../components/ui/toast/CustomToastService'
import { useUpdateNotificationProfile } from '../../../../hooks/useUpdateNotificationProfile'

interface UpdateNotificationProfileCarouselProps {
  
  open: boolean;
  notificationId: string;
  selectedProfiles?: Array<{ id: string; name: string }>;
  leftSeedProfiles?: Array<{ id: string; name: string }>;
  onClose: () => void;
  onSaved: () => void;
}

interface IFormValues {
  profiles: string[];
}

export const UpdateNotificationProfileCarousel: React.FC<UpdateNotificationProfileCarouselProps> = ({
  open,
  notificationId,
  selectedProfiles,
  leftSeedProfiles,
  onClose,
  onSaved,
}) => {
  const { update, loading } = useUpdateNotificationProfile()

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
      await update(notificationId, { profiles: data.profiles })
      Toast({ message: 'Perfiles actualizados con éxito', type: eToast.Success })
      onSaved()
      reset()
      onClose()
    } catch {
      Toast({ message: 'Error al asignar perfiles a la notificación', type: eToast.Error })
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
  )
}

export default UpdateNotificationProfileCarousel
