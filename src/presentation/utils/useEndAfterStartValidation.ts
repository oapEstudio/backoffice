import { useEffect, useMemo } from 'react';
import {
  useFormContext,
  type FieldValues,
  type FieldPath,
  type RegisterOptions,
} from 'react-hook-form';
import type { Dayjs } from 'dayjs';


const combineDateTime = (d: Dayjs | null, t: Dayjs | null): Dayjs | null => {
  if (!d) return null;
  if (!t) return d.startOf('day');
  return d.hour(t.hour()).minute(t.minute()).second(t.second()).millisecond(0);
};


type ControllerRules<T extends FieldValues, K extends FieldPath<T>> =
  Omit<RegisterOptions<T, K>, 'setValueAs' | 'disabled' | 'valueAsNumber' | 'valueAsDate'>;

type Messages = {
  requiredDate?: string;
  requiredTime?: string;
  invalidOrder?: string;
};

type Options<
  T extends FieldValues,
  SD extends FieldPath<T>,
  ST extends FieldPath<T>,
  ED extends FieldPath<T>,
  ET extends FieldPath<T>
> = {
  startDateName: SD;
  startTimeName: ST;
  endDateName: ED;
  endTimeName: ET;
  enabled: boolean;
  requireEnd: boolean;
  messages?: Messages;
};

export function useEndAfterStartValidation<
  T extends FieldValues,
  SD extends FieldPath<T>,
  ST extends FieldPath<T>,
  ED extends FieldPath<T>,
  ET extends FieldPath<T>
>(opts: Options<T, SD, ST, ED, ET>) {
  const { getValues, trigger, watch } = useFormContext<T>();

  const enabledNow = !!opts.enabled;
  const requireEndNow = !!opts.requireEnd;

  const msgs: Required<Messages> = {
    requiredDate: 'La fecha de caducidad es obligatoria',
    requiredTime: 'La hora de caducidad es obligatoria',
    invalidOrder: 'La caducidad no puede ser anterior a la publicación',
    ...(opts.messages ?? {}),
  };

  const dateRules: ControllerRules<T, ED> = useMemo(() => ({
    required: requireEndNow ? msgs.requiredDate : false,
    validate: (dateToVal: Dayjs | null) => {
      if (!enabledNow) return true;
      const v = getValues();
      const start = combineDateTime(
        v[opts.startDateName] as unknown as Dayjs | null,
        v[opts.startTimeName] as unknown as Dayjs | null
      );
      const end = combineDateTime(
        dateToVal,
        v[opts.endTimeName] as unknown as Dayjs | null
      );
      if (!start || !end) return true;
      return end.isBefore(start) ? msgs.invalidOrder : true;
    },

  }), [enabledNow, requireEndNow, msgs.requiredDate, msgs.invalidOrder, getValues, opts.startDateName, opts.startTimeName, opts.endTimeName]);

  const timeRules: ControllerRules<T, ET> = useMemo(() => ({
    required: requireEndNow ? msgs.requiredTime : false,
    validate: (timeToVal: Dayjs | null) => {
      if (!enabledNow) return true;
      const v = getValues();
      const start = combineDateTime(
        v[opts.startDateName] as unknown as Dayjs | null,
        v[opts.startTimeName] as unknown as Dayjs | null
      );
      const end = combineDateTime(
        v[opts.endDateName] as unknown as Dayjs | null,
        timeToVal
      );
      if (!start || !end) return true;
      return end.isBefore(start) ? msgs.invalidOrder : true;
    },

  }), [enabledNow, requireEndNow, msgs.requiredTime, msgs.invalidOrder, getValues, opts.startDateName, opts.startTimeName, opts.endDateName]);

  const wrapEndDateOnChange = (orig: (v: Dayjs | null) => void) => (v: Dayjs | null) => {
    orig(v);
    void trigger(opts.endTimeName);
  };

  const wrapEndTimeOnChange = (orig: (v: Dayjs | null) => void) => (v: Dayjs | null) => {
    orig(v);
    void trigger(opts.endDateName);
  };


  const startDate = watch(opts.startDateName);
  const startTime = watch(opts.startTimeName);
  useEffect(() => {
    if (enabledNow) void trigger([opts.endDateName, opts.endTimeName]);
  }, [startDate, startTime, enabledNow, trigger, opts.endDateName, opts.endTimeName]);

  return { dateRules, timeRules, wrapEndDateOnChange, wrapEndTimeOnChange };
}
