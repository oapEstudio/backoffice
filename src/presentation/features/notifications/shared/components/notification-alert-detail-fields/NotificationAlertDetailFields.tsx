import React, { useEffect, useMemo } from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import type { INotificationFormValues } from '../../interface/INotificationFormValues';
import { useNotificationFilterOptions } from '../../../hooks/useNotificationFilterOptions';
import { toNotificationSelect } from '../../../mappers/notificationMapper';
import type { SelectOption } from '../../../../../components/ui/inputs/select/select.interface';
import { useNotPastValidation } from '../../../../../utils/useNotPastValidation';
import { useEndAfterStartValidation } from '../../../../../utils/useEndAfterStartValidation';
import { minTrimmed } from '../../../../../utils/minTrimmed';
import CustomTextInput from '../../../../../components/ui/inputs/text-input/text-input.component';
import { CustomStack } from '../../../../../components/ui/stack/Stack';
import { CustomBox } from '../../../../../components/ui/box/CustomBox';
import CustomRadioButton from '../../../../../components/ui/inputs/radio-button/radio-button.component';
import CustomDateInput from '../../../../../components/ui/inputs/date-input/date-input.component';
import CustomTimePicker from '../../../../../components/ui/inputs/date-time-input/date-time-input.component';
import CustomSelect from '../../../../../components/ui/inputs/select/select.component';


interface INotificationAlertDetailFieldsProps{
    autoCleanup: boolean
}
export const NotificationAlertDetailFields: React.FC<INotificationAlertDetailFieldsProps> = ({autoCleanup}) => {
  const { control, formState: { errors }, watch, setValue } = useFormContext<INotificationFormValues>();

  const { resultState: statuses } = useNotificationFilterOptions({
    stateFilters: autoCleanup ? { forUpdate: true } : { forCreate: true }
  });
  const selectItemsStatuses: SelectOption[] = useMemo(
    () => statuses.map(toNotificationSelect),
    [statuses]
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
                    disabled={ !hasPublication}
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
                    disabled={ !hasPublication}
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
                      disabled={ !hasExpired}
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
                      disabled={!hasExpired}
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
}
