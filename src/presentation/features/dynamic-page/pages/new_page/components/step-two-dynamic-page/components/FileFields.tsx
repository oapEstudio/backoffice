import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import type { IModalAddElementFormValues } from '../../modal-add-element/ModalAddElement';
import FileDropzone from '../../../../../../../components/ui/file-drop-zone/FileDropzone';
import { CustomStack } from '../../../../../../../components/ui/stack/Stack';
import CustomTextInput from '../../../../../../../components/ui/inputs/text-input/text-input.component';
import { MAX_SIZE_FILE } from '../../../../../shared/constants/constants';

export const FileFields: React.FC = () => {
  const { control, formState: { errors } } = useFormContext<IModalAddElementFormValues>();
  return (
     <CustomStack direction='column' 
                  spacing={5}>
                  <Controller
                  name="label"
                  control={control}
                  rules={{
                    required: 'El título es obligatorio',                                                
                  }}
                  render={({ field }) => (
                    <CustomTextInput
                      {...field}
                      label="Título"
                      type="text"           
                      error={!!errors.label}
                      helperText={errors.label?.message}
                    />
                  )}
                />
      <Controller
        name="file"
        control={control}
        rules={{
                      validate: (v) => {                      
        
                        if (!v || (Array.isArray(v) && v.length === 0)) {
                          return 'Debes asignar un archivo';
                        }
        
                        const file = Array.isArray(v) ? v[0] : v;
        
                        if (file.size > MAX_SIZE_FILE) {
                          return 'El archivo no puede superar los 10 MB';
                        }
        
                        return true;
                      }
                    }}
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
    </CustomStack>
  );
};
