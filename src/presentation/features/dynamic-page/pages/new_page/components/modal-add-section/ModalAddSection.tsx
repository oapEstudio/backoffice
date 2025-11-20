import React, { useEffect, useReducer, useState } from 'react'
import CustomModal from '../../../../../../components/ui/modal/modal.component'
import StepperWrapperBackOfficeDefault from '../../../../../../components/ui/step/stepper-wrapper-backoffice-default';
import StepNavigationBackOffice, { type StepType } from '../../../../../../components/ui/step/step-navigation-backoffice';
import { InfoIcon, LinksIcon } from '../../../../../../components/ui/icons';
import { CustomBox } from '../../../../../../components/ui/box/CustomBox';
import { ActionStepReducer, eStep, getActionStepInitialState } from '../../reducers/ActionStepReducer';
import CustomSelect from '../../../../../../components/ui/inputs/select/select.component';
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form';
import { eTypeElement } from '../element-dynamic-page/ElementDynamicPage';
import { StepOneDynamicPage } from '../step-one-dynamic-page/StepOneDynamicPage';
import { StepTwoDynamicPage } from '../step-two-dynamic-page/StepTwoDynamicPage';
import { navStepSelected } from '../../../../../../utils/navStepSelected';
import { eToast, Toast } from '../../../../../../components/ui/toast/CustomToastService';
import type { IModalAddElementFormValues } from '../modal-add-element/ModalAddElement';
import CustomTextInput from '../../../../../../components/ui/inputs/text-input/text-input.component';
import { minTrimmed } from '../../../../../../utils/minTrimmed';
import { colors } from '../../../../../../common/colors';
import { CustomColorPicker } from '../../../../../../components/ui/color-picker/CustomColorPicker';
import TextAlign from '@tiptap/extension-text-align';


interface IModalAddSectionFormValues{
  backgroundColor: string;
}
interface ModalAddSectionProps{
    open: boolean;
    onClose: ()=>void;
    onCancel: ()=>void;
    onOk: (element: IModalAddSectionFormValues)=>void;
}



export const ModalAddSection: React.FC<ModalAddSectionProps> = ({open, onClose, onCancel, onOk}) => {

 
  const form = useForm<IModalAddSectionFormValues>({
        defaultValues: {
          backgroundColor: ''
        },
        mode: 'onChange',          
        reValidateMode: 'onChange' 
  });
 
  const { control, formState: { errors, isValid } } = form;


  useEffect(() => {
      if (open) {
 
        form.reset(
          { backgroundColor: '' },
          { keepDefaultValues: false, keepErrors: false, keepDirty: false, keepTouched: false }
        );
        form.clearErrors();
      }
    }, [open, form]);

  const handleBack = ()=>{

      onCancel();
  }

 
   const onSubmit = async (data: IModalAddSectionFormValues) => {
         try {
                 
        
         onOk(data);
           
  
         } catch(e) {          
           Toast({
             message: 'Error al agregar una sección',
             type: eToast.Error
           });
         }
       }
     
  return <CustomModal 
                key={open ? "open-modal-add-section" : "closed-modal-add-section"}
                open={open} 
                onClose={onClose} 
                title='Nueva sección'
                onOk={form.handleSubmit(onSubmit)}
                onCancel={handleBack} 
                labelCancel={'Cancelar'}
                labelOk={'Aceptar'}
                maxWidth={'md'} 
                disabled={!form.formState.isValid}>
                    
                <FormProvider {...form}>
                      
                        <CustomBox  sx={{ display: 'flex', justifyContent: 'center', TextAlign: 'center', p: '0 4rem', minHeight: 100,paddingTop: '2rem' }}>

                                 <Controller
                                    name="backgroundColor"
                                    control={control}                                   
                                    render={({ field }) => (
                                     <CustomColorPicker
                                        label="Seleccione color predefinido"
                                        value={field.value}
                                        onChange={(v) => { field.onChange(v)}} 
                                        palette={[ 
                                          colors.white, 
                                          colors.grey200,
                                          colors.palette.primary.disabled,
                                          colors.palette.primary.main, 
                                          colors.palette.primary.dark, 
                                          colors.palette.secondary.main, 
                                          colors.darkBlue,
                                          colors.green200,
                                          colors.yellow100,
                                          colors.alert.error,
                                        ]} 
                                        allowCustom={true} 
                                      />
                                    )}
                                />                                            
                        </CustomBox>
                </FormProvider>
                
        </CustomModal>
}
