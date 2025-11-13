import React, { useState } from 'react'
import { MuiColorInput } from 'mui-color-input';
import { styles } from '../inputs/styles';
import InputLabel from '@mui/material/InputLabel';
import Required from '../required/required.component';
import { CustomStack } from '../stack/Stack';


interface ICustomColorPickerProps{
    handleChange: (newValue: string)=>void;
    init?: string;
    label?: string;
    required?: boolean
}
export const CustomColorPicker: React.FC<ICustomColorPickerProps> = ({
    handleChange,
    init = '#ffffff',
    label,
    required = false
}) => {
   
    const [value, setValue] = useState(init);

    const change = (newValue: string) => {
        setValue(newValue);
        handleChange(newValue);
    }

    return <CustomStack  direction='column'>
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
    
        <MuiColorInput format="hex" value={value} onChange={change} />
    </CustomStack>
}
