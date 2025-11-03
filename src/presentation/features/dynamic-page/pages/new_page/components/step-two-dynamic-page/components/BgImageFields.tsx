
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import type { IModalAddElementFormValues } from '../../modal-add-element/ModalAddElement';
import ImageDropzone from '../../../../../../../components/ui/img-drop-zone/ImageDropZone';
import CustomTextInput from '../../../../../../../components/ui/inputs/text-input/text-input.component';

export const BgImageFields: React.FC<{ initialImageUrl?: string }> = ({ initialImageUrl }) => {
  const { control, formState: { errors } } = useFormContext<IModalAddElementFormValues>();
  return  <>
    <Controller
      name="file"
      control={control}
      rules={{
        validate: v => (v !== undefined || !!initialImageUrl) || 'Debes asignar una imagen',
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
          {error && <Typography color="error" variant="caption">{error.message}</Typography>}
        </>
      )}
    />
     <Controller
            name="height"
            control={control}
            rules={{ required: 'El height es obligatorio' }}
            render={({ field }) => (
              <CustomTextInput
                {...field}
                label="HEIGHT"
                type="number"
                error={!!errors.height}
                helperText={errors.height?.message}
              />
            )}
          />
  </>;
};
