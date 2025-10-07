import { Controller, type FieldValues } from 'react-hook-form'

import type { IRadioButton } from './radio-button.interface'
import { styles } from '../styles'
import Required from '../../required/required.component'
import * as React from 'react'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'

interface CustomRadioButtonProps<T extends FieldValues> extends IRadioButton<T> {
  /** Dirección de las opciones: en fila o columna (default: 'column') */
  direction?: 'row' | 'column'
  radioGroupProps?: object
}

function CustomRadioButton<T extends FieldValues>(props: CustomRadioButtonProps<T>) {
  const {
    size = 'small',
    options = [],
    label,
    required,
    value,
    onChange,
    control,
    name,
    rules,
    radioGroupProps,
    direction = 'column',
    ...rest
  } = props

  // helpers para mantener el tipo original del value (string | number | boolean, etc.)
  const findByRaw = (raw: string) => options.find(o => String(o.value) === raw)?.value
  const stringValue = (val: any) => (val === undefined || val === null ? '' : String(val))

  const Group = ({
    value: current,
    onChange: change,
  }: {
    value: any
    onChange: (val: any) => void
  }) => (
    <RadioGroup
      row={direction === 'row'}
      value={stringValue(current)}
      onChange={(e) => {
        const raw = (e.target as HTMLInputElement).value
        const parsed = findByRaw(raw)
        change(parsed)
      }}
      {...radioGroupProps}
      {...rest}
    >
      {options.map(opt => (
        <FormControlLabel
          key={String(opt.value)}
          value={String(opt.value)}
          control={<Radio />}
          label={opt.label}
        />
      ))}
    </RadioGroup>
  )

  return (
    <div>
      {label && (
        <FormLabel sx={styles.label}>
          {label}
          {required && <Required value="*" />}
        </FormLabel>
      )}

      {control && name ? (
        <FormControl component="fieldset" sx={styles[size]}>
          <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { value, onChange, ...field } }) => (
              <Group value={value} onChange={onChange} {...field} />
            )}
          />
        </FormControl>
      ) : (
        <FormControl component="fieldset" sx={styles[size]}>
          <Group value={value} onChange={onChange as any} />
        </FormControl>
      )}
    </div>
  )
}

export default CustomRadioButton
