import { DRIVER_ROUTES } from "$pages/Driver";
import { DRIVER_INFO_ROUTES } from "$pages/DriverInfo";
import { DRIVER_REPORT_GENERAL_ROUTES } from "$pages/DriverReport/General";
import { DRIVER_REPORT_MEDICAL_ROUTES } from "$pages/DriverReport/Medical";
import { HomePage } from "$pages/HomePage/HomePage";
import { homePageLoader } from "$pages/HomePage/loader";
import { PICKUP_ROUTE_ROUTES } from "$pages/PickupRoute";
import { PICKUP_ROUTE_INFO_ROUTES } from "$pages/PickupRouteInfo";
import { PICKUP_ROUTE_REPORT_GENERAL_ROUTES } from "$pages/PickupRouteReport/General";
import { vehiclePageLoader } from "$pages/VehiclePage/loader";
import { VehiclePage } from "$pages/VehiclePage/VehiclePage";
import { MainView } from "$views/MainView";
import {
	createBrowserRouter,
	RouteObject,
} from "react-router-dom";

const VEHICLE_INFO_ROUTES = {
	path: "info/:vehicleId",
	children: [
		{
			index: true,
			element: <VehiclePage />,
			loader: vehiclePageLoader,
		},
		{
			path: "edit",
			element: null,
		},
		{
			path: "report/general",
			element: null,
		},
		{
			path: "report/routine-maintenance",
			element: null,
		},
	],
};
const VEHICLE_REPORT_ROUTES: RouteObject = {
	path: "report",
	children: [
		{
			path: "general",
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
					path: "info/:reportId",
					element: null,
				},
				{
					path: "info/:reportId/edit",
				},
			],
		},
		{
			path: "routine-maintenance",
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
					path: "info/:reportId",
					element: null,
				},
				{
					path: "info/:reportId/edit",
				},
			],
		},
	],
};
const VEHICLE_ROUTES: RouteObject = {
	path: "vehicles",
	children: [
		{
			index: true,
		},
		{
			path: "general",
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
					path: "info/:reportId",
					element: null,
				},
				{
					path: "info/:reportId/edit",
				},
			],
		},
		{
			path: "new",
			element: null,
		},
		VEHICLE_INFO_ROUTES,
		VEHICLE_REPORT_ROUTES,
	],
};
export const routes = createBrowserRouter([
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
				path: "daily-records",
				children: [
					{
						index: true,
						element: null,
					},
					{
						path: "info/:recordId",
					},
					{
						path: "info/:recordId/edit",
					},
				],
			},
			{
				path: "operational",
				children: [
					{
						index: true,
						element: null,
					},
					{
						path: "new",
					},
				],
			},
			PICKUP_ROUTE_ROUTES,
			PICKUP_ROUTE_INFO_ROUTES,
			PICKUP_ROUTE_REPORT_GENERAL_ROUTES,
			VEHICLE_ROUTES,
			DRIVER_ROUTES,
			DRIVER_INFO_ROUTES,
			DRIVER_REPORT_MEDICAL_ROUTES,
			DRIVER_REPORT_GENERAL_ROUTES,
		],
	},
]);
