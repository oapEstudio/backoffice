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
import { HELP_DOCUMENT_LINK } from '../../constants/helps';

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
  const watchDocumentType = watch('helpDocumentTypeId');
  const prevDocumentType = useRef(watchDocumentType);

  useEffect(() => {
    if (prevDocumentType.current !== watchDocumentType && prevDocumentType.current !== undefined) {
      if (Number(watchDocumentType) === HELP_DOCUMENT_LINK) {
        setValue('document', []);
        setValue('link', '');
      } else {
        setValue('document', []);
        setValue('link', '');
      }
    }

    prevDocumentType.current = watchDocumentType;
  }, [watchDocumentType, setValue]);

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
        name="helpDocumentTypeId"
        control={control}
        rules={{ required: 'El tipo de documento es obligatorio' }}
        render={({ field }) => (
          <CustomSelect
            {...field}
            label="Tipo de documento"
            required
            options={selectItemsDocumentType}
            error={!!errors.state}
            disabled={disabledState || disabledAll}
          />
        )}
      />
      <br />
      <br />
      {Number(watchDocumentType) === HELP_DOCUMENT_LINK ? (
        <Controller
          name="link"
          control={control}
          rules={{
            required: 'La URL es obligatoria',
            validate: {
              validUrl: (value) => {
                if (!value) return true;
                try {
                  new URL(value);
                  return true;
                } catch {
                  return 'Debe ser una URL válida (ej: https://ejemplo.com)';
                }
              },
              validProtocol: (value) => {
                if (!value) return true;
                return value.startsWith('http://') || value.startsWith('https://')
                  || 'La URL debe comenzar con http:// o https://';
              }
            }
          }}
          render={({ field }) => (
            <CustomTextInput
              {...field}
              required
              label="URL del documento"
              type="url"
              placeholder="https://ejemplo.com/documento"
              error={!!errors.link}
              helperText={errors.link?.message}
              disabled={disabledAll}
            />
          )}
        />
      ) : (

        <Controller
          name="document"
          control={control}
          rules={{
            validate: (v) => (v !== undefined) || 'Debes asignar un archivo',
          }}
          render={({ field, fieldState: { error } }) => {
            return (
              <>
                <FileDropzone
                  multiple={false}
                  value={(field.value ? field.value : [])}
                  onFiles={(files) => field.onChange(files)}
                  disabled={disabledAll}
                />
                {error && (
                  <Typography color="error" variant="caption">
                    {error.message}
                  </Typography>
                )}
              </>
            );
          }}
        />
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