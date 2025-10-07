import React from "react";
import {
  FormControl,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Typography,
} from "@mui/material";

interface ICustomSearchSelect {
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  options: { label: string; value: string }[];
  placeholder: string; 
}

const CustomSearchSelect: React.FC<ICustomSearchSelect> = ({
  value,
  onChange,
  options,
  placeholder, 
}) => {
  return (
      <FormControl variant="outlined" size="small" sx={{ width: "100%", maxWidth: "300px" }}>
        <Select
          value={value}
          onChange={onChange}
          displayEmpty
          renderValue={(selected) => {
            if (!selected) {
              return <Typography sx={{ color: "text.secondary" }}>{placeholder}</Typography>;
            }
            return options.find(option => option.value === selected)?.label || "";
          }}
        >
          <MenuItem value="">
            <Typography sx={{ color: "text.secondary" }}>{placeholder}</Typography>
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
};

export default CustomSearchSelect;