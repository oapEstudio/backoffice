import React, { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import CustomTextInput from '../../../../../components/ui/inputs/text-input/text-input.component';
import CustomSelect from '../../../../../components/ui/inputs/select/select.component';
import { minTrimmed } from '../../../../../utils/minTrimmed';
import type { IHelpFormValues } from '../../interface/IHelpFormValues';
import { MAX_LENGTH_INPUT } from '../../../../shared/constants/default-input';
import type { SelectOption } from '../../../../../components/ui/inputs/select/select.interface';
import { useGetHelpSections } from '../hooks/useGetHelpsSection';
import CustomSearchSelect from '../custom-search-select/CustomSearchSelect';
import FileDropzone from '../../../../../components/ui/file-drop-zone/FileDropzone';
import { Typography } from '@mui/material';
import CustomRadioButton from '../../../../../components/ui/inputs/radio-button/radio-button.component';
import { HELP_ARTICLE, HELP_DOCUMENT_LINK, HELP_SECTION } from '../../constants/helps';
import { useGetHelpArticles } from '../hooks/useGetHelpsArticles';

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
  const { control, formState: { errors }, watch, setValue } = useFormContext<IHelpFormValues>();
  const [searchTerm, setSearchTerm] = useState('');

  const selectedType = watch('typeSearch') || HELP_SECTION;
  const watchDocumentType = watch('helpDocumentTypeId');

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
        render={({ field }) => (
          <CustomSearchSelect
            value={field.value || ''}
            onChange={field.onChange}
            onSearch={handleSearch}
            options={selectItems}
            placeholder={`Buscar ${selectedType === HELP_SECTION ? 'una Sección' : 'un Artículo'}...`}
            loading={loadingSection || loadingArticle}
            disabled={disabledAll}
            error={!!errors.parentId}
            helperText={errors.parentId?.message}
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
          render={({ field, fieldState: { error } }) => (

            <>
              <FileDropzone
                multiple={false}
                value={field.value ? field.value : []}
                onFiles={(files) => field.onChange(files)}
                disabled={disabledAll}
              />
              {error && (
                <Typography color="error" variant="caption">
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