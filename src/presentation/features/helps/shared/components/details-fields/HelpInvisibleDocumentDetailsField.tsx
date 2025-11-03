import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import CustomTextInput from '../../../../../components/ui/inputs/text-input/text-input.component';
import CustomSelect from '../../../../../components/ui/inputs/select/select.component';
import { minTrimmed } from '../../../../../utils/minTrimmed';
import type { IHelpFormValues } from '../../interface/IHelpFormValues';
import { MAX_LENGTH_INPUT } from '../../../../shared/constants/default-input';
import type { SelectOption } from '../../../../../components/ui/inputs/select/select.interface';
import FileDropzone from '../../../../../components/ui/file-drop-zone/FileDropzone';
import { Typography } from '@mui/material';

interface HelpDocumentInvisibleDetailsFieldsProps {
  disabledAll?: boolean;
  titleLabel?: string;
  disabledState?: boolean;
  selectItemsStatuses: SelectOption[];
}

export const HelpInvisibleDocumentDetailsFields: React.FC<HelpDocumentInvisibleDetailsFieldsProps> = ({
  titleLabel = 'Título del documento invisible',
  disabledAll = false,
  disabledState = false,
  selectItemsStatuses = [],
}) => {
  const { control, formState: { errors } } = useFormContext<IHelpFormValues>();

  return (
    <>
      <Controller
        name="title"
        control={control}
        rules={{
          required: 'El título es obligatorio',
          minLength: { value: 3, message: 'Mínimo 3 caracteres' },
          maxLength: MAX_LENGTH_INPUT,
          validate: { minTrimmed: minTrimmed(3) },
        }}
        render={({ field }) => (
          <CustomTextInput
            {...field}
            required
            label={titleLabel}
            type="text"
            maxLength={MAX_LENGTH_INPUT}
            error={!!errors.title}
            helperText={errors.title?.message}
            disabled={disabledAll}
          />
        )}
      />
      <br />
      <br />
      <Controller
        name="state"
        control={control}
        rules={{ required: 'El estado es obligatorio' }}
        render={({ field }) => (
          <CustomSelect
            {...field}
            label="Tipo de documento"
            required
            options={selectItemsStatuses}
            error={!!errors.state}
            disabled={disabledState || disabledAll}
          />
        )}
      />
      <br />
      <br />
      <Controller
        name="document"
        control={control}
        rules={{
          validate: (v) => (v !== undefined) || 'Debes agregar un documento',
        }}
        render={({ field, fieldState: { error } }) => (
          <>
            <FileDropzone
              multiple={false}
              value={field.value ? field.value : []}
              onFiles={(files) => {
                if (files) field.onChange(files[0])
              }}
            />
            {error && (
              <Typography color="error" variant="caption">
                {error.message}
              </Typography>
            )}
          </>
        )}
      />
      <br />
      <br />
      <Controller
        name="state"
        control={control}
        rules={{ required: 'El estado es obligatorio' }}
        render={({ field }) => (
          <CustomSelect
            {...field}
            label="Estado"
            required
            options={selectItemsStatuses}
            error={!!errors.state}
            disabled={disabledState || disabledAll}
          />
        )}
      />
    </>
  );
};

export default HelpInvisibleDocumentDetailsFields;