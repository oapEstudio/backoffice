// src/presentation/features/profiles/components/ActionStep.tsx
import React from 'react'
import { CustomBox } from '../../../../../../components/ui/box/CustomBox'
import { Button } from '../../../../../../components/ui/button'
import { CustomStack } from '../../../../../../components/ui/stack/Stack'
import type { StepType } from '../../../../../../components/ui/step/step-navigation-backoffice'

interface ActionStepProps {
  handleNext: () => void
  handleBack: () => void
  isValid: boolean
  steps: StepType[],
  isLoading?: boolean
}

export const ActionStep: React.FC<ActionStepProps> = ({
  handleNext,
  handleBack,
  isValid,
  steps,
  isLoading = false,
}) => {

  const currentIndex = steps.findIndex((s) => s.active)
  const isLast = currentIndex === steps.length - 1

  return (
    <CustomBox sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
      <CustomStack direction="row" spacing={2}>
        <Button variant="secondary" title="Cancelar" onClick={handleBack} />

        <Button
          onClick={handleNext}
          disabled={!isValid || isLoading}
          variant="primary"
          title={isLast ? 'Guardar Perfil' : 'Aceptar'}
          
        />
      </CustomStack>
    </CustomBox>
  )
}
