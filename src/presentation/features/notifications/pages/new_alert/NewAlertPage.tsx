import { ContainerPage } from '../../../../components/containers/container-page/ContainerPage'
import { NEW_ALERT, NOTIFICATION } from '../../../../router/routes'
import { FormProvider } from 'react-hook-form'
import StepperWrapperBackOfficeDefault from '../../../../components/ui/step/stepper-wrapper-backoffice-default'
import StepNavigationBackOffice from '../../../../components/ui/step/step-navigation-backoffice'
import { CustomBox } from '../../../../components/ui/box/CustomBox'
import StepOneNewAlert from './components/StepOneNewAlert/StepOneNewAlert'
import { StepTwoNewAlert } from './components/StepTwoNewAlert/StepTwoNewAlert';
import { StepThreeNewAlert } from './components/StepThreeNewAlert/StepThreeNewAlert';
import { Button } from '../../../../components/ui/button'
import { ActionStep } from '../../../../components/ui/step/action-step/ActionStep'

import { eStep } from '../../shared/reducers/ActionStepReducer'
import { useNewAlertPage } from './hooks/useNewAlertPage'



export const NewAlertPage = () => {
  
  const { handleBack,
            handleNext,
            form,
            contentStepRef,
            navSteps,
            state, 
            onSubmit} = useNewAlertPage();
  
  return (
     <ContainerPage description="NewAlertPage" title={`${NOTIFICATION.title} - ${NEW_ALERT.title}`} titleSEO='Gestión de notificaciones - Alta alerta'>
          <div  ref={contentStepRef}/>
          <FormProvider {...form}>
             <StepperWrapperBackOfficeDefault width='40%'>
                 <StepNavigationBackOffice steps={navSteps} />
            </StepperWrapperBackOfficeDefault>
             <CustomBox  sx={{ p: '0 4rem', minHeight: 300,paddingTop: '2rem' }}>
    
              {state.step == 1 ? <StepOneNewAlert /> :<></>}
              {state.step == 2 ? <StepTwoNewAlert /> :<></>}
              {state.step >= 3 ? <StepThreeNewAlert /> : <></>}
             
             </CustomBox>
              <CustomBox sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              {false ? (
                <Button variant="primary" onClick={()=>{}} title='Volver al Inicio' />
              ) : (
                <ActionStep
                    labelBack={state.labelPrev}
                    labelNext={state.labelNext}
                    handleNext={state.step == eStep.STEP_THREE? form.handleSubmit(onSubmit) : handleNext}
                    handleBack={handleBack}
                    isValid={form.formState.isValid}
                    isLast={false} 
                  />
              )}
            </CustomBox>
          </FormProvider>
        </ContainerPage>
  )
}
