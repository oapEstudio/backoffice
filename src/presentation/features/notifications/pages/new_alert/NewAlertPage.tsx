import React, { useReducer, useRef, useState } from 'react'
import { ContainerPage } from '../../../../components/containers/container-page/ContainerPage'
import { NEW_ALERT, NOTIFICATION } from '../../../../router/routes'
import { FormProvider, useForm } from 'react-hook-form'
import StepperWrapperBackOfficeDefault from '../../../../components/ui/step/stepper-wrapper-backoffice-default'
import StepNavigationBackOffice, { type StepType } from '../../../../components/ui/step/step-navigation-backoffice'
import { CustomBox } from '../../../../components/ui/box/CustomBox'
import { StepNumber } from '../../shared/components/step-number/StepNumber'
import { useScrollToTopOnStep } from '../../../../utils/useScrollToTopOnStep'
import { ActionStepReducer, eStep, getActionStepInitialState } from './reducers/ActionStepReducer'
import type { INotificationFormValues } from '../../shared/interface/INotificationFormValues'
import { NOTIFICATION_ALERT, STATE_NOTIFICATION_CAROUSEL_NEW as STATE_NOTIFICATION_NEW } from '../../shared/constants/notifications'
import StepOneNewAlert from './components/StepOneNewAlert/StepOneNewAlert'
import { StepTwoNewAlert } from './components/StepTwoNewAlert/StepTwoNewAlert';
import { StepThreeNewAlert } from './components/StepThreeNewAlert/StepThreeNewAlert';
import { Button } from '../../../../components/ui/button'
import { ActionStep } from '../../shared/components/action-step/ActionStep'
import { eToast, Toast } from '../../../../components/ui/toast/CustomToastService'
import { useNavigate } from 'react-router-dom'
import { navStepSelected } from '../../../../utils/navStepSelected'
import { useCreateNotification } from '../../hooks/useCreateNotification'

const navStepsInit: StepType[] = [{
    active: true,
    icon: <StepNumber number={1}/>,
    show: true,
    title: 'INT'

},{
    active: false,
    icon: <StepNumber number={2}/>,
    show: true,
    title: 'Notificación'
},{
    active: false,
    icon: <StepNumber number={3}/>,
    show: true,
    title: 'Confirmación'
}];


export const NewAlertPage = () => {
  
  const contentStepRef = useRef<HTMLDivElement>(null);
  const [navSteps,setNavSteps] = useState(navStepsInit);
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(ActionStepReducer,getActionStepInitialState());
  const { create, loading: creating, error: createError } = useCreateNotification();
  
  useScrollToTopOnStep(state.step, {
       targetRef: contentStepRef,
       behavior: 'smooth',
       offset: 72, 
  });


  const onSubmit = async (data: INotificationFormValues) => {
         try {
                 
           if(false || state.step == eStep.SUCCESS) return;
  
           dispatch({
              type: 'SUCCESS',
              payload: ''
            });
  
             const newId = await create({
               buttonLink: '',
               buttonText: '',
               dateFrom: data.hasPublication ? data.dateFrom!.format('YYYY-MM-DD') : null,
               dateTO: data.hasExpired ? data.dateTo!.format('YYYY-MM-DD') : null,
               timeFrom: data.hasPublication ? data.timeFrom!.format('HH:mm:ss') : null,
               timeTO: data.hasExpired ? data.timeTo!.format('HH:mm:ss') : null,
               description: '',
               name: data.name,
               title: data.title,
               notificationTypeId: NOTIFICATION_ALERT.toString(),
               profiles: data.profiles.map(x => x.id),
               statusId: Number(data.state),
               image: null
             });
     
           Toast({
             message: 'Notificación creada correctamente',
             type: eToast.Success
           });
  
           navigate(NOTIFICATION.name);
  
         } catch(e) {
           Toast({
             message: 'Error al crear ls notificación',
             type: eToast.Error
           });
         }
       }
     
 const handleNext = async ()=>{
     
    switch(state.step){
        
        case eStep.STEP_ONE: {

          setNavSteps(navStepSelected(navSteps,state.step + 1));

          dispatch({
            type: 'STEP_TWO',
            payload: ''
          }); 

          break;
                    
        }
        case eStep.STEP_TWO: {

          setNavSteps(navStepSelected(navSteps,state.step + 1));

          dispatch({
            type: 'STEP_THREE',
            payload: ''
          }); 

          break;
                    
        }       
      }
   }
 

   const handleBack = ()=>{

    switch(state.step){
        
        case eStep.STEP_ONE: {

          navigate(NOTIFICATION.name)
          break;
                    
        }
        case eStep.STEP_TWO: {

          setNavSteps(navStepSelected(navSteps,state.step - 1));

          dispatch({
            type: 'STEP_ONE',
            payload: ''
          }); 

          break;
                    
        }
         case eStep.STEP_THREE: {

          setNavSteps(navStepSelected(navSteps,state.step - 1));

          dispatch({
            type: 'STEP_TWO',
            payload: ''
          }); 

          break;
                    
        }
      }
   }
  const form = useForm<INotificationFormValues>({
        defaultValues: {
          name: '',
          profiles: [],
          img: undefined,
          subtitle: '',
          state: STATE_NOTIFICATION_NEW.toString(),
          title: '',
          hasButton: true,
          hasPublication: false,
          hasExpired: false
        },
        mode: 'onChange',          
        reValidateMode: 'onChange' 
      });
  
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
