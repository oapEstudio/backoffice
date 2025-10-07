import { colors } from "../../../common/colors";
import { backofficetheme } from "../../../theme/backofficetheme";

export const styles = {
  primary: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 0.5,
    height: 36,
    width: "auto",
    fontSize: backofficetheme.typography.button,
    color: backofficetheme.palette.primary.contrastText,
    backgroundColor: backofficetheme.palette.primary.main,
    "&.Mui-disabled": {
      backgroundColor: backofficetheme.palette.grey[300],
    },
  },
  secondary: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 0.5,
    height: 36,
    color: backofficetheme.palette.primary.main,
    border: `solid 1px ${backofficetheme.palette.grey}`,
    backgroundColor: 'transparent',
    "&.Mui-disabled": {
      backgroundColor: backofficetheme.palette.grey[300],
    },
    "&:hover": {
      color: backofficetheme.palette.info.main,
    },
  },
  danger: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 0.5,
    height: 36,
    color: backofficetheme.palette.error.contrastText,
    border: `solid 1px ${backofficetheme.palette.grey}`,
    backgroundColor: "rgb(190,0,0)",
    "&.Mui-disabled": {
      backgroundColor: backofficetheme.palette.grey[300],
    },
    "&:hover": {
      color: backofficetheme.palette.error.contrastText,
      backgroundColor: "rgb(140,0,0)",
    },
  },
};