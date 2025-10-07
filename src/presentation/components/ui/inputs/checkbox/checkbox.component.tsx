import { FormControlLabel } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { Controller } from "react-hook-form";
import { styles } from "../styles";
import {Typography} from "@mui/material";
import type { ICustomCheckboxProps } from "./checkbox.interface";


export function CustomCheckboxInput(
  props: ICustomCheckboxProps
) {
  const { label, control, name, rules, disable } = props;

  return (
    <div>
      <Typography variant="body1">{props.description}</Typography>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { onChange, value, ...field },
          // fieldState: { error },
        }) => (
          <FormControlLabel
            control={
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  flexDirection: "column",
                }}
              >
                <Checkbox
                  disabled={disable}
                  {...field}
                  checked={value}
                  onChange={onChange}
                  sx={styles.checkbox}
                />
              </div>
            }
            label={label}
            sx={styles.label}
          />
        )}
      />
    </div>
  );
}
