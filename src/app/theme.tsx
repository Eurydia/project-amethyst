import {
	createTheme,
	responsiveFontSizes,
} from "@mui/material";
import { thTH } from "@mui/material/locale";

let theme = createTheme(
	{
		cssVariables: true,
		typography: {
			fontSize: 18,
			fontFamily: "'Sarabun',sans-serif",
		},
		components: {
			MuiTypography: {
				defaultProps: {
					sx: {
						width: "auto",
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
