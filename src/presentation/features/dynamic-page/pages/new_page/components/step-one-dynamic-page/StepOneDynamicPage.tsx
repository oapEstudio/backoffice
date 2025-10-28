import React from 'react'
import CustomSelect from '../../../../../../components/ui/inputs/select/select.component'
import { Controller, useFormContext } from 'react-hook-form';
import type { IModalAddElementFormValues } from '../modal-add-element/ModalAddElement';

export const StepOneDynamicPage = () => {
 
  const {
    control,
    formState: { errors },
  } = useFormContext<IModalAddElementFormValues>();

  return (
     <Controller
        name="type"
        control={control}
         rules={{ required: 'El componente es obligatorio',min: 1 }}
        render={({ field }) => (
          <CustomSelect
            {...field}
            label={'Componente'} 
            options={[{label: 'BackgroundImage', value: 1}]}            
         />
        )}
      />   
  )
}
