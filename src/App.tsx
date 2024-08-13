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
import { DriverDraftPage } from "./pages/DriverDraftPage";

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
				path: "pickup-routes",
				children: [
					{
						index: true,
						element: <PickupRouteIndexPage />,
					},
					{
						path: "draft",
						element: null,
					},
					{
						path: ":routeId",
						element: <PickupRoutePage />,
						loader: pickupRoutePageLoader,
					},
				],
			},
			{
				path: "daily-records",

				children: [
					{
						index: true,
						element: null,
					},
					{
						path: "draft",
						element: <DailyRecordDraftPage />,
					},
					{
						path: ":dailyRecordId",
						element: null,
					},
					{
						path: ":dailyRecordId/edit",
						element: null,
					},
				],
			},
			{
				path: "vehicles",
				children: [
					{
						index: true,
						element: null,
					},
					{
						path: "draft",
						element: <DriverDraftPage />,
					},
					{
						path: ":vehicleId",
						element: <VehiclePage />,
						loader: vehiclePageLoader,
					},
				],
			},
			{
				path: "drivers",
				children: [
					{
						index: true,
						element: null,
					},
					{
						path: "draft",
						element: <DriverDraftPage />,
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
