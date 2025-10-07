
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { CustomStack } from '../../../../../../components/ui/stack/Stack'
import CustomTextInput from '../../../../../../components/ui/inputs/text-input/text-input.component'
import Typography from '@mui/material/Typography'
import { env } from '../../../../../../../infrastructure/config/env'
import type { IHighlightMenuDto } from '../../../../../../../application/dtos/IHighlightMenuDto'
import CustomTextAreaInput from '../../../../../../components/ui/inputs/text-area-input/text-area-input.component'
import { MAX_LENGTH_INPUT } from '../../../../../shared/constants/default-input'
import { minTrimmed } from '../../../../../../utils/minTrimmed'



export interface HighlightFormHandle {
  submit: () => void
  reset: () => void
  isValid: () => boolean
  getValues: () => IHighlightMenuDto
}

interface HighlightFormProps {
  initialValues?: Partial<IHighlightMenuDto>
  serverError?: string | null
  onSubmit: (data: IHighlightMenuDto) => Promise<void> | void
  onValidityChange?: (valid: boolean) => void
  open?: boolean
}

const defaults: IHighlightMenuDto = {
  title: '',
  description: '',
  isHighlighted: true,
  profilesIds: []
}

export const HighlightForm = forwardRef<HighlightFormHandle, HighlightFormProps>((props, ref) => {
  const {
    initialValues,
    serverError,
    onSubmit,
    onValidityChange,
    open,
  } = props

  const form = useForm<IHighlightMenuDto>({
    defaultValues: { ...defaults, ...initialValues },
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  const {
    control,
    formState: { errors, isValid },
    reset,
    handleSubmit,
    getValues,
  } = form



  useEffect(() => {
    onValidityChange?.(isValid)
  }, [isValid, onValidityChange])


  const initialRef = useRef(initialValues);

  useEffect(() => {
    if (open !== undefined) {
      reset({ ...defaults, ...initialValues })
      initialRef.current = initialValues
    }
  }, [open, initialValues, reset])

  useImperativeHandle(ref, () => ({
    submit: () => {
      void handleSubmit(async (data) => {      
        await onSubmit({
          ...data,
          title: data.title.trim(),
          description: data.description
        })
      })()
    },
    reset: () => reset({ ...defaults, ...initialValues }),
    isValid: () => isValid,
    getValues: () => getValues(),
  }))

  return (
    <FormProvider {...form}>
      <CustomStack spacing={2}>

        <Controller
            name="title"
            control={control}
            rules={{ 
            required: 'El título es obligatorio', 
            validate: {
              minTrimmed: minTrimmed(),
            }, 
            maxLength: MAX_LENGTH_INPUT,
            pattern: {
                    value: env.patternInputText,
                    message: "No se permiten caracteres especiales como + * ? [ ] ^ $ ( ) { } | \\ ! \" # % & / = ' ¡"
                    }  
            }}
            render={({ field }) => (
            <CustomTextInput
                {...field}
                label="Título"
                type='text'
                maxLength={MAX_LENGTH_INPUT}
                error={!!errors.title}
                helperText={errors.title?.message}
            />
            )}
        />

        <Controller
            name="description"
            control={control}
            rules={{ 
                required: 'La descripcion es obligatoria', 
                validate: {
                  minTrimmed: minTrimmed(),
                },  
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

       <>
        {serverError && (
          <Typography color="error" variant="caption">
            {serverError}
          </Typography>
        )}
       </>
      </CustomStack>
    </FormProvider>
  )
})

HighlightForm.displayName = 'MenuForm'

