import { DailyRecordDraftPage } from "$pages/DailyRecordDraftPage";
import {
	DriverIndexPage,
	driverIndexPageLoader,
} from "$pages/DriverIndexPage";
import {
	DriverInfoPage,
	driverInfoPageLoader,
} from "$pages/DriverInfoPage";
import {
	DriverNewPage,
	driverNewPageLoader,
} from "$pages/DriverNewPage";
import {
	DriverReportGeneralNewPage,
	driverReportGeneralNewPageLoader,
} from "$pages/DriverReportGeneralNewPage";
import {
	DriverInfoReportGeneralPage,
	driverInfoReportGeneralPageLoader,
} from "$pages/DriverInfoReportGeneralPage";
import { HomePage } from "$pages/HomePage/HomePage";
import { homePageLoader } from "$pages/HomePage/loader";
import { PickupRouteDraftPage } from "$pages/PickupRouteDraftPage";
import { PickupRouteEditPage } from "$pages/PickupRouteEditPage";
import { PickupRouteIndexPage } from "$pages/PickupRouteIndexPage";
import { PickupRouteNewPage } from "$pages/PickupRouteNewPage";
import { pickupRoutePageLoader } from "$pages/PickupRoutePage/loader";
import { PickupRoutePage } from "$pages/PickupRoutePage/PickupRoutePage";
import { VehicleDraftPage } from "$pages/VehicleDraftPage";
import { vehiclePageLoader } from "$pages/VehiclePage/loader";
import { VehiclePage } from "$pages/VehiclePage/VehiclePage";
import { MainView } from "$views/MainView";
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
import { ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/inject-style";

let theme = createTheme(
	{
		palette: {
			mode: "light",
		},
	},
	thTH,
);
theme = responsiveFontSizes(theme);

injectStyle();

const routes = createBrowserRouter([
	{
		path: "/",
		element: <MainView />,
		children: [
			{
				index: true,
				element: <HomePage />,
				loader: homePageLoader,
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
						index: true, // List all drivers
						element: <DriverIndexPage />,
						loader: driverIndexPageLoader,
					},
					{
						path: "new", // Create new driver
						element: <DriverNewPage />,
						loader: driverNewPageLoader,
					},
					{
						path: "info/:driverId", // Show driver info
						element: <DriverInfoPage />,
						loader: driverInfoPageLoader,
					},
					{
						path: "info/:driverId/edit", // Edit driver info
						element: null,
					},
					{
						path: "info/:driverId/report", // Report driver
						element: (
							<DriverInfoReportGeneralPage />
						),
						loader:
							driverInfoReportGeneralPageLoader,
					},
					{
						path: "info/:driverId/report-health", // Report driver health
						element: null,
					},
					{
						path: "report",
						children: [
							{
								path: "general",
								children: [
									{
										index: true, // List all general report
										element: null,
									},
									{
										path: "new", // Create new general report
										element: (
											<DriverReportGeneralNewPage />
										),
										loader:
											driverReportGeneralNewPageLoader,
									},
									{
										path: "info/:reportId", // Show general report
										element: null,
									},
									{
										path: "info/:reportId/edit", // Edit report
										element: null,
									},
								],
							},
							{
								path: "medical",
								children: [
									{
										index: true, // List all medical report
										element: null,
									},
									{
										path: "new", // Create new medical report
										element: null,
									},
									{
										path: "info/:reportId", // Show medical report
										element: null,
									},
									{
										path: "info/:reportId/edit", // Edit medical report
										element: null,
									},
								],
							},
						],
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
			<CssBaseline />
			<ToastContainer icon={false} />
			<ThemeProvider theme={theme}>
				<RouterProvider router={routes} />
			</ThemeProvider>
		</LocalizationProvider>
	);
};
