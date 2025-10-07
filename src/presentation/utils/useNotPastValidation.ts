import { useEffect, useMemo } from 'react';
import {
  useFormContext,
  type FieldValues,
  type FieldPath,
  type RegisterOptions,
} from 'react-hook-form';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

type ControllerRules<T extends FieldValues, K extends FieldPath<T>> =
  Omit<RegisterOptions<T, K>, 'setValueAs' | 'disabled' | 'valueAsNumber' | 'valueAsDate'>;


const combineDateTime = (d: Dayjs | null, t: Dayjs | null): Dayjs | null => {
  if (!d) return null;
  if (!t) return d.startOf('day');
  return d.hour(t.hour()).minute(t.minute()).second(t.second()).millisecond(0);
};

type Messages = {
  requiredDate?: string;
  requiredTime?: string;
  inPast?: string;
};

type Options<
  T extends FieldValues,
  SD extends FieldPath<T>,
  ST extends FieldPath<T>
> = {
  
  startDateName: SD;
  startTimeName: ST;
  enabled: boolean;
  requireStart: boolean;
  messages?: Messages;
  graceMs?: number;
};

export function useNotPastValidation<
  T extends FieldValues,
  SD extends FieldPath<T>,
  ST extends FieldPath<T>
>(opts: Options<T, SD, ST>) {
  const { getValues, trigger, watch } = useFormContext<T>();

  const enabledNow = !!opts.enabled;
  const requireStartNow = !!opts.requireStart;
  const grace = Math.max(0, opts.graceMs ?? 0);

  const msgs: Required<Messages> = {
    requiredDate: 'La fecha de publicación es obligatoria',
    requiredTime: 'La hora de publicación es obligatoria',
    inPast: 'La publicación no puede ser anterior al momento actual',
    ...(opts.messages ?? {}),
  };

  const dateRules: ControllerRules<T, SD> = useMemo(() => ({
    required: requireStartNow ? msgs.requiredDate : false,
    validate: (dateFromVal: Dayjs | null) => {
      if (!enabledNow) return true;
      const v = getValues();
      const start = combineDateTime(
        dateFromVal,
        v[opts.startTimeName] as unknown as Dayjs | null
      );
      if (!start) return true; 
      const now = dayjs();
      return start.valueOf() + grace < now.valueOf() ? msgs.inPast : true;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [enabledNow, requireStartNow, msgs.requiredDate, msgs.inPast, getValues, opts.startTimeName, grace]);

  const timeRules: ControllerRules<T, ST> = useMemo(() => ({
    required: requireStartNow ? msgs.requiredTime : false,
    validate: (timeFromVal: Dayjs | null) => {
      if (!enabledNow) return true;
      const v = getValues();
      const start = combineDateTime(
        v[opts.startDateName] as unknown as Dayjs | null,
        timeFromVal
      );
      if (!start) return true;
      const now = dayjs();
      return start.valueOf() + grace < now.valueOf() ? msgs.inPast : true;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [enabledNow, requireStartNow, msgs.requiredTime, msgs.inPast, getValues, opts.startDateName, grace]);


  const wrapStartDateOnChange = (orig: (v: Dayjs | null) => void) => (v: Dayjs | null) => {
    orig(v);
    void trigger(opts.startTimeName);
  };
  const wrapStartTimeOnChange = (orig: (v: Dayjs | null) => void) => (v: Dayjs | null) => {
    orig(v);
    void trigger(opts.startDateName);
  };


  const startDate = watch(opts.startDateName);
  const startTime = watch(opts.startTimeName);
  
  useEffect(() => {
    if (enabledNow) void trigger([opts.startDateName, opts.startTimeName]);
  }, [startDate, startTime, enabledNow, trigger, opts.startDateName, opts.startTimeName]);

  return { dateRules, timeRules, wrapStartDateOnChange, wrapStartTimeOnChange };
}
