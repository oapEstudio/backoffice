import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import type { IModalAddElementFormValues } from '../../modal-add-element/ModalAddElement';
import { CustomRichTextEditor } from '../../../../../../../components/ui/rich-text-editor/CustomRichTextEditor';

export const ParagraphFields: React.FC = () => {
  const { control } = useFormContext<IModalAddElementFormValues>();
  return (
    <Controller
      name="text"
      control={control}
      rules={{ required: 'El texto es obligatorio', minLength: 10 }}
      render={({ field, fieldState: { error } }) => (
        <>
          <CustomRichTextEditor change={field.onChange} />
          {error && <Typography color="error.main" variant="caption">{error.message}</Typography>}
        </>
      )}
    />
  );
};
