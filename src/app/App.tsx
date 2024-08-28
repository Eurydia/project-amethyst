import {
	CssBaseline,
	ThemeProvider,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/th";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { theme } from "./theme";
import { ToastContainer } from "react-toastify";

export const App = () => {
	return (
		<LocalizationProvider
			dateAdapter={AdapterDayjs}
			adapterLocale="th"
		>
			<ToastContainer
				icon={false}
				autoClose={2750}
			/>
			<ThemeProvider theme={theme}>
				<CssBaseline enableColorScheme />
				<RouterProvider router={routes} />
			</ThemeProvider>
		</LocalizationProvider>
	);
};
