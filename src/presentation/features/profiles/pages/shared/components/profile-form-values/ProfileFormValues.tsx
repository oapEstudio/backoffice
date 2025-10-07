import React, { useContext, useEffect, useState } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import type { SelectOption } from '../../../../../../components/ui/inputs/select/select.interface'
import { CustomStack } from '../../../../../../components/ui/stack/Stack';
import CustomTextInput from '../../../../../../components/ui/inputs/text-input/text-input.component';
import CustomTextAreaInput from '../../../../../../components/ui/inputs/text-area-input/text-area-input.component';
import CustomSelect from '../../../../../../components/ui/inputs/select/select.component';
import type { IProfileFormValues } from './IProfileFormValues';
import { DependencyContext } from '../../../../../../contexts/DependencyContext';
import Loading from '../../../../../../components/ui/loading';
import { env } from '../../../../../../../infrastructure/config/env';
import { MAX_LENGTH_INPUT } from '../../../../../shared/constants/default-input';


interface IProfileFormProps{
  isCreate: boolean;
}
export const ProfileForm: React.FC<IProfileFormProps> = ({isCreate}) => {
  const { control, formState: { errors } } = useFormContext<IProfileFormValues>();
  const { getProfileStatuses } = useContext(DependencyContext)
  const [allStatuses, setAllStatuses] = useState<SelectOption[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getProfileStatuses
      .execute({filters: isCreate? { ForCreate: true} : {ForUpdate: true} })
      .then((res) => setAllStatuses(res.map((x) =>({label: x.description,value: x.id}))))
      .finally(() => setLoading(false))
  }, [getProfileStatuses])

  if (loading) return <center><Loading /></center>

  return (
    <CustomStack spacing={2}>
      <Controller
        name="name"
        control={control}
        rules={{ 
          required: 'El nombre es obligatorio', 
          minLength: 10, 
          maxLength: MAX_LENGTH_INPUT,
          pattern: {
                   value: env.patternInputText,
                   message: "No se permiten caracteres especiales como + * ? [ ] ^ $ ( ) { } | \\ ! \" # % & / = ' ¡"
                 }  
        }}
        render={({ field }) => (
          <CustomTextInput
            {...field}
            label="Nombre"
            type='text'
            maxLength={MAX_LENGTH_INPUT}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        rules={{ 
            required: 'La descripcion es obligatoria', 
            minLength: 10, 
            maxLength: MAX_LENGTH_INPUT,          
            pattern: {
                      value: env.patternInputText,
                      message: "No se permiten caracteres especiales como + * ? [ ] ^ $ ( ) { } | \\ ! \" # % & / = ' ¡"
                     } 
        }}
        render={({ field }) => (
          <CustomTextAreaInput
            {...field}
            label="Descripción"
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        )}
      />

      <Controller
        name="statusId"
        control={control}
         rules={{ required: 'El estado es obligatorio',min: 1 }}
        render={({ field }) => (
          <CustomSelect
            {...field}
            label="Estado"      
            options={allStatuses}
            error={!!errors.statusId}           
          />
        )}
      />
    </CustomStack>
  )
}
