import React, { useEffect, useReducer, useState } from 'react'
import CustomModal from '../../../../../../components/ui/modal/modal.component'
import StepperWrapperBackOfficeDefault from '../../../../../../components/ui/step/stepper-wrapper-backoffice-default';
import StepNavigationBackOffice, { type StepType } from '../../../../../../components/ui/step/step-navigation-backoffice';
import { SettingIcon } from '../../../../../../components/ui/icons';
import { CustomBox } from '../../../../../../components/ui/box/CustomBox';
import { ActionStepReducer, eStep, getActionStepInitialState } from '../../reducers/ActionStepReducer';
import CustomSelect from '../../../../../../components/ui/inputs/select/select.component';
import { FormProvider, useForm } from 'react-hook-form';
import type { eTypeElement } from '../element-dynamic-page/ElementDynamicPage';
import { StepOneDynamicPage } from '../step-one-dynamic-page/StepOneDynamicPage';
import { StepTwoDynamicPage } from '../step-two-dynamic-page/StepTwoDynamicPage';
import { navStepSelected } from '../../../../../../utils/navStepSelected';
import { eToast, Toast } from '../../../../../../components/ui/toast/CustomToastService';
import { AppIcon } from '../../../../../../components/ui/icons/index';

interface ModalAddElementProps{
    open: boolean;
    onClose: ()=>void;
    onCancel: ()=>void;
    onOk: (element: IModalAddElementFormValues)=>void;
}
const navStepsInit: StepType[] = [{
    active: true,
    icon: <AppIcon />,
    show: true,
    title: 'Componente'

},{
    active: false,
    icon: <SettingIcon />,
    show: true,
    title: 'Configuración'
}];



export interface IModalAddElementFormValues{
    type: eTypeElement;
    text: string;
    file: File;
    label: string;
    align: string;
    height: number;
    link: string;
    fontSize: string;
}
export const ModalAddElement: React.FC<ModalAddElementProps> = ({open, onClose, onCancel, onOk}) => {

  const [navSteps,setNavSteps] = useState(navStepsInit);
  const [state, dispatch] = useReducer(ActionStepReducer,getActionStepInitialState());
  const form = useForm<IModalAddElementFormValues>({
        defaultValues: {
          type: undefined
        },
        mode: 'onChange',          
        reValidateMode: 'onChange' 
  });
  

  useEffect(()=>{
        
         form
        .trigger(state.field as any);
  
  },[state]);

  useEffect(() => {
      if (open) {
 
        form.reset(
          { type: undefined, file: undefined as any, label: '', height: 0 },
          { keepDefaultValues: false, keepErrors: false, keepDirty: false, keepTouched: false }
        );
        form.clearErrors();


        dispatch({ type: 'RESET' });

        setNavSteps([...navStepsInit]);
      }
    }, [open, form]);

  const handleBack = ()=>{

     if (state.step === eStep.STEP_TWO) {
        setNavSteps(navStepSelected([...navSteps], eStep.STEP_ONE));
        dispatch({ type: 'STEP_ONE',payload:'' });
        return;
      }
      onCancel();
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
         
    }
 }
   const onSubmit = async (data: IModalAddElementFormValues) => {
         try {
                 
                      
         onOk(data);
           
  
         } catch(e) {          
           Toast({
             message: 'Error al agregar el elemento',
             type: eToast.Error
           });
         }
       }
     
  return <CustomModal 
                key={open ? "open-modal-add-element" : "closed-modal-add-element"}
                title='Agregar elemento'
                open={open} 
                onClose={onClose} 
                onOk={state.step == eStep.STEP_TWO? form.handleSubmit(onSubmit) : handleNext}
                onCancel={handleBack} 
                labelCancel={state.labelPrev}
                labelOk={state.labelNext}
                maxWidth={'md'} 
                disabled={!form.formState.isValid}>
                    
                <FormProvider {...form}>
                        <StepperWrapperBackOfficeDefault width='40%'>
                            <StepNavigationBackOffice steps={navSteps} />
                        </StepperWrapperBackOfficeDefault>

                        <CustomBox  sx={{ p: '0 4rem', minHeight: 100,paddingTop: '2rem' }}>
                             {state.step == 1 ? <StepOneDynamicPage /> :<></>}
                             {state.step == 2 ? <StepTwoDynamicPage /> :<></>}                        
                        </CustomBox>
                </FormProvider>
                
        </CustomModal>
}
