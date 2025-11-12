import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import { CustomStack } from '../../../../components/ui/stack/Stack';
import { MAX_LENGTH_INPUT_NAME } from '../../../shared/constants/default-input';
import { minTrimmed } from '../../../../utils/minTrimmed';
import { env } from '../../../../../infrastructure/config/env';
import CustomTextInput from '../../../../components/ui/inputs/text-input/text-input.component';
import Required from '../../../../components/ui/required/required.component';
import DualProfileFetch from '../../../../components/widgets/dual-profile-add-fetch/DualProfileAddFetch';
import { styles } from '../../../../components/ui/inputs/styles';
import type { IHelpFormValues } from '../interface/IHelpFormValues';
import Loading from '../../../../components/ui/loading';
import { CustomBox } from '../../../../components/ui/box/CustomBox';


type StepTwoGenericProps = {
  remountKey?: string;
  nameLabel?: string;
  profilesLabel?: string;
  isLoadingProfiles?: boolean;
  disabledAll?: boolean;
  requireProfiles?: boolean;
  leftSeedProfiles?: Array<{ id: string; name: string }>;
};

export const StepTwoGeneric: React.FC<StepTwoGenericProps> = ({
  remountKey,
  nameLabel = 'Nombre',
  profilesLabel = 'Seleccione los perfiles que podrán ver esta sección',
  disabledAll = false,
  requireProfiles = true,
  leftSeedProfiles = [],
  isLoadingProfiles = false
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IHelpFormValues>();

  return (
    <CustomStack spacing={5} direction="column">

      <Controller
        name="name"
        control={control}
        rules={{
          required: 'El nombre es obligatorio',
          minLength: { value: 5, message: 'Mínimo 5 caracteres' },
          maxLength: MAX_LENGTH_INPUT_NAME,
          validate: { minTrimmed: minTrimmed(5) },
          pattern: {
            value: env.patternInputText,
            message:
              'No se permiten caracteres especiales como + * ? [ ] ^ $ ( ) { } | \\ ! " # % & / = \' ¡',
          },
        }}
        render={({ field, fieldState }) => (
          <CustomTextInput
            {...field}
            label={nameLabel}
            type="text"
            required
            maxLength={MAX_LENGTH_INPUT_NAME}
            error={fieldState.isDirty && !!errors.name}
            helperText={fieldState.isDirty ? errors.name?.message : undefined}
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
        render={({ field, fieldState }) => (
          <>
            <InputLabel sx={styles.label}>
              {profilesLabel}
              {requireProfiles && <Required value="*" />}
            </InputLabel>
            <>
              {isLoadingProfiles ? (
                <CustomBox display="flex" justifyContent="center" my={2}>
                  <Loading />
                </CustomBox>
              ) : (
                <DualProfileFetch
                  selectedProfiles={field.value ?? []}
                  selectedFilters={(field.value ?? []).map((p: any) => p.id)}
                  {...(leftSeedProfiles.length > 0 && { initialLeftProfiles: leftSeedProfiles })}
                  remountKey={remountKey}
                  onChange={() => { }}
                  onChangeProfiles={(profiles) => field.onChange(profiles)}
                />
              )}
              {!!fieldState.error && (
                <Typography color="error.main" variant="caption" sx={{ mt: 1, display: "block" }}>
                 {fieldState.isDirty}
                  { fieldState.error.message}
                </Typography>
              )}
            </>
          </>
        )}
      />
    </CustomStack>
  );
};

export default StepTwoGeneric;
