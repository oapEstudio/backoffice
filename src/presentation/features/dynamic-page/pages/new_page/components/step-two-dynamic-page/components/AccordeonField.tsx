import React from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import type { IModalAddElementFormValues } from '../../modal-add-element/ModalAddElement';
import { CustomRichTextEditor } from '../../../../../../../components/ui/rich-text-editor/CustomRichTextEditor';
import Typography from '@mui/material/Typography';
import { CustomStack } from '../../../../../../../components/ui/stack/Stack';
import CustomTextInput from '../../../../../../../components/ui/inputs/text-input/text-input.component';
import { minTrimmed } from '../../../../../../../utils/minTrimmed';

export const AccordeonField: React.FC = () => {
  const { control, formState: { errors } } = useFormContext<IModalAddElementFormValues>();
  return <CustomStack direction='column' spacing={5}>

         <Controller
              name="label"
              control={control}
              rules={{
                required: 'El titulo es obligatorio',
                minLength: { value: 10, message: 'Mínimo 10 caracteres' },         
                validate: { minTrimmed: minTrimmed(10) },
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
            name="text"
            control={control}
            rules={{ required: 'El texto es obligatorio', minLength: 10 }}
            render={({ field, fieldState: { error } }) => (
                <>
                    <CustomRichTextEditor change={field.onChange} />
                    {error && <Typography color="error" variant="caption">{error.message}</Typography>}
                </>
            )}
            />

  </CustomStack>
};
