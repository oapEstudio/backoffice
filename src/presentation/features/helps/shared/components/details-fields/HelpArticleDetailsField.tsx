import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import CustomTextInput from '../../../../../components/ui/inputs/text-input/text-input.component';
import CustomSelect from '../../../../../components/ui/inputs/select/select.component';
import { minTrimmed } from '../../../../../utils/minTrimmed';
import type { IHelpFormValues } from '../../interface/IHelpFormValues';
import { MAX_LENGTH_INPUT } from '../../../../shared/constants/default-input';
import type { SelectOption } from '../../../../../components/ui/inputs/select/select.interface';
import CustomTextAreaInput from '../../../../../components/ui/inputs/text-area-input/text-area-input.component';
import { useGetHelpSections } from '../../../hooks/useGetHelpsSection';
import CustomSearchSelect from '../custom-search-select/CustomSearchSelect';

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
  
  // Pasa el término de búsqueda al hook
  const { result: sectionItems, loading } = useGetHelpSections(searchTerm);

  // Transforma los datos
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
        render={({ field }) => (
          <CustomSearchSelect
            value={field.value || ''}
            onChange={field.onChange}
            onSearch={handleSearch} // ⬅️ Callback de búsqueda
            options={selectItemsSection}
            placeholder="Buscar sección..."
            label="Sección a la que pertenecerá este artículo"
            loading={loading}
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
          maxLength: 60,
          validate: { minTrimmed: minTrimmed(3) },
        }}
        render={({ field }) => (
          <CustomTextInput
            {...field}
            required
            label={titleLabel}
            type="text"
            maxLength={60}
            error={!!errors.title}
            helperText={errors.title?.message}
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
          maxLength: MAX_LENGTH_INPUT,
          validate: { minTrimmed: minTrimmed(3) },
        }}
        render={({ field }) => (
          <CustomTextAreaInput
            {...field}
            label="Descripción del artículo"
            required
            maxLength={300}
            error={!!errors.description}
            helperText={errors.description?.message}
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