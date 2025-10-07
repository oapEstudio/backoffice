
import * as React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { InputLabel } from '@mui/material';
import Required from '../../required/required.component';
import type { Dayjs } from 'dayjs';
import { styles } from '../styles';

type Props = {
  label?: string;
  required?: boolean;
  size?: keyof typeof styles; 
  format?: string;
  views?: Array<'year'|'month'|'day'>;
  value: Dayjs | null;
  onChange: (v: Dayjs | null) => void;
  disabled?: boolean;
  error?: boolean;                    
  helperText?: React.ReactNode;
};

export default function CustomDateInput({
  label,
  required,
  size = 'small',
  format = 'DD/MM/YYYY',
  views,
  value,
  onChange,
  disabled,
  error, helperText,
  ...rest
}: Props) {
  return (
    <div>
      <InputLabel sx={styles.label}>
        {label}
        {required && <Required value="*" />}
      </InputLabel>
      <DatePicker
        value={value}                 
        onChange={onChange}           
        sx={styles[size]}
        format={format}
        views={views}
        disabled={disabled}
        slotProps={{
          textField: {
            sx: styles[size],
            error: Boolean(error),         
            helperText, 
          },
        }}
        {...rest}
      />
    </div>
  );
}
