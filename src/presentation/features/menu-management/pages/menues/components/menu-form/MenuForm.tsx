import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { CustomStack } from '../../../../../../components/ui/stack/Stack'
import CustomTextInput from '../../../../../../components/ui/inputs/text-input/text-input.component'
import CustomRadioButton from '../../../../../../components/ui/inputs/radio-button/radio-button.component'
import Typography from '@mui/material/Typography'
import { LinksIcon } from '../../../../../../components/ui/icons'
import { env } from '../../../../../../../infrastructure/config/env'
import { MAX_LENGTH_INPUT } from '../../../../../shared/constants/default-input'
import { minTrimmed } from '../../../../../../utils/minTrimmed'

export interface IMenuFormValues {
  name: string
  hasLink: boolean
  link: string
  index: number
}

export interface MenuFormHandle {
  submit: () => void
  reset: () => void
  isValid: () => boolean
  getValues: () => IMenuFormValues
}

interface MenuFormProps {
  initialValues?: Partial<IMenuFormValues>
  parentId?: string
  parentLabel?: string
  submitting?: boolean
  serverError?: string | null
  onSubmit: (data: IMenuFormValues) => Promise<void> | void
  onValidityChange?: (valid: boolean) => void
  open?: boolean
}

const defaults: IMenuFormValues = {
  name: '',
  hasLink: false,
  link: '',
  index: 1,
}

export const MenuForm = forwardRef<MenuFormHandle, MenuFormProps>((props, ref) => {
  const {
    initialValues,
    parentId,
    submitting,
    serverError,
    onSubmit,
    onValidityChange,
    open,
  } = props

  const form = useForm<IMenuFormValues>({
    defaultValues: { ...defaults, ...initialValues },
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  const {
    control,
    formState: { errors, isValid },
    reset,
    handleSubmit,
    watch,
    getValues,
  } = form

  const hasLink = watch('hasLink')
  const isChild = Boolean(parentId)


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
          name: data.name.trim(),
          link: data.hasLink ? data.link.trim() : '',
          index: Number(data.index),
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
          name="name"
          control={control}
          rules={{ 
              required: 'El nombre es obligatorio', 
               validate: {
                            minTrimmed: minTrimmed(3),
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
              type='text'
              label="Nombre"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />

        <span>¿Este ítem incluirá otros ítems?</span>
        <Controller
          name="hasLink"
          control={control}
          render={({ field }) => (
            <CustomRadioButton
              {...field}
              direction="row"
              options={[
                { label: 'Sí', value: false },
                { label: 'No', value: true },
              ]}
            />
          )}
        />

        <Controller
          name="link"
          control={control}
          rules={{
            required: hasLink ? 'Debe ingresar un link' : false,
            minLength: hasLink ? { value: 3, message: 'Mínimo 3 caracteres' } : undefined,
            pattern: hasLink? {
                              value: /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/,
                              message: "Ingrese una URL válida (ej: https://example.com)"
                            }
                          : undefined,
          }}
          render={({ field }) => (
            <CustomTextInput
              {...field}
              icon= {<LinksIcon />}
              label="Enlace de redireccionamiento del ítem"
              type="url"            
              error={!!errors.link}
              helperText={errors.link?.message}
              disabled={!hasLink}
            />
          )}
        />

        <Controller
          name="index"
          control={control}
          rules={{
            required: 'Índice de jerarquía',
            min: { value: 0, message: 'El índice no puede ser negativo' },
          }}
          render={({ field }) => (
            <CustomTextInput
              {...field}
              type="number"
              label="Establezca el índice de jerarquía"
              error={!!errors.index}
              helperText={errors.index?.message}
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

MenuForm.displayName = 'MenuForm'
