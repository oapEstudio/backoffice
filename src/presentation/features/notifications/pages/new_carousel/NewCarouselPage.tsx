import { NEW_CAROUSEL, NOTIFICATION } from '../../../../router/routes'
import { ContainerPage } from '../../../../components/containers/container-page/ContainerPage'
import StepperWrapperBackOfficeDefault from '../../../../components/ui/step/stepper-wrapper-backoffice-default'
import StepNavigationBackOffice, { type StepType } from '../../../../components/ui/step/step-navigation-backoffice'
import { CustomBox } from '../../../../components/ui/box/CustomBox'
import Button from '../../../../components/ui/button/button.component'

import { StepOneNotifications } from './componentes/step-one-notifications/StepOneNotifications'

import { FormProvider } from 'react-hook-form'
import { StepTwoNotifications } from './componentes/step-two-notifications/StepTwoNotifications'

import StepThreeNotifications from './componentes/step-three-notifications/StepThreeNotifications'
import { useNewCarouselPage } from './hooks/useNewCarouselPage'
import { eStep } from './reducers/ActionStepReducer'
import { ActionStep } from '../../shared/components/action-step/ActionStep'



export const NewCarouselPage = () => {

  const {contentStepRef,form,navSteps,state,onSubmit,handleBack,handleNext} = useNewCarouselPage()
 
  return (
    
    <ContainerPage description="NewCarouselPage" title={`${NOTIFICATION.title} - ${NEW_CAROUSEL.title}`} titleSEO='Gestión de notificaciones - Alta carousel'>
      <div  ref={contentStepRef}/>
      <FormProvider {...form}>
         <StepperWrapperBackOfficeDefault width='40%'>
             <StepNavigationBackOffice steps={navSteps} />
        </StepperWrapperBackOfficeDefault>
         <CustomBox  sx={{ p: '0 4rem', minHeight: 300,paddingTop: '2rem' }}>

          {state.step == 1 ? <StepOneNotifications /> :<></>}
          {state.step == 2 ? <StepTwoNotifications /> :<></>}
          {state.step >= 3 ? <StepThreeNotifications /> : <></>}
         
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
