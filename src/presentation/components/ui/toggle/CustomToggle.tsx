import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { CustomStack } from '../stack/Stack';
import InputLabel from '@mui/material/InputLabel';
import { styles } from '../inputs/styles';
import Required from '../required/required.component';
import type { SxProps, Theme } from '@mui/material/styles';

export interface ICustomToggleProps{
    label?: string;
    required?: boolean;
    sx?: SxProps<Theme>;
    options: {label: string, value: any}[];
    state: any;
    setState: (value: any)=> void;
}

export const CustomToggle: React.FC<ICustomToggleProps>=({label,options,state,setState,required,sx})=> {
  

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newOption: string,
  ) => {
    setState(newOption);
  };

  return (
   <CustomStack  direction='column' sx={{justifyContent: 'center'}}>
        <>
            {
                label && (
                    <InputLabel sx={styles.label}>
                    {label}
                    {required && <Required value="*" />}
                    </InputLabel>
                )
            }
        </>
        <ToggleButtonGroup
            color="primary"
            value={state}
            exclusive
            sx={sx}
            onChange={handleChange}
            aria-label="Platform"
            >
            
            {
                options && options.map(o=>(<ToggleButton value={o.value}>{o.label}</ToggleButton>))
            }
            </ToggleButtonGroup>
    </CustomStack>
  );
}
