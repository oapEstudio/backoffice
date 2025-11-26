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

interface ModalAddElementProps{
    open: boolean;
    onClose: ()=>void;
    onCancel: ()=>void;
    onOk: (element: IModalAddElementFormValues)=>void;
}



export const ModalAddMenu: React.FC<ModalAddElementProps> = ({open, onClose, onCancel, onOk}) => {

 
  const form = useForm<IModalAddElementFormValues>({
        defaultValues: {
          type: undefined
        },
        mode: 'onChange',          
        reValidateMode: 'onChange' 
  });
 
  const { control, formState: { errors, isValid } } = form;


  useEffect(() => {
      if (open) {
 
        form.reset(
          { type: undefined, file: undefined as any, label: '', height: 0 },
          { keepDefaultValues: false, keepErrors: false, keepDirty: false, keepTouched: false }
        );
        form.clearErrors();
      }
    }, [open, form]);

  const handleBack = ()=>{

      onCancel();
  }

 
   const onSubmit = async (data: IModalAddElementFormValues) => {
         try {
                 
         data.type = eTypeElement.ITEM_MENU;
         onOk(data);
           
  
         } catch(e) {          
           Toast({
             message: 'Error al agregar el elemento',
             type: eToast.Error
           });
         }
       }
     
  return <CustomModal 
                key={open ? "open-modal-add-menu" : "closed-modal-add-menu"}
                open={open} 
                onClose={onClose} 
                title='Nuevo ítem de menú'
                onOk={form.handleSubmit(onSubmit)}
                onCancel={handleBack} 
                labelCancel={'Cancelar'}
                labelOk={'Aceptar'}
                maxWidth={'md'} 
                disabled={!form.formState.isValid}>
                    
                <FormProvider {...form}>
                      
                        <CustomBox  sx={{ p: '0 4rem', minHeight: 100,paddingTop: '2rem' }}>
                                 <Controller
                                    name="label"
                                    control={control}
                                    rules={{
                                    required: 'El título es obligatorio',
                                    minLength: { value: 3, message: 'Mínimo 3 caracteres' },         
                                    validate: { minTrimmed: minTrimmed(3) },
                                    }}
                                    render={({ field }) => (
                                    <CustomTextInput
                                        {...field}
                                        label="Título"
                                        type="text"           
                                        error={!!errors.label}
                                        helperText={errors.label?.message}
                                    />
                                    )}
                                />
                                 <Controller
                                    name="link"
                                    control={control}
                                    rules={{
                                        required: 'Debe ingresar un link',
                                        minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                                        pattern: {
                                                        value: /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/,
                                                        message: "Ingrese una URL válida (ej: https://example.com)"
                                                }                                            
                                    }}
                                    render={({ field }) => (
                                        <CustomTextInput
                                        {...field}
                                        icon= {<LinksIcon />}
                                        label="Enlace de redireccionamiento del ítem"
                                        type="url"            
                                        error={!!errors.link}
                                        helperText={errors.link?.message}                                        
                                        />
                                    )}
                                />                 
                        </CustomBox>
                </FormProvider>
                
        </CustomModal>
}
