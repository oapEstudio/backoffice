
import { useNewBellPage } from './hooks/useNewBellPage';
import { NEW_BELL, NOTIFICATION } from '../../../../router/routes';
import { ContainerPage } from '../../../../components/containers/container-page/ContainerPage';
import { FormProvider } from 'react-hook-form';
import { CustomBox } from '../../../../components/ui/box/CustomBox';
import StepNavigationBackOffice from '../../../../components/ui/step/step-navigation-backoffice';
import StepperWrapperBackOfficeDefault from '../../../../components/ui/step/stepper-wrapper-backoffice-default';
import { ActionStep } from '../../../../components/ui/step/action-step/ActionStep';
import { eStep } from '../new_carousel/reducers/ActionStepReducer';
import { Button } from '../../../../components/ui/button';
import StepOneNewBell from './components/StepOneNewBell/StepOneNewBell';
import { StepTwoNewBell } from './components/StepTwoNewBell/StepTwoNewBell';
import StepThreeBell from './components/StepThreeNewBell/StepThreeBell';

export const NewBellPage = () => {

  const { handleBack,
             handleNext,
             form,
             contentStepRef,
             navSteps,
             state, 
             onSubmit} = useNewBellPage();
   
   return (
      <ContainerPage description="NewABelltPage" title={`${NOTIFICATION.title} - ${NEW_BELL.title}`} titleSEO='Gestión de notificaciones - Alta campana'>
           <div  ref={contentStepRef}/>
           <FormProvider {...form}>
              <StepperWrapperBackOfficeDefault width='40%'>
                  <StepNavigationBackOffice steps={navSteps} />
             </StepperWrapperBackOfficeDefault>
              <CustomBox  sx={{ p: '0 4rem', minHeight: 300,paddingTop: '2rem' }}>
     
               {state.step == 1 ? <StepOneNewBell /> :<></>}
               {state.step == 2 ? <StepTwoNewBell /> :<></>}
               {state.step >= 3 ? <StepThreeBell /> : <></>}
              
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
