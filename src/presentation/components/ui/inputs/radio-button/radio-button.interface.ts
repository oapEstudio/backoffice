import type { FieldValues } from 'react-hook-form';
import type { RadioGroupProps } from '@mui/material';
import type { CustomControllerProps } from '../controller.interface';

export type RadioOption = {
  label: string | undefined, 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: string | number | boolean | null | undefined | any[];
}

export interface IRadioButton<T extends FieldValues> extends Omit<RadioGroupProps, 'name'>, CustomControllerProps<T> {
  size?: 'small' | 'medium' | 'large',
  label?: string;
  required?: boolean; 
  options: RadioOption[],
}