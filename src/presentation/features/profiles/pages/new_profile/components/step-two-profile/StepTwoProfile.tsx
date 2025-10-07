import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'

import { TitleStep } from '../title-step/TitleStep'
import DualGroupAD from '../../../../../../components/widgets/dual-group-ad/DualGroupAD'
import Typography from '@mui/material/Typography'
import type { IProfileFormValues } from '../../../shared/components/profile-form-values/IProfileFormValues'
import { GroupAssignmentForm } from '../../../shared/components/group-assignment-form/GroupAssignmentForm'

export const StepTwoProfile: React.FC = () => {
 
  return (
    <>
      <TitleStep
        title="Asignación de Grupos"
        subtitle="Selecciona los grupos AD para este perfil."
      />

     <GroupAssignmentForm />
    </>
  )
}
