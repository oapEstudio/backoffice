import type { SxProps } from '@mui/system';
import type { Theme } from '@mui/material/styles';

const defaultStyles = {
  // '& .MuiOutlinedInput-root': {
    // height: '100%',
    // '& fieldset': {
    //   borderColor: baselightTheme.borderInputsOffFocus,
    // },
    // '&:hover fieldset': {
    //   color: baselightTheme.palette.contrastThreshold,
    // },
    // '&.Mui-focused fieldset': {
    //   borderColor: baselightTheme.borderInputFocus,
    // },
  // },
  // '& .MuiInputBase-input': {
  //   padding: "10px 14px",
  // },
  // '& .MuiInputBase-multiline': {
  //   padding: 0
  // }
}

export const styles: Record<string, SxProps<Theme>> = {
  small: {
    width: '100%',
    // height: 40,
    ...defaultStyles,
  },
  medium: {
    width: "100%",
    maxWidth: 1000,
    height: 45,
    ...defaultStyles,
  },
  large: {
    width: "100%",
    maxWidth: 1000,
    minWidth: 320,
    height: 45,
    ...defaultStyles,
  },
  label: {
    marginBottom: 1,
    fontWeight: 'bold'
  },
};