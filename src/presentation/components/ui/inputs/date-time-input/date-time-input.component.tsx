import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { InputLabel } from '@mui/material';
import Required from '../../required/required.component';
import type { Dayjs } from 'dayjs';
import { styles } from '../styles';

type Props = {
  label?: string;
  required?: boolean;
  size?: keyof typeof styles;
  value: Dayjs | null;
  onChange: (v: Dayjs | null) => void;
  disabled?: boolean;
  error?: boolean;                     
  helperText?: React.ReactNode;  
};

export default function CustomTimePicker({
  label,
  required,
  size = 'small',
  value,
  onChange,
  disabled,
  error, helperText,
  ...rest
}: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <InputLabel sx={styles.label}>
          {label}
          {required && <Required value="*" />}
        </InputLabel>
        <TimePicker
          value={value}               
          onChange={onChange}         
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
    </LocalizationProvider>
  );
}
