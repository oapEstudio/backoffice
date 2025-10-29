import React from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import type { IModalAddElementFormValues } from '../modal-add-element/ModalAddElement';
import Typography from '@mui/material/Typography';
import ImageDropzone from '../../../../../../components/ui/img-drop-zone/ImageDropZone';
import { eTypeElement } from '../element-dynamic-page/ElementDynamicPage';
import { MAX_LENGTH_INPUT } from '../../../../../shared/constants/default-input';
import { env } from '../../../../../../../infrastructure/config/env';
import CustomTextInput from '../../../../../../components/ui/inputs/text-input/text-input.component';


interface StepTwoDynamicPageProps{
    initialImageUrl?: string;
}
export const StepTwoDynamicPage: React.FC<StepTwoDynamicPageProps> = ({initialImageUrl}) => {

  const {
        control,
        formState: { errors },
        getValues
  } = useFormContext<IModalAddElementFormValues>();
    
  const formValue = getValues();

  return (
    formValue.type===eTypeElement.BACKGROUND_IMAGE?
      <>
          <Controller
            name="img"
            control={control}
            rules={{
              validate: (v) => (v !== undefined || !!initialImageUrl) || 'Debes asignar una imagen',
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <ImageDropzone
                  multiple={false}
                  initialPreviewUrl={initialImageUrl}
                  value={field.value ? [field.value] : []}
                  onFiles={(files) => field.onChange(files[0])}
                  helperText="JPG/PNG hasta 3MB"             
                />
                {error && (
                  <Typography color="error" variant="caption">
                    {error.message}
                  </Typography>
                )}
              </>
            )}
          />
      </> : formValue.type===eTypeElement.TITLE?
      <>
         <Controller
                name="label"
                control={control}
                rules={{ 
                  required: 'El titulo es obligatorio', 
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
                    label="Titulo"
                    type='text'
                    maxLength={MAX_LENGTH_INPUT}
                    error={!!errors.label}
                    helperText={errors.label?.message}
                  />
                )}
              />
      </> : <></>
  )
}
