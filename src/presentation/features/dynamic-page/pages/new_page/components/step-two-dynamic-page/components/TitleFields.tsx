// ./subforms/TitleFields.tsx
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import type { IModalAddElementFormValues } from '../../modal-add-element/ModalAddElement';
import { MAX_LENGTH_INPUT } from '../../../../../../shared/constants/default-input';
import { minTrimmed } from '../../../../../../../utils/minTrimmed';
import CustomTextInput from '../../../../../../../components/ui/inputs/text-input/text-input.component';
import { AlignButtonsField } from './AlignButtonsField';

export const TitleFields: React.FC = () => {
  const { control, formState: { errors } } = useFormContext<IModalAddElementFormValues>();
  return (
    <>
      <Controller
        name="label"
        control={control}
        rules={{
          required: 'El titulo es obligatorio',
          minLength: { value: 10, message: 'Mínimo 10 caracteres' },
          maxLength: MAX_LENGTH_INPUT,
          validate: { minTrimmed: minTrimmed(10) },
        }}
        render={({ field }) => (
          <CustomTextInput
            {...field}
            label="Título"
            type="text"
            maxLength={MAX_LENGTH_INPUT}
            error={!!errors.label}
            helperText={errors.label?.message}
          />
        )}
      />
      <AlignButtonsField />
    </>
  );
};
