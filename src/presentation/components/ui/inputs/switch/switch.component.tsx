import { FormControlLabel, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import type { ICustomSwitchProps } from "./switch.interface";
import { IOSSwitch } from "./ios-switch.component";

export function CustomSwitchContainer(
  props: ICustomSwitchProps
) {
  const { control, name, rules } = props;

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center', flexDirection: 'column' }}>
      <Typography variant="body1" style={{ marginRight: '8px' }}>
        {props.description}
      </Typography>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value, ...field }}) => {
          return (
          <FormControlLabel
            control={
              <IOSSwitch
                {...field}
                checked={value ? value : false}
                onChange={onChange}
              />
            }
            label={value === false ? 'Inactiva' : 'Activa'}
          />
        )}}
      />
    </div>
  );
}