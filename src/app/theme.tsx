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
		},
		components: {
			MuiCssBaseline: {
				styleOverrides: (themeParam) => {
					return {
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
