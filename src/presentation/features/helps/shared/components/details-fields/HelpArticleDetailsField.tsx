import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import CustomTextInput from '../../../../../components/ui/inputs/text-input/text-input.component';
import CustomSelect from '../../../../../components/ui/inputs/select/select.component';
import { minTrimmed } from '../../../../../utils/minTrimmed';
import type { IHelpFormValues } from '../../interface/IHelpFormValues';
import { MAX_LENGTH_INPUT } from '../../../../shared/constants/default-input';
import type { SelectOption } from '../../../../../components/ui/inputs/select/select.interface';
import CustomTextAreaInput from '../../../../../components/ui/inputs/text-area-input/text-area-input.component';
import CustomSearchSelect from '../custom-search-select/CustomSearchSelect';
import { useGetHelpSections } from '../../hooks/useGetHelpsSection';

interface HelpArticleDetailsFieldsProps {
  disabledAll?: boolean;
  titleLabel?: string;
  disabledState?: boolean;
  selectItemsStatuses: SelectOption[];
}

export const HelpArticleDetailsFields: React.FC<HelpArticleDetailsFieldsProps> = ({
  titleLabel = 'Título del artículo',
  disabledAll = false,
  disabledState = false,
  selectItemsStatuses = [],
}) => {
  const { control, formState: { errors } } = useFormContext<IHelpFormValues>();
  const [searchTerm, setSearchTerm] = useState('');
  
  const { result: sectionItems, loading } = useGetHelpSections(searchTerm);

  const selectItemsSection = sectionItems
    ? sectionItems.map((section) => ({
        value: section.id,
        label: section.description,
      }))
    : [];

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <>
      <Controller
        name="parentId"
        control={control}
        rules={{ required: 'Seleccionar una Sección es obligatorio' }}
        render={({ field, fieldState }) => (
          <CustomSearchSelect
            value={field.value || ''}
            onChange={field.onChange}
            onSearch={handleSearch} 
            options={selectItemsSection}
            placeholder="Buscar sección..."
            label="Sección a la que pertenecerá este artículo"
            loading={loading}
            disabled={disabledAll}
            error={fieldState.isDirty && !!errors.parentId}
            helperText={fieldState.isDirty && !!errors.parentId ? errors.parentId?.message : undefined} 
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
        name="description"
        control={control}
        rules={{
          required: 'La descripción es obligatoria',
          minLength: { value: 3, message: 'Mínimo 3 caracteres' },
          maxLength: 1000,
          validate: { minTrimmed: minTrimmed(3) },
        }}
        render={({ field, fieldState }) => (
          <CustomTextAreaInput
            {...field}
            label="Descripción del artículo"
            required
            maxLength={1000}
            error={fieldState.isDirty && !!errors.description}
            helperText={fieldState.isDirty ? errors.description?.message : undefined}
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

export default HelpArticleDetailsFields;