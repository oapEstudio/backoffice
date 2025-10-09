import { useEffect, useReducer, useRef, useState } from "react";
import { ActionStepReducer, eStep, getActionStepInitialState } from "../reducers/ActionStepReducer";
import { useCreateNotification } from "../../../hooks/useCreateNotification";
import { useScrollToTopOnStep } from "../../../../../utils/useScrollToTopOnStep";

import { useNavigate } from "react-router-dom";
import { NOTIFICATION_CAROUSEL, STATE_NOTIFICATION_CAROUSEL_NEW } from "../../../shared/constants/notifications";
import { eToast, Toast } from "../../../../../components/ui/toast/CustomToastService";
import { useForm } from "react-hook-form";
import type { StepType } from "../../../../../components/ui/step/step-navigation-backoffice";
import { StepNumber } from "../../../shared/components/step-number/StepNumber";
import type { Dayjs } from "dayjs";
import { NOTIFICATION } from "../../../../../router/routes";
import type { INotificationFormValues } from "../../../shared/interface/INotificationFormValues";
import { navStepSelected } from "../../../../../utils/navStepSelected";

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




export function useNewCarouselPage(){

  const contentStepRef = useRef<HTMLDivElement>(null);

   const [navSteps,setNavSteps] = useState(navStepsInit);

   const [state, dispatch] = useReducer(ActionStepReducer,getActionStepInitialState());
   const { create, loading: creating, error: createError } = useCreateNotification();
   const navigate = useNavigate();

   useScrollToTopOnStep(state.step, {
    targetRef: contentStepRef,
    behavior: 'smooth',
    offset: 72, 
  });

   const onSubmit = async (data: INotificationFormValues) => {
       try {
               
         if(creating || state.step == eStep.SUCCESS) return;

         dispatch({
            type: 'SUCCESS',
            payload: ''
          });

         const newId = await create({
          buttonLink: data.hasButton? data.buttonLink : '',
          buttonText: data.hasButton? data.buttonTitle: '',
          dateFrom: data.hasPublication? data.dateFrom!.format('YYYY-MM-DD') : null,
          dateTO: data.hasExpired? data.dateTo!.format('YYYY-MM-DD'): null,
          timeFrom: data.hasPublication? data.timeFrom!.format('HH:mm:ss'): null,
          timeTO: data.hasExpired? data.timeTo!.format('HH:mm:ss'): null,
          description: data.subtitle,
          name: data.name,
          title: data.title,
          image: data.img,
          notificationTypeId: NOTIFICATION_CAROUSEL.toString(),
          profiles: data.profiles.map(x=>x.id),
          statusId: Number(data.state),          
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
   
  
   const form = useForm<INotificationFormValues>({
      defaultValues: {
        name: '',
        profiles: [],
        img: undefined,
        subtitle: '',
        state: STATE_NOTIFICATION_CAROUSEL_NEW.toString(),
        title: '',
        hasButton: true,
        hasPublication: false,
        hasExpired: false
      },
      mode: 'onChange',          
      reValidateMode: 'onChange' 
    });

   
   useEffect(()=>{
      
       form
      .trigger(state.field as any);

   },[state]);

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

   return {
    contentStepRef,
    form,
    navSteps,
    state,
    handleBack,
    onSubmit,
    handleNext
   }
}