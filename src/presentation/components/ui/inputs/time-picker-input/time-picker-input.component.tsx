import { Dayjs } from "dayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { InputLabel } from "@mui/material";
import { styles } from "../styles";
import Required from "../../required/required.component";
import { Controller, type FieldValues } from "react-hook-form";
import type { TTimePicker } from "../date-input/date-input.interface";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function CustomTimePicker<
  T extends Dayjs,
  TC extends FieldValues
>(props: TTimePicker<T, TC>) {
  const {
    name,
    control,
    rules,
    size,
    format = "HH:mm",
    views = ["hours", "minutes"],
    label,
    required,
    ...rest
  } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <InputLabel sx={styles.label}>
        {label}
        {required && <Required value="*" />}
      </InputLabel>
      {name && control ? (
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({
            field: { value, onChange, ...field },
            fieldState: { error },
          }) => {
            return (
            <TimePicker
              ampm={false}
              sx={styles[size]}
              format={format}
              slotProps={{
                textField: {
                  sx: styles[size],
                  error: Boolean(error),
                  placeholder: 'Horario'
                },
              }}
              {...rest}
              {...field}
              onChange={(time) => {
                const hour =
                  time?.hour().toString().length === 1
                    ? `0${time?.hour()}`
                    : time?.hour().toString();
                const minute =
                  time?.minute().toString().length === 1
                    ? `0${time?.minute()}`
                    : time?.minute().toString();
                const second =
                  time?.second().toString().length === 1
                    ? `0${time?.second()}`
                    : time?.second().toString();
                const interviewTime = `${hour}:${minute}:${second}`;
                onChange(interviewTime);
              }}
            />
          )}}
        />
      ) : (
        <TimePicker
          ampm={false}
          sx={styles[size]}
          format={format}
          {...rest}
        />
      )}
    </LocalizationProvider>
  );
}
