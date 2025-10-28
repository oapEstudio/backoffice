import React from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import type { IModalAddElementFormValues } from '../modal-add-element/ModalAddElement';
import Typography from '@mui/material/Typography';
import ImageDropzone from '../../../../../../components/ui/img-drop-zone/ImageDropZone';


interface StepTwoDynamicPageProps{
    initialImageUrl?: string;
}
export const StepTwoDynamicPage: React.FC<StepTwoDynamicPageProps> = ({initialImageUrl}) => {

  const {
        control,
        formState: { errors },
  } = useFormContext<IModalAddElementFormValues>();
    
  return (
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
  )
}
