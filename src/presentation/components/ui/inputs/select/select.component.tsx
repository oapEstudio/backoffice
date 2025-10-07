import { Controller, type FieldValues } from "react-hook-form";
import type { ISelect } from "./select.interface";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { styles } from "../styles";
import Required from "../../required/required.component";
import type { Key } from "react";

function CustomSelect<T extends FieldValues>(props: ISelect<T>) {
  const {
    size = "small",
    options,
    placeholder,
    label,
    required,
    value,
    onChange,
    control,
    name,
    rules,
    ...rest
  } = props;

  return (
    <div>
      <InputLabel sx={styles.label}>
        {label}
        {required && <Required value="*" />}
      </InputLabel>
      {control && name ? (
        <FormControl sx={styles[size]}>
          <Controller
            control={control}
            name={name}
            rules={rules}
            render={({
              field: { value, onChange, ...field },
              fieldState: { error },
            }) => (
              <>
                <Select
                  sx={{
                    ...styles[size],
                    ...(!value && { color: "#00000060" }),
                  }}
                  renderValue={(selected: any) => {
                    const isArray = Array.isArray(selected);
                    const isEmpty =
                      (isArray && selected.length === 0) ||
                      (!isArray && (selected === '' || selected == null));
                    if (isEmpty) return <em>{placeholder}</em>;

                    if (isArray) return (selected as any[]).join(', ');

                    const match = options?.find(o => String((o as any).value) === String(selected));
                    return match?.label ?? String(selected ?? '');
                  }}
                  onChange={onChange}
                  displayEmpty
                  value={value || ""} 
                  error={!!error}
                  {...rest}
                  {...field}
                >
                  
                  {placeholder && (
                    <MenuItem disabled value="">
                      <em>{placeholder}</em>
                    </MenuItem>
                  )}
                  {options?.map((option) => (
                    <MenuItem
                      key={option.value as Key}
                      value={option.value as string | number | readonly string[] | undefined}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {error && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {error.message}
                  </FormHelperText>
                )}
              </>
            )}
          />
        </FormControl>
      ) : (
        <FormControl sx={styles[size]}>
          <Select
            sx={{
              ...styles[size],
              ...(!value && { color: '#00000060' }),
            }}
            displayEmpty
            value={value || ''}
            onChange={onChange}
            renderValue={(selected: any) => {
              const isArray = Array.isArray(selected);
              const isEmpty =
                (isArray && selected.length === 0) ||
                (!isArray && (selected === '' || selected == null));
              if (isEmpty) return <em>{placeholder}</em>;

              if (isArray) return (selected as any[]).join(', ');

              const match = options?.find(o => String((o as any).value) === String(selected));
              return match?.label ?? String(selected ?? '');
            }}
            {...rest}
          >
            {placeholder && (
              <MenuItem disabled value="">
                <em>{placeholder}</em>
              </MenuItem>
            )}
            {options.map((option) => (
              <MenuItem
                key={option.value as Key}
                value={option.value as string | number | readonly string[] | undefined}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
}

export default CustomSelect;
