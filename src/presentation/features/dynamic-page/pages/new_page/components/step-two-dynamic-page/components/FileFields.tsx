import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import type { IModalAddElementFormValues } from '../../modal-add-element/ModalAddElement';
import FileDropzone from '../../../../../../../components/ui/file-drop-zone/FileDropzone';

export const FileFields: React.FC = () => {
  const { control } = useFormContext<IModalAddElementFormValues>();
  return (
    <Controller
      name="file"
      control={control}
      rules={{ validate: v => (v !== undefined) || 'Debes adjuntar un archivo' }}
      render={({ field, fieldState: { error } }) => (
        <>
          <FileDropzone
            multiple={false}
            value={field.value ? [field.value] : []}
            onFiles={(files) => field.onChange(files[0])}
          />
          {error && <Typography color="error" variant="caption">{error.message}</Typography>}
        </>
      )}
    />
  );
};
