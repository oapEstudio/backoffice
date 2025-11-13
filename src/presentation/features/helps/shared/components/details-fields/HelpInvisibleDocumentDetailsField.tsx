import React, { useEffect, useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import CustomTextInput from '../../../../../components/ui/inputs/text-input/text-input.component';
import CustomSelect from '../../../../../components/ui/inputs/select/select.component';
import { minTrimmed } from '../../../../../utils/minTrimmed';
import type { IHelpFormValues } from '../../interface/IHelpFormValues';
import { MAX_LENGTH_INPUT } from '../../../../shared/constants/default-input';
import type { SelectOption } from '../../../../../components/ui/inputs/select/select.interface';
import FileDropzone from '../../../../../components/ui/file-drop-zone/FileDropzone';
import { Typography } from '@mui/material';
import { MAX_SIZE_FILE } from '../../constants/helps';
import { useDocumentAccept } from '../../hooks/useDocumentAccept';

interface HelpDocumentInvisibleDetailsFieldsProps {
  disabledAll?: boolean;
  titleLabel?: string;
  disabledState?: boolean;
  selectItemsStatuses: SelectOption[];
  selectItemsDocumentType: SelectOption[];
}

export const HelpInvisibleDocumentDetailsFields: React.FC<HelpDocumentInvisibleDetailsFieldsProps> = ({
  titleLabel = 'Título del documento invisible',
  disabledAll = false,
  disabledState = false,
  selectItemsStatuses = [],
  selectItemsDocumentType = [],
}) => {
  const { control, formState: { errors }, watch, setValue } = useFormContext<IHelpFormValues>();
  const { accept, docTypeNum } = useDocumentAccept();

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
        render={({ field, fieldState }) => (
          <CustomTextInput
            {...field}
            required
            label={titleLabel}
            type="text"
            maxLength={MAX_LENGTH_INPUT}
            error={fieldState.isDirty && !!errors.title}
            helperText={fieldState.isDirty ? errors.title?.message : undefined}
            disabled={disabledAll}
          />
        )}
      />
      <br />
      <br />
      <Controller
        name="helpDocumentTypeId"
        control={control}
        rules={{ required: 'El tipo de documento es obligatorio' }}
        render={({ field, fieldState }) => (
          <CustomSelect
            {...field}
            label="Tipo de documento"
            required
            options={selectItemsDocumentType}
            error={fieldState.isDirty && !!errors.helpDocumentTypeId}
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
              validate: (v) => {
                const documentLink = watch('documentLink');

                if (documentLink) return true;

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
                  accept={accept}
                  multiple={false}
                  value={field.value ? field.value : []}
                  onFiles={(files) => {
                    field.onChange(files);
                    if (files && files.length > 0) {
                      setValue('documentLink', '');
                    }
                  }}
                  disabled={disabledAll}
                />
                {error && (
                  <Typography color="error.main" variant="caption">
                    {error.message}
                  </Typography>
                )}
              </>
            )}
          />

          {watch('documentLink') && (!watch('document') || watch('document')?.length === 0) && (
            <Typography
              variant="body2"
              sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}
            >
              Documento actual:
              <Typography
                component="a"
                href={watch('documentLink')}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'primary.main', textDecoration: 'underline' }}
              >
                Ver documento
              </Typography>
            </Typography>
          )}
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