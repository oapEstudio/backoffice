import React from 'react'
import {  FormProvider } from 'react-hook-form'
import { ContainerPage } from '../../../../components/containers/container-page/ContainerPage'
import StepperWrapperBackOfficeDefault from '../../../../components/ui/step/stepper-wrapper-backoffice-default'
import StepNavigationBackOffice,{ type StepType } from '../../../../components/ui/step/step-navigation-backoffice'
import { CustomBox } from '../../../../components/ui/box/CustomBox'

import { StepOneProfile } from './components/step-one-profile/StepOneProfile'
import { StepTwoProfile } from './components/step-two-profile/StepTwoProfile'
import { ActionStep } from './components/action-step/ActionStep'

import Typography from '@mui/material/Typography'
import Button from '../../../../components/ui/button/button.component'
import { ResultSuccess } from './components/result-success/ResultSuccess'
import { FATHER_PROFILE, NEW_PROFILE } from '../../../../router/routes'
import { STEPS, useNewProfile } from './hooks/useNewProfile'




export const NewProfilePage: React.FC = () => {

  const {
      form,
      navSteps,
      isSuccess,
      created,
      activeStep,
      createError,
      resetFlow,
      prevStep,
      onSubmit,
      nextStep,
      creating} = useNewProfile();


  return (
    <ContainerPage description="NewProfilePage" title={`${FATHER_PROFILE.title} - ${NEW_PROFILE.title}`} titleSEO='Gestión de perfiles - Alta'>
      <FormProvider {...form}>
        <StepperWrapperBackOfficeDefault>
          <StepNavigationBackOffice steps={navSteps} />
        </StepperWrapperBackOfficeDefault>

        <CustomBox sx={{ p: '0 4rem', minHeight: 300 }}>
          {isSuccess ? (
            <CustomBox  py={6} sx={{justifyItems: 'center'}}  >
              <ResultSuccess perfil={created?.name??''} />
            </CustomBox>
          ) : activeStep === 0 ? (
            <StepOneProfile />
          ) : (
            <StepTwoProfile />
          )}
        </CustomBox>

        {createError && !isSuccess && (
          <Typography color="error" align="center">
            {createError}
          </Typography>
        )}


        <CustomBox sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          {isSuccess ? (
            <Button variant="primary" onClick={resetFlow} title='Volver al Inicio' />
          ) : (
            <ActionStep
                handleNext={activeStep === STEPS.length - 1 ? form.handleSubmit(onSubmit) : nextStep}
                handleBack={prevStep}
                isValid={form.formState.isValid}
                isLoading={creating} 
                steps={navSteps}/>
          )}
        </CustomBox>
      </FormProvider>
    </ContainerPage>
  )
}


