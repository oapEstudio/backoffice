import React, { useEffect } from 'react'
import CustomModal from '../../../../../../components/ui/modal/modal.component'
import { CustomBox } from '../../../../../../components/ui/box/CustomBox';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { eToast, Toast } from '../../../../../../components/ui/toast/CustomToastService';
import { CustomColorPicker } from '../../../../../../components/ui/color-picker/CustomColorPicker';


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
                                        allowCustom={true} 
                                      />
                                    )}
                                />                                            
                        </CustomBox>
                </FormProvider>
                
        </CustomModal>
}
