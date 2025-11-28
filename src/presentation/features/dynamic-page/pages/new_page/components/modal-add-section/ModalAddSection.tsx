import React, { useEffect } from 'react'
import CustomModal from '../../../../../../components/ui/modal/modal.component'
import { CustomBox } from '../../../../../../components/ui/box/CustomBox';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { eToast, Toast } from '../../../../../../components/ui/toast/CustomToastService';
import { CustomColorPicker } from '../../../../../../components/ui/color-picker/CustomColorPicker';
import { MAX_SIZE_IMAGE } from '../../../../shared/constants/constants';
import ImageDropzone from '../../../../../../components/ui/img-drop-zone/ImageDropZone';
import Typography from '@mui/material/Typography';
import { CustomStack } from '../../../../../../components/ui/stack/Stack';


interface IModalAddSectionFormValues{
  backgroundColor: string;
  backgroundImage: File;
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
          backgroundColor: '',
          backgroundImage: undefined
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
                      
                        <CustomStack direction={'row'} spacing={3} sx={{  display: 'flex', justifyContent: 'center', TextAlign: 'center', p: '0 4rem', minHeight: 100,paddingTop: '2rem' }}>

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
                                <Controller
                                        name="backgroundImage"
                                        control={control}
                                        rules={{
                                          validate: (v) => {
                                           
                                            if (v === undefined) {
                                              return true;
                                            }
                                
                                            const file = Array.isArray(v) ? v[0] : v;
                                
                                            if (file.size > MAX_SIZE_IMAGE) {
                                              return 'La imagen no puede superar los 3MB';
                                            }
                                
                                            return true;
                                          }
                                        }}
                                        render={({ field, fieldState: { error } }) => (
                                          <>
                                            <ImageDropzone
                                              multiple={false}                                              
                                              value={field.value ? [field.value] : []}
                                              onFiles={(files) => field.onChange(files[0])}
                                              helperText="JPG/PNG hasta 3MB"
                                            />
                                            {error && <Typography color="error.main" variant="caption">{error.message}</Typography>}
                                          </>
                                        )}
                                      />                                           
                        </CustomStack>
                </FormProvider>
                
        </CustomModal>
}
