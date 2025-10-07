import React from "react";
import { Controller, type FieldValues } from "react-hook-form";

import type { IMultiselect, SelectOption } from "./multiselect.interface";

import Checkbox from '@mui/material/Checkbox';
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import TextField from "@mui/material/TextField";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function CustomMultiselect<T extends FieldValues>(props: IMultiselect<T>) {
  const {
    size = 'large',
    options = [],
    placeholder,
    label,
    required,
    value,
    onChange,
    control,
    loading = false,
    name,
    rules,
    multiple = true,
    ...rest
  } = props;

  return  <Autocomplete
      multiple={multiple}
      id="checkboxes-custom-multiselect"
      options={options}
      disableCloseOnSelect
      value={value || []}  
      getOptionLabel={(option) => option.name as string}
      onChange={onChange}
      {...rest}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.name}
          </li>
        );
      }}
      style={{ width: '100%' }}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder="Seleccionar" />
      )}
    />
}

export default CustomMultiselect;
