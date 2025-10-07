import React from 'react'
import { TitleStep } from '../title-step/TitleStep'
import { ProfileForm } from '../../../shared/components/profile-form-values/ProfileFormValues'

export const StepOneProfile: React.FC = () => (
  <>
    <TitleStep
      title="Crear un perfil"
      subtitle="Generá un perfil que incluya nombre, descripción y estado"
    />
    <ProfileForm isCreate={true} />
  </>
)