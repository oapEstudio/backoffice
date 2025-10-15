import { useRef, useState } from "react";
import type { StepType } from "../../../../components/ui/step/step-navigation-backoffice";
import { useScrollToTopOnStep } from "../../../../utils/useScrollToTopOnStep";
import { StepNumber } from "../../../notifications/shared/components/step-number/StepNumber";
import { useNavigate } from "react-router-dom";
import { ContainerPage } from "../../../../components/containers/container-page/ContainerPage";
import { HELPDESK_PAGE, NEW_SECTION } from "../../../../router/routes";
import { FormProvider, useForm } from "react-hook-form";
import StepperWrapperBackOfficeDefault from "../../../../components/ui/step/stepper-wrapper-backoffice-default";
import StepNavigationBackOffice from "../../../../components/ui/step/step-navigation-backoffice";
import { CustomBox } from "../../../../components/ui/box/CustomBox";
import Button from "../../../../components/ui/button/button.component";

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


export const NewSectionPage = () => {
  
  const contentStepRef = useRef<HTMLDivElement>(null);
  const [navSteps,setNavSteps] = useState(navStepsInit);
  const navigate = useNavigate();
  //const [state, dispatch] = useReducer(ActionStepReducer,getActionStepInitialState());

  /*
  useScrollToTopOnStep(state.step, {
       targetRef: contentStepRef,
       behavior: 'smooth',
       offset: 72, 
  });

  */
  /*
  const onSubmit = async (data: INotificationFormValues) => {
         try {
                 
           if(false || state.step == eStep.SUCCESS) return;
  
           dispatch({
              type: 'SUCCESS',
              payload: ''
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
   */ 
  const form = useForm<any>({
        defaultValues: {
          name: '',
          profiles: [],
          img: undefined,
          subtitle: '',
          //state: STATE_NOTIFICATION_NEW.toString(),
          title: '',
          hasButton: true,
          hasPublication: false,
          hasExpired: false
        },
        mode: 'onChange',          
        reValidateMode: 'onChange' 
      });
    

  return (
     <ContainerPage description="NewAlertPage" title={`${HELPDESK_PAGE.title} - ${NEW_SECTION.title}`} titleSEO='Gestión de ayuda - Alta sección'>
          <div  ref={contentStepRef}/>
          <FormProvider {...form}>
             <StepperWrapperBackOfficeDefault width='40%'>
                 <StepNavigationBackOffice steps={navSteps} />
            </StepperWrapperBackOfficeDefault>
             <CustomBox  sx={{ p: '0 4rem', minHeight: 300,paddingTop: '2rem' }}>
  
             
             </CustomBox>
          </FormProvider>
        </ContainerPage>
  )
}
