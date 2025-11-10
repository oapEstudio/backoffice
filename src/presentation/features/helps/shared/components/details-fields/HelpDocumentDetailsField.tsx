import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import CustomTextInput from '../../../../../components/ui/inputs/text-input/text-input.component';
import CustomSelect from '../../../../../components/ui/inputs/select/select.component';
import { minTrimmed } from '../../../../../utils/minTrimmed';
import type { IHelpFormValues } from '../../interface/IHelpFormValues';
import { MAX_LENGTH_INPUT } from '../../../../shared/constants/default-input';
import type { SelectOption } from '../../../../../components/ui/inputs/select/select.interface';
import CustomSearchSelect from '../custom-search-select/CustomSearchSelect';
import FileDropzone from '../../../../../components/ui/file-drop-zone/FileDropzone';
import { Typography } from '@mui/material';
import CustomRadioButton from '../../../../../components/ui/inputs/radio-button/radio-button.component';
import { HELP_ARTICLE, HELP_DOCUMENT_DOWNLOAD, HELP_DOCUMENT_LINK, HELP_DOCUMENT_PDF, HELP_SECTION } from '../../constants/helps';
import { useGetHelpArticles } from '../../hooks/useGetHelpsArticles';
import { useGetHelpSections } from '../../hooks/useGetHelpsSection';
import { useDocumentAccept } from '../../hooks/useDocumentAccept';

interface HelpDocumentDetailsFieldsProps {
  disabledAll?: boolean;
  titleLabel?: string;
  disabledState?: boolean;
  selectItemsStatuses: SelectOption[];
  selectItemsDocumentType: SelectOption[];
}

export const HelpDocumentDetailsFields: React.FC<HelpDocumentDetailsFieldsProps> = ({
  titleLabel = 'Título del documento',
  disabledAll = false,
  disabledState = false,
  selectItemsStatuses = [],
  selectItemsDocumentType = [],
}) => {
  const { control, formState: { errors }, watch, setValue, clearErrors } = useFormContext<IHelpFormValues>();
  const [searchTerm, setSearchTerm] = useState('');
  const { accept, docTypeNum } = useDocumentAccept();
  const selectedType = watch('typeSearch') || HELP_SECTION;

  const { result: sectionItems, loading: loadingSection } = useGetHelpSections(
    selectedType === HELP_SECTION ? searchTerm : ''
  );
  const { result: articleItems, loading: loadingArticle } = useGetHelpArticles(
    selectedType === HELP_ARTICLE ? searchTerm : ''
  );

  const selectItems = selectedType === HELP_SECTION
    ? (sectionItems?.map((section) => ({
      value: section.id,
      label: section.description,
    })) || [])
    : (articleItems?.map((article) => ({
      value: article.id,
      label: article.description || article.description,
    })) || []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleTypeChange = (newType: any) => {
    setValue('typeSearch', newType);
    setValue('parentId', '');
    setSearchTerm('');
  };

  const prevDocumentType = useRef(docTypeNum);

  useEffect(() => {
    if (prevDocumentType.current !== docTypeNum && prevDocumentType.current !== undefined) {
      if (Number(docTypeNum) === HELP_DOCUMENT_LINK) {
        setValue('document', []);
      } else {
        setValue('link', '');
      }
    }

    prevDocumentType.current = docTypeNum;
  }, [docTypeNum, setValue]);

  return (
    <>
      <Controller
        name="typeSearch"
        control={control}
        defaultValue={HELP_SECTION}
        render={({ field }) => (
          <CustomRadioButton
            {...field}
            label="Sección/Artículo a la que pertenecerá este documento"
            direction="row"
            options={[
              { label: 'Sección', value: HELP_SECTION },
              { label: 'Artículo', value: HELP_ARTICLE },
            ]}
            onChange={(value) => {
              field.onChange(value);
              handleTypeChange(value);
            }}
          />
        )}
      />

      <Controller
        name="parentId"
        control={control}
        rules={{ required: `Seleccionar ${selectedType === HELP_SECTION ? 'una Sección' : 'un Artículo'} es obligatorio` }}
        render={({ field, fieldState }) => (
          <CustomSearchSelect
            value={field.value || ''}
            onChange={field.onChange}
            onSearch={handleSearch}
            options={selectItems}
            placeholder={`Buscar ${selectedType === HELP_SECTION ? 'una Sección' : 'un Artículo'}...`}
            loading={loadingSection || loadingArticle}
            disabled={disabledAll}
            error={fieldState.isDirty && !!errors.parentId}
            helperText={fieldState.isDirty ? errors.parentId?.message : undefined}
            required={true}
          />
        )}
      />
      <br />
      <br />
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
      {Number(docTypeNum) === HELP_DOCUMENT_LINK ? (
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
          render={({ field, fieldState }) => (
            <CustomTextInput
              {...field}
              required
              label="URL del documento"
              type="url"
              placeholder="https://ejemplo.com/documento"
              error={fieldState.isDirty && !!errors.link}
              helperText={fieldState.isDirty ? errors.link?.message : undefined}
              disabled={disabledAll}
            />
          )}
        />
      ) : (
        <Controller
          name="document"
          control={control}
          rules={{
            validate: (v) => {
              if (!v || (Array.isArray(v) && v.length === 0)) {
                return 'Debes asignar un archivo';
              }
            }
          }}
          render={({ field, fieldState: { error } }) => (
            <>
              <FileDropzone
                accept={accept}
                multiple={false}
                value={field.value ? field.value : []}
                onFiles={(files) => field.onChange(files)}
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

export default HelpDocumentDetailsFields;