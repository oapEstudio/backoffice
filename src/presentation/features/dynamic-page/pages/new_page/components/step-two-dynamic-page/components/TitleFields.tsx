// ./subforms/TitleFields.tsx
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import type { IModalAddElementFormValues } from '../../modal-add-element/ModalAddElement';
import { MAX_LENGTH_INPUT } from '../../../../../../shared/constants/default-input';
import { minTrimmed } from '../../../../../../../utils/minTrimmed';
import CustomTextInput from '../../../../../../../components/ui/inputs/text-input/text-input.component';
import { AlignButtonsField } from './AlignButtonsField';
import { CustomStack } from '../../../../../../../components/ui/stack/Stack';
import { SizeTitleField } from './SizeTitleField';

export const TitleFields: React.FC = () => {
  const { control, formState: { errors } } = useFormContext<IModalAddElementFormValues>();
  return (
    <>
      <CustomStack direction='column' spacing={5} >
            <SizeTitleField />
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
          <AlignButtonsField />      
      </CustomStack>
    </>
  );
};
