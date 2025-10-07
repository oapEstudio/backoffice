import { baselightTheme } from "../../../../theme/baselightheme";

export const styles = {
  primary: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 0.5,
    height: 36,
    width: "auto",
    fontSize: baselightTheme.typography.button,
    color: baselightTheme.palette.primary.contrastText,
    backgroundColor: baselightTheme.palette.primary.main,
    "&.Mui-disabled": {
      backgroundColor: baselightTheme.palette.grey[300],
    },
  },
  secondary: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 0.5,
    height: 36,
    color: baselightTheme.palette.secondary.contrastText,
    border: `solid 1px ${baselightTheme.palette.grey}`,
    backgroundColor: baselightTheme.palette.secondary.light,
    "&.Mui-disabled": {
      backgroundColor: baselightTheme.palette.grey[300],
    },
    hover: {
      color: "white",
    },
  },
  danger: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 0.5,
    height: 36,
    color: baselightTheme.palette.error.contrastText,
    border: `solid 1px ${baselightTheme.palette.grey}`,
    backgroundColor: baselightTheme.palette.error.dark,
    "&.Mui-disabled": {
      backgroundColor: baselightTheme.palette.grey[300],
    },
  },
};
