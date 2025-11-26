import React, { useEffect, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import { Controller, useFormContext } from 'react-hook-form';
import type { INotificationFormValues } from '../../interface/INotificationFormValues';
import { useNotificationFilterOptions } from '../../../hooks/useNotificationFilterOptions';
import { toNotificationSelect, toNotificationSelectCommon } from '../../../mappers/notificationMapper';
import type { SelectOption } from '../../../../../components/ui/inputs/select/select.interface';
import { useNotPastValidation } from '../../../../../utils/useNotPastValidation';
import { useEndAfterStartValidation } from '../../../../../utils/useEndAfterStartValidation';
import { minTrimmed } from '../../../../../utils/minTrimmed';
import CustomTextInput from '../../../../../components/ui/inputs/text-input/text-input.component';
import CustomTextAreaInput from '../../../../../components/ui/inputs/text-area-input/text-area-input.component';
import CustomRadioButton from '../../../../../components/ui/inputs/radio-button/radio-button.component';
import { env } from '../../../../../../infrastructure/config/env';
import { CustomStack } from '../../../../../components/ui/stack/Stack';
import { CustomBox } from '../../../../../components/ui/box/CustomBox';
import CustomDateInput from '../../../../../components/ui/inputs/date-input/date-input.component';
import CustomTimePicker from '../../../../../components/ui/inputs/date-time-input/date-time-input.component';
import CustomSelect from '../../../../../components/ui/inputs/select/select.component';


interface NotificatioBellDetailsFieldsProps {
  autoCleanup?: boolean;
}

export const NotificationBellDetailsFields: React.FC<NotificatioBellDetailsFieldsProps> = ({
  autoCleanup = false,
}) => {
  const { control, formState: { errors }, watch, setValue } = useFormContext<INotificationFormValues>();

  const { resultState: statuses,resultCommon } = useNotificationFilterOptions({
    stateFilters: autoCleanup ? { forUpdate: true } : { forCreate: true }
  });
  const selectItemsStatuses: SelectOption[] = useMemo(
    () => statuses.map(toNotificationSelect),
    [statuses]
  );

   const selectItemsCommon: SelectOption[] = useMemo(
    () => resultCommon.map(toNotificationSelectCommon),
    [resultCommon]
  );

  const hasButton = watch('hasButton');
  const hasPublication = watch('hasPublication');
  const hasExpired = watch('hasExpired');


  const prevHasPub = React.useRef<boolean>(hasPublication);
  const prevHasExp = React.useRef<boolean>(hasExpired);

  useEffect(() => {
    const cur = watch('hasPublication');
    if (autoCleanup && prevHasPub.current && !cur) {
      setValue('dateFrom', null, { shouldValidate: true });
      setValue('timeFrom', null, { shouldValidate: true });
    }
    prevHasPub.current = cur;
  }, [watch('hasPublication'), autoCleanup, setValue]);

  useEffect(() => {
    const cur = watch('hasExpired');
    if (autoCleanup && prevHasExp.current && !cur) {
      setValue('dateTo', null, { shouldValidate: true });
      setValue('timeTo', null, { shouldValidate: true });
    }
    prevHasExp.current = cur;
  }, [watch('hasExpired'), autoCleanup, setValue]);

      const {
      dateRules: dateFromRules,
      timeRules: timeFromRules,
      wrapStartDateOnChange,
      wrapStartTimeOnChange,
    } = useNotPastValidation<INotificationFormValues,'dateFrom','timeFrom'>({
          startDateName: 'dateFrom',
          startTimeName: 'timeFrom',
          enabled: autoCleanup? false: !!hasPublication ,
          requireStart: !!hasPublication,
          messages: {
            requiredDate: 'La fecha de publicación es obligatoria',
            requiredTime: 'La hora de publicación es obligatoria',
            inPast: 'La publicación no puede ser anterior al momento actual',
          },
          graceMs: 0, 
        });

    const {
    dateRules: dateToRules,
    timeRules: timeToRules,
    wrapEndDateOnChange,
    wrapEndTimeOnChange,
  } = useEndAfterStartValidation<
    INotificationFormValues,
    'dateFrom',
    'timeFrom',
    'dateTo',
    'timeTo'
  >({
    startDateName: 'dateFrom',
    startTimeName: 'timeFrom',
    endDateName: 'dateTo',
    endTimeName: 'timeTo',
    enabled: !!hasPublication && !!hasExpired,
    requireEnd: !!hasExpired,
    messages: {
      requiredDate: 'La fecha de caducidad es obligatoria',
      requiredTime: 'La hora de caducidad es obligatoria',
      invalidOrder: 'La caducidad no puede ser anterior a la publicación',
    },
  });

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
            label="Título"
            type="text"
            maxLength={60}
            error={!!errors.title}
            helperText={errors.title?.message}           
          />
        )}
      />

      <Controller
        name="subtitle"
        control={control}
        rules={{
          minLength: { value: 5, message: 'Mínimo 5 caracteres' },
          maxLength: 300,
          validate: { minTrimmed: minTrimmed(5) },          
        }}
        render={({ field }) => (
          <CustomTextAreaInput
            {...field}
            label="Descripción"
            maxLength={300}
            error={!!errors.subtitle}
            helperText={errors.subtitle?.message}           
          />
        )}
      />
    

      <br />
      <span>¿Esta publicación tendrá un botón?</span>

      <Controller
        name="hasButton"
        control={control}
        render={({ field }) => (
          <CustomRadioButton
            {...field}
            direction="row"
            options={[
              { label: 'Sí', value: true },
              { label: 'No', value: false },
            ]}
          />
        )}
      />

      <Controller
        name="buttonTitle"
        control={control}
        rules={{
          validate: (v) => {
            if (!hasButton) return true;
            const t = (v ?? '').trim();
            if (!t) return 'El título del botón es obligatorio';
            if (t.length < 5) return 'Mínimo 5 caracteres';
            if (!env.patternInputText.test(t)) return 'No se permiten caracteres especiales como + * ? [ ] ^ $ ( ) { } | \\ ! " # % & / = \' ¡';
            return true;
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <CustomTextInput
            {...field}
            label="Título botón"
            type="text"
            error={!!error}
            helperText={error?.message}
            disabled={!hasButton}
          />
        )}
      />

      <Controller
        name="buttonLink"
        control={control}
        rules={{
          validate: (v) => {
            if (!hasButton) return true;
            const t = (v ?? '').trim();
            if (!t) return 'Debe ingresar un link para el botón';
            const urlOk = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/.test(t);
            if (!urlOk) return 'Ingrese una URL válida (ej: https://example.com)';
            return true;
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <CustomTextInput
            {...field}
            label="Link del botón"
            type="url"
            error={!!error}
            helperText={error?.message}
            disabled={!hasButton}
          />
        )}
      />

      <br />
      <br />

      <CustomStack direction={autoCleanup ? 'column' : 'row'} spacing={5} sx={{ marginBottom: '5%' }}>
        <CustomBox>
          <span>¿Desea programar la publicación?</span>

          <Controller
            name="hasPublication"
            control={control}
            render={({ field }) => (
              <CustomRadioButton
                {...field}
                direction="row"
                options={[
                  { label: 'Sí', value: true },
                  { label: 'No', value: false },
                ]}               
              />
            )}
          />

          <br />

          <CustomStack direction="row" spacing={5} sx={{ marginBottom: '5%' }}>
            <CustomBox>
              <Controller
                name="dateFrom"
                control={control}
                rules={dateFromRules}
                render={({ field, fieldState: { error }}) => (
                  <CustomDateInput
                    value={field.value}
                    onChange={wrapStartDateOnChange(field.onChange)}
                    label="Fecha de publicación"
                    size="small"                                  
                    disabled={!hasPublication}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </CustomBox>

            <CustomBox>
              <Controller
                name="timeFrom"
                control={control}
                rules={timeFromRules}
                render={({ field, fieldState: { error } }) => (
                  <CustomTimePicker
                    value={field.value}
                    onChange={wrapStartTimeOnChange(field.onChange)} 
                    label="Hora de publicación"
                    size="small"
                    disabled={!hasPublication}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </CustomBox>
          </CustomStack>
        </CustomBox>

        <CustomBox>
          <span>¿Desea asignar una fecha de caducidad?</span>

          <Controller
            name="hasExpired"
            control={control}
            render={({ field }) => (
              <CustomRadioButton
                {...field}
                direction="row"
                options={[
                  { label: 'Sí', value: true },
                  { label: 'No', value: false },
                ]}               
              />
            )}
          />

          <br />

          <CustomStack direction="row" spacing={5} sx={{ marginBottom: '5%' }}>
            <CustomBox>
              <Controller
                  name="dateTo"
                  control={control}
                  rules={dateToRules}
                  render={({ field, fieldState: { error } }) => (
                    <CustomDateInput
                      value={field.value}
                      onChange={wrapEndDateOnChange(field.onChange)}
                      label="Fecha de caducidad"
                      size="small"
                      disabled={!hasExpired}
                      error={!!error}                        
                      helperText={error?.message}  
                    />
                  )}
                />
            </CustomBox>

            <CustomBox>
              <Controller
                  name="timeTo"
                  control={control}
                  rules={timeToRules}
                  render={({ field , fieldState: { error }}) => (
                    <CustomTimePicker
                      value={field.value}
                      onChange={wrapEndTimeOnChange(field.onChange)}
                      label="Hora de caducidad"
                      size="small"
                      disabled={ !hasExpired}
                      error={!!error}                        
                      helperText={error?.message}  
                    />
                  )}
                />
            </CustomBox>
          </CustomStack>
        </CustomBox>
      </CustomStack>
       <Controller
        name="notificationCommonTypeId"
        control={control}
        rules={{ required: 'El tipo de notificación es obligatorio', min: 1 }}
        render={({ field }) => (
          <CustomSelect
            {...field}
            label="Tipo de notificación"
            options={selectItemsCommon}
            error={!!errors.state}            
          />
        )}
      />
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
          />
        )}
      />
    </>
  );
};

export default NotificationBellDetailsFields;
