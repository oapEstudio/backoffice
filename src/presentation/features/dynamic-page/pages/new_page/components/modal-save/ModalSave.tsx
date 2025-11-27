import React, { useEffect, useMemo} from 'react'
import CustomModal from '../../../../../../components/ui/modal/modal.component'
import { CustomBox } from '../../../../../../components/ui/box/CustomBox';

import { Controller, FormProvider, useForm } from 'react-hook-form';

import { eToast, Toast } from '../../../../../../components/ui/toast/CustomToastService';
import CustomTextInput from '../../../../../../components/ui/inputs/text-input/text-input.component';
import { minTrimmed } from '../../../../../../utils/minTrimmed';
import { CustomStack } from '../../../../../../components/ui/stack/Stack';
import { MAX_LENGTH_INPUT } from '../../../../../shared/constants/default-input';
import { env } from '../../../../../../../infrastructure/config/env';
import CustomSelect from '../../../../../../components/ui/inputs/select/select.component';
import InputLabel from '@mui/material/InputLabel';
import { styles } from '../../../../../../components/ui/inputs/styles';
import Required from '../../../../../../components/ui/required/required.component';
import DualProfileFetch from '../../../../../../components/widgets/dual-profile-add-fetch/DualProfileAddFetch';
import Typography from '@mui/material/Typography';
import { useDynamicPageFilterOptions } from '../../../../hooks/useDynamicPageFilterOptions';

import type { SelectOption } from '../../../../../../components/ui/inputs/select/select.interface';
import { toSelectOption } from '../../../../mappers/createDynamicPageMapper';

interface IModalSaveProps{
    open: boolean;
    onClose: ()=>void;
    onCancel: ()=>void;
    onOk: (element: IModalSaveFormValues)=>void;
    init?: IModalSaveFormValues;
    isEdit?: boolean,
    saving?: boolean
}

export interface IModalSaveFormValues{
  name: string;
  profiles: {id: string,name: string}[],
  state: string;
}

export const ModalSave: React.FC<IModalSaveProps> = ({open, onClose, onCancel, onOk, init, isEdit = false, saving = false}) => {

  const stateFilters = useMemo(
    () => (isEdit ? { forUpdate: true } : { forCreate: true }),
    [isEdit]
  );

  const { resultState, loading } = useDynamicPageFilterOptions({
     stateFilters: stateFilters
  });

 
  const selectItemsStatuses: SelectOption[] = useMemo(
      () => resultState.map(toSelectOption),
      [resultState]
    )
    


    
  const form = useForm<IModalSaveFormValues>({
        defaultValues: {
          name: init?.name,
          profiles: init?.profiles,
          state: init?.state
        },
        mode: 'onChange',          
        reValidateMode: 'onChange' 
  });
 
  const { control, formState: { errors, isValid } } = form;


  useEffect(() => {
      if (open) {
 
        form.reset(
          { name: init?.name,profiles: init?.profiles, state: init?.state },
          { keepDefaultValues: false, keepErrors: false, keepDirty: false, keepTouched: false }
        );
        form.clearErrors();
      }
    }, [open, form]);

  const handleBack = ()=>{

      onCancel();
  }

 
   const onSubmit = async (data: IModalSaveFormValues) => {
         try {
                        
         onOk(data);
           
  
         } catch(e) {          
           Toast({
             message: 'Error al guardar',
             type: eToast.Error
           });
         }
       }
     
  return <CustomModal 
                key={`modal-save-${isEdit ? 'edit' : 'create'}`}
                open={open} 
                onClose={onClose} 
                title={isEdit?'Actualizar página': 'Guardar página'}
                onOk={form.handleSubmit(onSubmit)}
                onCancel={handleBack} 
                labelCancel={'Cancelar'}
                labelOk={saving? 'Guardando...' : 'Aceptar'}
                maxWidth={'md'} 
                disabled={!form.formState.isValid}>
                    
                <FormProvider {...form}>
                      
                        <CustomBox  sx={{ p: '0 4rem', minHeight: 100,paddingTop: '2rem' }}>
                               <CustomStack spacing={5} direction="column">

                                    <Controller
                                      name="name"
                                      control={control}
                                      rules={{
                                        required: 'El nombre es obligatorio',
                                        minLength: { value: 5, message: 'Mínimo 5 caracteres' },
                                        maxLength: MAX_LENGTH_INPUT,
                                        validate: { minTrimmed: minTrimmed(5) },
                                        pattern: {
                                          value: env.patternInputText,
                                          message:
                                            'No se permiten caracteres especiales como + * ? [ ] ^ $ ( ) { } | \\ ! " # % & / = \' ¡',
                                        },
                                      }}
                                      render={({ field }) => (
                                        <CustomTextInput
                                          {...field}
                                          label={'Nombre'}
                                          type="text"
                                          maxLength={MAX_LENGTH_INPUT}
                                          error={!!errors.name}
                                          helperText={errors.name?.message}  
                                          disabled={isEdit}                                       
                                        />
                                      )}
                                    /> 
                                     <Controller
                                      name="state"
                                      control={control}
                                      rules={{ required: 'El estado es obligatorio',min: 1 }}
                                      render={({ field }) => (
                                        <CustomSelect
                                          {...field}
                                          label="Estado"      
                                          options={selectItemsStatuses}
                                          error={!!errors.state}           
                                        />
                                      )}
                                    />
                                      <Controller
                                            name="profiles"
                                            control={control}
                                            rules={{
                                              validate: (v) =>
                                                 (Array.isArray(v) && v.length > 0) || 'Debes asignar al menos un perfil',
                                            }}
                                            render={({ field, fieldState: { error } }) => (
                                              <>
                                                <InputLabel sx={styles.label}>
                                                  Seleccione al menos un perfil
                                                  <Required value="*" />
                                                </InputLabel>
                                    
                                                <DualProfileFetch
                                                  selectedProfiles={field.value ?? []}
                                                  selectedFilters={(field.value ?? []).map((p: any) => p.id)}
                                                  remountKey={open ? "open-modal-save" : "closed-modal-save"}
                                                  onChange={() => {}}
                                                  onChangeProfiles={(profiles) => field.onChange(profiles)}
                                                />
                                    
                                                {error && (
                                                  <Typography color="error" variant="caption">
                                                    {error.message}
                                                  </Typography>
                                                )}
                                              </>
                                            )}
                                          />
                                </CustomStack>            
                        </CustomBox>
                </FormProvider>
                
        </CustomModal>
}
