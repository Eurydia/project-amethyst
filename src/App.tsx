import {
	createTheme,
	CssBaseline,
	ThemeProvider,
} from "@mui/material";
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { MainView } from "./views/MainView";
import { PickupRoutePage } from "./pages/PickupRoutePage/PickupRoutePage";
import { pickupRoutePageLoader } from "./pages/PickupRoutePage/loader";
import { vehiclePageLoader } from "./pages/VehiclePage/loader";
import { VehiclePage } from "./pages/VehiclePage/VehiclePage";
import { DriverPage } from "./pages/DriverPage/DriverPage";
import { driverPageLoader } from "./pages/DriverPage/loader";

const theme = createTheme({
	palette: {
		mode: "light",
	},
});

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
				path: "pickup-route/:routeId",
				element: <PickupRoutePage />,
				loader: pickupRoutePageLoader,
			},
			{
				path: "vehicle/:vehicleId",
				element: <VehiclePage />,
				loader: vehiclePageLoader,
			},
			{
				path: "driver/:driverId",
				element: <DriverPage />,
				loader: driverPageLoader,
			},
		],
	},
]);

export const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<RouterProvider router={routes} />
		</ThemeProvider>
	);
};
