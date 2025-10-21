import { useRef, useState, useReducer } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { NOTIFICATION } from "../../../../router/routes";
import { navStepSelected } from "../../../../utils/navStepSelected";
import { useScrollToTopOnStep } from "../../../../utils/useScrollToTopOnStep";
import { useCreateNotification } from "../../hooks/useCreateNotification";
import type { INotificationFormValues } from "../interface/INotificationFormValues";
import { ActionStepReducer, getActionStepInitialState, eStep } from "../reducers/ActionStepReducer";
import { StepNumber } from "../components/step-number/StepNumber";
import type { StepType } from "../../../../components/ui/step/step-navigation-backoffice";
import {STATE_NOTIFICATION_CAROUSEL_NEW as STATE_NOTIFICATION_NEW } from '../constants/notifications';

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

export function usePageActionsStep(){
  
  
  
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
  
      return {
        handleBack,
        handleNext,
        form,
        state,
        dispatch,
        create,
        navigate,
        contentStepRef,
        navSteps
      }
}