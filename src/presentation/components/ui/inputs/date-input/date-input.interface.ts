import type { DatePickerProps, DateView } from "@mui/x-date-pickers";
import type { FieldValues } from "react-hook-form";
import type { CustomControllerProps } from "../controller.interface";
import dayjs from "dayjs";
import type { TimePickerProps } from "@mui/x-date-pickers/TimePicker";


type PickerBaseProps = {
  size?: "small" | "medium" | "large";
  format?: string;
  views?: DateView[];
  label?: string;
  required?: boolean;
};

export type TTimePicker<
  T extends dayjs.Dayjs,
  TC extends FieldValues
> = TimePickerProps &
  CustomControllerProps<TC> & {
    size: "small" | "medium" | "large";
    format?: string;
    views?: DateView[];
    label?: string;
    required?: boolean;
  };

export type IDateInput<T extends dayjs.Dayjs, TC extends FieldValues> =
  DatePickerProps &
  CustomControllerProps<TC> &
  {
    size: 'small' | 'medium' | 'large',
    format?: string,
    views?: DateView[]
    label?: string,
    required?: boolean
  }