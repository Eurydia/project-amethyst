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
import { VehicleDraftPage } from "./pages/VehicleDraftPage";
import { PickupRouteDraftPage } from "./pages/PickupRouteDraftPage";
import { PickupRouteNewPage } from "./pages/PickupRouteNewPage";
import { PickupRouteEditPage } from "./pages/PickupRouteEditPage";

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
				path: "records",
				children: [
					{
						index: true,
						element: null,
					},
					{
						path: "general",
						children: [
							{
								path: "draft",
								element: <DailyRecordDraftPage />,
							},
							{
								path: "id/:id",
								element: null,
							},
							{
								path: "id/:id/edit",
								element: null,
							},
						],
					},
					{
						path: "driver",
						children: [
							{
								path: "draft",
								element: <DriverDraftPage />,
							},
							{
								path: "id/:dailyRecordId",
								element: null,
							},
							{
								path: "id/:dailyRecordId/edit",
								element: null,
							},
						],
					},
					{
						path: "vehicle",
						children: [
							{
								path: "draft",
								element: <VehicleDraftPage />,
							},
							{
								path: "id/:id",
								element: null,
							},
							{
								path: "id/:id/edit",
								element: null,
							},
						],
					},
					{
						path: "pickup-route",
						children: [
							{
								path: "draft",
								element: <PickupRouteDraftPage />,
							},
							{
								path: "id/:recordId",
								element: null,
							},
							{
								path: "id/:recordId/edit",
								element: null,
							},
						],
					},
				],
			},
			{
				path: "pickup-routes",
				children: [
					{
						index: true,
						element: <PickupRouteIndexPage />,
					},
					{
						path: "new",
						element: <PickupRouteNewPage />,
					},
					{
						path: "id/:routeId",
						element: <PickupRoutePage />,
						loader: pickupRoutePageLoader,
					},
					{
						path: "id/:routeId/edit",
						element: <PickupRouteEditPage />,
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
						path: "new",
						element: null,
					},
					{
						path: "id/:vehicleId",
						element: <VehiclePage />,
						loader: vehiclePageLoader,
					},
					{
						path: "id/:vehicleId/edit",
						element: null,
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
						path: "new",
						element: null,
					},
					{
						path: "id/:driverId",
						element: <DriverPage />,
						loader: driverPageLoader,
					},
					{
						path: "id/:driverId/edit",
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
