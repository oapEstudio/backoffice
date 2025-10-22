import React, { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import CustomTextInput from '../../../../../components/ui/inputs/text-input/text-input.component';

import CustomSelect from '../../../../../components/ui/inputs/select/select.component';
import { minTrimmed } from '../../../../../utils/minTrimmed';
import type { IHelpFormValues } from '../../interface/IHelpFormValues';
import { MAX_LENGTH_INPUT } from '../../../../shared/constants/default-input';
import type { SelectOption } from '../../../../../components/ui/inputs/select/select.interface';
import CustomTextAreaInput from '../../../../../components/ui/inputs/text-area-input/text-area-input.component';


interface HelpArticleDetailsFieldsProps {
  disabledAll?: boolean;
  titleLabel?: string;
  disabledState?: boolean;
  selectItemsStatuses: SelectOption[];
  selectItemsSection: any [];
}

export const HelpArticleDetailsFields: React.FC<HelpArticleDetailsFieldsProps> = ({
  titleLabel = 'Título del artículo',
  disabledAll = false,
  disabledState = false,
  selectItemsStatuses = [],
  selectItemsSection = [],
}) => {
  const { control, formState: { errors } } = useFormContext<IHelpFormValues>();

  return (
    <>
      <Controller
        name="parentId"
        control={control}
        rules={{ required: 'Seleccionar una Sección es obligatorio', min: 1 }}
        render={({ field }) => (
          <CustomSelect
            {...field}
            label="Sección a la que pertenecerá este artículo"
            options={selectItemsStatuses}
            error={!!errors.state}
            disabled={disabledState || disabledAll}
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
          validate: { minTrimmed: minTrimmed(3) }
        }}
        render={({ field }) => (
          <CustomTextInput
            {...field}
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
        name="description"
        control={control}
        rules={{
          required: 'El título es obligatorio',
          minLength: { value: 3, message: 'Mínimo 3 caracteres' },
          maxLength: MAX_LENGTH_INPUT,
          validate: { minTrimmed: minTrimmed(3) }
        }}
        render={({ field }) => (
          <CustomTextAreaInput
            {...field}
            label="Descripción del artículo"
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
        rules={{ required: 'El estado es obligatorio', min: 1 }}
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
