import { styles } from '../styles';
import type { ITextAreaInput } from './text-area-input.interface';
import type { FieldValues } from 'react-hook-form';
import CustomTextInput from '../text-input/text-input.component';

export default function CustomTextAreaInput<T extends FieldValues>({
  size = 'small',
  rows,
  minRows = 3,
  maxRows = 5,
  value,
  required,
  onChange,
  ...rest
}: ITextAreaInput<T>) {
  return (
    <CustomTextInput
      multiline
      rows={rows}
      minRows={minRows}
      maxRows={maxRows}
      sx={{ ...styles[size], height: 'auto' }}
      value={value}
      required={required}
      onChange={onChange}
      {...rest}
    />
  );
}