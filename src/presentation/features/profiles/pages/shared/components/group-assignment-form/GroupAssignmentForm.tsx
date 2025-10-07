// src/presentation/features/profiles/shared/components/GroupAssignmentForm.tsx
import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import DualGroupAD from '../../../../../../components/widgets/dual-group-ad/DualGroupAD'
import Typography from '@mui/material/Typography'
import type { IProfileFormValues } from '../profile-form-values/IProfileFormValues'
import DualGroupADFetch from '../../../../../../components/widgets/dual-group-add-fetch/DualGroupFetch'

export const GroupAssignmentForm: React.FC = () => {
  const { control } = useFormContext<IProfileFormValues>();

  return (
    <>     
      <Controller
        name="groups"
        control={control}
        rules={{
          validate: v => v.length > 0 || 'Debes asignar al menos un grupo'
        }}
        render={({ field, fieldState: { error } }) => (
          <>
            <DualGroupADFetch
              selectedGroups={field.value}
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
    </>
  )
}
