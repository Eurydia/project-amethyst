import {
	createTheme,
	responsiveFontSizes,
} from "@mui/material";
import {
	amber,
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
			},
			MuiTextField: {
				defaultProps: {
					autoComplete: "off",
				},
			},
		},
	},
	thTH,
);
theme = responsiveFontSizes(theme);

export { theme };
