import type { SxProps } from "@mui/material/styles";
import { baselightTheme } from "../../../theme/baselightheme";

interface styles {
  [key: string]: SxProps;
}

export const styles: styles = {
  primary: {
    px: "4px",
    color: baselightTheme.palette.primary.contrastText,
    backgroundColor: baselightTheme.palette.primary.main,
  },
  secondary: {
    px: "4px",
    color: baselightTheme.palette.secondary.contrastText,
    backgroundColor: baselightTheme.palette.secondary.main,
  },
  success: {
    px: "4px",
    color: baselightTheme.palette.success.contrastText,
    backgroundColor: baselightTheme.palette.success.main,
  },
  error: {
    px: "4px",
    color: baselightTheme.palette.error.contrastText,
    backgroundColor: baselightTheme.palette.error.main,
  },
  info: {
    px: "4px",
    color: baselightTheme.palette.info.contrastText,
    backgroundColor: baselightTheme.palette.info.main,
  },
  warning: {
    px: "4px",
    color: baselightTheme.palette.warning.contrastText,
    backgroundColor: baselightTheme.palette.warning.main,
  },
};

export default styles;