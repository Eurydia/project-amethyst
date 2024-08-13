import {
	createTheme,
	CssBaseline,
	responsiveFontSizes,
	ThemeProvider,
} from "@mui/material";
import { thTH } from "@mui/material/locale";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/th";
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import { DailyRecordDraftPage } from "./pages/DailyRecordDraftPage";
import { DriverPage } from "./pages/DriverPage/DriverPage";
import { driverPageLoader } from "./pages/DriverPage/loader";
import { HomePage } from "./pages/HomePage";
import { PickupRouteIndexPage } from "./pages/PickupRouteIndexPage";
import { pickupRoutePageLoader } from "./pages/PickupRoutePage/loader";
import { PickupRoutePage } from "./pages/PickupRoutePage/PickupRoutePage";
import { vehiclePageLoader } from "./pages/VehiclePage/loader";
import { VehiclePage } from "./pages/VehiclePage/VehiclePage";
import { MainView } from "./views/MainView";

let theme = createTheme(
	{
		palette: {
			mode: "light",
		},
	},
	thTH,
);
theme = responsiveFontSizes(theme);

const routes = createBrowserRouter([
	{
		path: "/",
		element: <MainView />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: "สายรถ",
				children: [
					{
						index: true,
						element: <PickupRouteIndexPage />,
					},
					{
						path: ":routeId",
						element: <PickupRoutePage />,
						loader: pickupRoutePageLoader,
					},
				],
			},
			{
				path: "บันทึกประจำวัน",

				children: [
					{
						index: true,
						element: null,
					},
					{
						path: "แบบร่าง",
						element: <DailyRecordDraftPage />,
					},
					{
						path: ":dailyRecordId",
						element: null,
					},
					{
						path: ":dailyRecordId/แก้ไข",
						element: null,
					},
				],
			},
			{
				path: "ทะเบียนรถ",
				children: [
					{
						index: true,
						element: null,
					},
					{
						path: ":vehicleId",
						element: <VehiclePage />,
						loader: vehiclePageLoader,
					},
				],
			},
			{
				path: "คนขับ",
				children: [
					{
						index: true,
						element: null,
					},
					{
						path: ":driverId",
						element: <DriverPage />,
						loader: driverPageLoader,
					},
				],
			},
		],
	},
]);

export const App = () => {
	return (
		<LocalizationProvider
			dateAdapter={AdapterDayjs}
			adapterLocale="th"
		>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<RouterProvider router={routes} />
			</ThemeProvider>
		</LocalizationProvider>
	);
};
