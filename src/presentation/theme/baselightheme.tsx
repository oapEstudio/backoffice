import { createTheme } from "@mui/material/styles";
import { colors } from "../common/colors";
import { sizes } from "../common/sizes";
import fonts from "../common/fonts";

const baselightTheme = createTheme({
  direction: "ltr",

  palette: {
    background: {
      default: colors.white, // Primary / lightMode
    },
    primary: {
      // SideMenu
      main: colors.palette.primary.main,
      light: colors.palette.primary.light,
      dark: colors.palette.primary.dark,
      contrastText: colors.white,
    },
    secondary: {
      main: colors.palette.secondary.main,
      light: colors.palette.secondary.light,
      dark: colors.palette.secondary.dark,
    },
    success: {
      main: colors.green100,
      light: colors.green200,
      dark: colors.darkGreen,
      contrastText: colors.white,
    },
    info: {
      main: colors.blue200,
      light: colors.blue100,
      dark: colors.darkBlue,
      contrastText: colors.white,
    },
    error: {
      main: colors.paleRed, // 200
      light: colors.red100, // 100
      dark: colors.danger, // 300
      contrastText: colors.white,
    },
    warning: {
      main: colors.yellow100, // 100
      light: colors.paleYellow, // pale
      dark: colors.darkYellow, // dark
      contrastText: colors.white,
    },
    grey: {
      100: colors.grey100,
      200: colors.grey200,
      300: colors.grey300,
      400: colors.grey400,
      500: colors.grey500,
      600: colors.grey600,
    },
    text: {
      primary: colors.grey600,
      secondary: colors.grey500,
    },
    action: {
      disabledBackground: colors.action.disableBackground,
      hoverOpacity: sizes.hover.opacity,
      hover: colors.action.hover,
    },
    divider: colors.divider,
  },
  typography: {
    fontFamily: fonts.plusJackartaSans,
    h1: {
      fontWeight: sizes.fonts.weight.headers,
      fontSize: sizes.fonts.size.h1,
      lineHeight: sizes.line.height.h1,
      fontFamily: fonts.plusJackartaSans,
    },
    h2: {
      fontWeight: sizes.fonts.weight.headers,
      fontSize: sizes.fonts.size.h2,
      lineHeight: sizes.line.height.h2,
      fontFamily: fonts.plusJackartaSans,
    },
    h3: {
      fontWeight: sizes.fonts.weight.headers,
      fontSize: sizes.fonts.size.h3,
      lineHeight: sizes.line.height.h3,
      fontFamily: fonts.plusJackartaSans,
    },
    h4: {
      fontWeight: sizes.fonts.weight.headers,
      fontSize: sizes.fonts.size.h4,
      lineHeight: sizes.line.height.h4,
    },
    h5: {
      fontWeight: sizes.fonts.weight.headers,
      fontSize: sizes.fonts.size.h5,
      lineHeight: sizes.line.height.h5,
    },
    h6: {
      fontWeight: sizes.fonts.weight.headers,
      fontSize: sizes.fonts.size.h6,
      lineHeight: sizes.line.height.h6,
    },
    button: {
      textTransform: "capitalize",
      fontWeight: sizes.fonts.weight.button,
    },
    body1: {
      fontSize: sizes.fonts.size.body1,
      fontWeight: sizes.fonts.weight.body,
      lineHeight: sizes.line.height.body1,
    },
    body2: {
      fontSize: sizes.fonts.size.body2,
      letterSpacing: sizes.letter.spacing.body2,
      fontWeight: sizes.fonts.weight.body,
      lineHeight: sizes.line.height.body2,
    },
    subtitle1: {
      fontSize: sizes.fonts.size.subtitle1,
      fontWeight: sizes.fonts.weight.subtitle,
    },
    subtitle2: {
      fontSize: sizes.fonts.size.subtitle1,
      fontWeight: sizes.fonts.weight.subtitle,
    },
  },
  components: {   
    MuiCssBaseline: {
      styleOverrides: {
        ".MuiPaper-elevation9, .MuiPopover-root .MuiPaper-elevation": {
          boxShadow: sizes.boxShaddowOverride,
        },
        "&::-webkit-scrollbar": {
          width: 6,
          backgroundColor: colors.white,
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: colors.grey100,
        },
        "&::-webkit-scrollbar-thumb": {
          height: 5,
          width: 2,
          borderRadius: 20,
          backgroundColor: colors.grey300,
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: colors.grey400,
        },
        "&::-webkit-scrollbar-thumb:active": {
          backgroundColor: colors.grey500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: sizes.borders.radius.root,
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    },
    MuiTable:{
      styleOverrides:{
        root:{
          backgroundColor: '#ffeb3b'
        }
      }
    },
  },
});

export { baselightTheme };