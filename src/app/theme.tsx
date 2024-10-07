import {
  createTheme,
  responsiveFontSizes,
} from "@mui/material";
import {
  amber,
  brown,
  indigo,
  purple,
} from "@mui/material/colors";
import { thTH } from "@mui/material/locale";

let theme = createTheme(
  {
    cssVariables: true,
    typography: {
      fontSize: 18,
      fontFamily: "'Sarabun', sans-serif",
    },
    palette: {
      background: {
        default: amber[50],
        paper: amber[50],
      },
      primary: indigo,
      secondary: purple,
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor:
              theme.palette.background.default,
          }),
        },
      },
      MuiTypography: {
        defaultProps: {
          sx: {
            width: "fit-content",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 0,
          },
          variantMapping: {
            body1: "span",
            body2: "span",
          },
        },
        styleOverrides: {
          root: { wordBreak: "break-all" },
          h1: {
            wordBreak: "keep-all",
            wordWrap: "normal",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            "::placeholder": {
              opacity: 0.7,
              fontStyle: "italic",
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          autoComplete: "off",
        },
      },
      MuiDialog: {
        defaultProps: {
          fullScreen: true,
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
          disableFocusRipple: true,
          disableTouchRipple: true,
        },
        styleOverrides: {
          root: {
            width: "fit-content",
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            opacity: 1,
            backgroundColor: brown[900],
          },
        },
      },
    },
  },
  thTH
);
theme = responsiveFontSizes(theme);

export { theme };
