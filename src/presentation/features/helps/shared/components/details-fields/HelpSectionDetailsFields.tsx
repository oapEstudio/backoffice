import React, { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import CustomTextInput from '../../../../../components/ui/inputs/text-input/text-input.component';

import CustomSelect from '../../../../../components/ui/inputs/select/select.component';
import type { SelectOption } from '../../../../../components/ui/inputs/select/select.interface';
import { minTrimmed } from '../../../../../utils/minTrimmed';
import { toHelpSelect } from '../../../mappers/helpCreateMapper';
import { useHelpFilterOptions } from '../../../hooks/useHelpsFilterOptions';
import type { IHelpFormValues } from '../../interface/IHelpFormValues';


interface HelpSectionDetailsFieldsProps {
  autoCleanup?: boolean;
  disabledAll?: boolean;
  titleLabel?: string;
  disabledState?: boolean;
}

export const HelpSectionDetailsFields: React.FC<HelpSectionDetailsFieldsProps> = ({
  titleLabel = 'Título',
  autoCleanup = false,
  disabledAll = false,
  disabledState = false,
}) => {
  const { control, formState: { errors }, watch, setValue } = useFormContext<IHelpFormValues>();

  const { resultState: statuses } = useHelpFilterOptions({
    stateFilters: autoCleanup ? { forUpdate: true } : { forCreate: true }
  });

  const selectItemsStatuses: SelectOption[] = useMemo(
    () => statuses.map(toHelpSelect),
    [statuses]
  );

  return (
    <>
     <Controller
        name="title"
        control={control}
        rules={{
          required: 'El título es obligatorio',
          minLength: { value: 3, message: 'Mínimo 3 caracteres' },
          maxLength: 60,
          validate: { minTrimmed: minTrimmed(3) }
        }}
        render={({ field }) => (
          <CustomTextInput
            {...field}
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

export default HelpSectionDetailsFields;
