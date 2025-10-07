import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import { CustomStack } from '../../../../components/ui/stack/Stack';
import { MAX_LENGTH_INPUT } from '../../../shared/constants/default-input';
import { minTrimmed } from '../../../../utils/minTrimmed';
import { env } from '../../../../../infrastructure/config/env';
import CustomTextInput from '../../../../components/ui/inputs/text-input/text-input.component';
import Required from '../../../../components/ui/required/required.component';
import DualProfileFetch from '../../../../components/widgets/dual-profile-add-fetch/DualProfileAddFetch';
import { styles } from '../../../../components/ui/inputs/styles';
import type { INotificationFormValues } from '../interface/INotificationFormValues';


type StepOneGenericProps = {
  remountKey?: string;
  nameLabel?: string;
  profilesLabel?: string;
  disabledAll?: boolean;
  requireProfiles?: boolean;
};

export const StepOneGeneric: React.FC<StepOneGenericProps> = ({
  remountKey,
  nameLabel = 'Nombre',
  profilesLabel = 'Seleccione los perfiles que podrán ver esta notificación',
  disabledAll = false,
  requireProfiles = true,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<INotificationFormValues>();

  return (
    <CustomStack spacing={5} direction="column">

      <Controller
        name="name"
        control={control}
        rules={{
          required: 'El nombre es obligatorio',
          minLength: { value: 5, message: 'Mínimo 5 caracteres' },
          maxLength: MAX_LENGTH_INPUT,
          validate: { minTrimmed: minTrimmed(5) },
          pattern: {
            value: env.patternInputText,
            message:
              'No se permiten caracteres especiales como + * ? [ ] ^ $ ( ) { } | \\ ! " # % & / = \' ¡',
          },
        }}
        render={({ field }) => (
          <CustomTextInput
            {...field}
            label={nameLabel}
            type="text"
            maxLength={MAX_LENGTH_INPUT}
            error={!!errors.name}
            helperText={errors.name?.message}
            disabled={disabledAll}
          />
        )}
      />


      <Controller
        name="profiles"
        control={control}
        rules={{
          validate: (v) =>
            !requireProfiles || (Array.isArray(v) && v.length > 0) || 'Debes asignar al menos un perfil',
        }}
        render={({ field, fieldState: { error } }) => (
          <>
            <InputLabel sx={styles.label}>
              {profilesLabel}
              {requireProfiles && <Required value="*" />}
            </InputLabel>

            <DualProfileFetch
              selectedProfiles={field.value ?? []}
              selectedFilters={(field.value ?? []).map((p: any) => p.id)}
              remountKey={remountKey}
              onChange={() => {}}
              onChangeProfiles={(profiles) => field.onChange(profiles)}
            />

            {error && (
              <Typography color="error" variant="caption">
                {error.message}
              </Typography>
            )}
          </>
        )}
      />
    </CustomStack>
  );
};

export default StepOneGeneric;
