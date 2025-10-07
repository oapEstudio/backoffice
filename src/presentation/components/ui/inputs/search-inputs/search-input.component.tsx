import React from "react";

import { ClearIcon } from "@mui/x-date-pickers/icons";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import  Search  from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

export interface ISearchInput {
  value: string;
  onClick: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const CustomSearchInput = ({value, onClick, onChange, placeholder = 'Buscar'}: ISearchInput) => {
  return(
    <TextField
      variant="outlined"
      value={value}
      onChange={onChange}
      size="small"
      placeholder={placeholder}
      sx={{ flexGrow: 1 }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {value && (
              <IconButton onClick={onClick} size="small">
                <ClearIcon />
              </IconButton>
            )}
            <Search />
          </InputAdornment>
        ),
      }}
    />
  )
}