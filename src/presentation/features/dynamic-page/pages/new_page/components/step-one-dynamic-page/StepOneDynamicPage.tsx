import React, { useMemo } from 'react'
import CustomSelect from '../../../../../../components/ui/inputs/select/select.component'
import { Controller, useFormContext } from 'react-hook-form';
import type { IModalAddElementFormValues } from '../modal-add-element/ModalAddElement';
import { useElementTypeDynamicPage } from '../../../../hooks/useElementTypeDynamicPage';
import type { SelectOption } from '../../../../../../components/ui/inputs/select/select.interface';
import { toSelectOption } from '../../../../mappers/createDynamicPageMapper';

export const StepOneDynamicPage = () => {
 
   const { resultTypes, loading: loadingElementTypes } = useElementTypeDynamicPage({
       elementTypeFilters:{ forCreate: true } 
    });
  
    const selectItemsElementTypes: SelectOption[] = useMemo(
        () => resultTypes.map(toSelectOption),
        [resultTypes]
    )
  const {
    control,
    formState: { errors },
  } = useFormContext<IModalAddElementFormValues>();

  return (
     <Controller
        name="type"
        control={control}
         rules={{ required: 'El componente es obligatorio',minLength: 1 }}
        render={({ field }) => (
          <CustomSelect
            {...field}
            label={'Componente'} 
            options={selectItemsElementTypes}            
         />
        )}
      />   
  )
}
