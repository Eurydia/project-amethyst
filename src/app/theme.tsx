import {
	createTheme,
	responsiveFontSizes,
} from "@mui/material";
import { thTH } from "@mui/material/locale";

let theme = createTheme(
	{
		palette: {
			mode: "light",
		},
		typography: {
			fontSize: 18,
			fontFamily: "'Sarabun',sans-serif",
		},
		components: {
			MuiTypography: {
				defaultProps: {
					variantMapping: {
						body1: "span",
						body2: "span",
					},
				},
			},
			MuiCssBaseline: {
				styleOverrides: (themeParam) => {
					return {
						body: {
							scrollbarGutter: "stable",
						},
						a: {
							color:
								themeParam.palette.primary.main,
						},
					};
				},
			},
		},
	},
	thTH,
);
theme = responsiveFontSizes(theme);

export { theme };
