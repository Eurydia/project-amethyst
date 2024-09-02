import { DRIVER_ROUTES } from "$pages/Driver";
import { DRIVER_INFO_ROUTES } from "$pages/DriverInfo";
import { DRIVER_REPORT_GENERAL_ROUTES } from "$pages/DriverReport/General";
import { DRIVER_REPORT_MEDICAL_ROUTES } from "$pages/DriverReport/Medical";
import { HomePage } from "$pages/HomePage/HomePage";
import { homePageLoader } from "$pages/HomePage/loader";
import { PICKUP_ROUTE_ROUTES } from "$pages/PickupRoute";
import { MainView } from "$views/MainView";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
	// {
	// 	path: "images/:image",
	// 	element: <Image />,
	// 	loader: ({ params }) => {
	// 		return params;
	// 	},
	// },
	{
		path: "/",
		element: <MainView />,
		children: [
			{
				index: true,
				element: <HomePage />,
				loader: homePageLoader,
			},

			PICKUP_ROUTE_ROUTES,
			// PICKUP_ROUTE_INFO_ROUTES,
			// PICKUP_ROUTE_REPORT_GENERAL_ROUTES,
			// VEHICLE_ROUTES,
			// VEHICLE_INFO_ROUTES,
			// VEHICLE_REPORT_GENERAL_ROUTES,
			// VEHICLE_REPORT_INSPECTION_ROUTES,
			DRIVER_ROUTES,
			DRIVER_INFO_ROUTES,
			DRIVER_REPORT_MEDICAL_ROUTES,
			DRIVER_REPORT_GENERAL_ROUTES,
		],
	},
]);
