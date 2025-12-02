
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import type { IModalAddElementFormValues } from '../../modal-add-element/ModalAddElement';
import ImageDropzone from '../../../../../../../components/ui/img-drop-zone/ImageDropZone';
import CustomTextInput from '../../../../../../../components/ui/inputs/text-input/text-input.component';
import { CustomStack } from '../../../../../../../components/ui/stack/Stack';
import { ALLOW_IMAGES, MAX_SIZE_IMAGE } from '../../../../../shared/constants/constants';

export const BgImageFields: React.FC<{ initialImageUrl?: string }> = ({ initialImageUrl }) => {
  const { control, formState: { errors } } = useFormContext<IModalAddElementFormValues>();
  return <>
    <CustomStack direction='column' spacing={5}>
      <Controller
        name="file"
        control={control}
        rules={{
          validate: (v) => {
            if (v === undefined && !initialImageUrl) {
              return 'Debes asignar una imagen';
            }

            if (v === undefined) {
              return true;
            }

            const file = Array.isArray(v) ? v[0] : v;

            if (file.size > MAX_SIZE_IMAGE) {
              return 'La imagen no puede superar los 3MB';
            }

            const allowed = ALLOW_IMAGES;
            const extension = '.' + file.name.split('.').pop().toLowerCase();

            if (!allowed.includes(extension)) {
              return `Tipo de archivo no permitido. Tipos válidos: ${allowed.join(', ')}`;
            }

            return true;
          }
        }}
        render={({ field, fieldState: { error } }) => (
          <>
            <ImageDropzone

              multiple={false}
              initialPreviewUrl={initialImageUrl}
              value={field.value ? [field.value] : []}
              onFiles={(files) => field.onChange(files[0])}
              helperText="JPG/PNG/GIF hasta 3MB"
            />
            {error && <Typography color="error.main" variant="caption">{error.message}</Typography>}
          </>
        )}
      />
      <Controller
        name="height"
        control={control}
        rules={{ required: 'El height es obligatorio', min: 1 }}
        render={({ field }) => (
          <CustomTextInput
            {...field}
            label="Alto en pixeles (HEIGHT)"
            type="number"
            error={!!errors.height}
            helperText={errors.height?.message}
          />
        )}
      />
    </CustomStack>
  </>;
};
