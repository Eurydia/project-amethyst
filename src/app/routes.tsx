import { DailyRecordDraftPage } from "$pages/DailyRecordDraftPage";
import {
	DriverIndexPage,
	driverIndexPageLoader,
} from "$pages/DriverIndexPage";
import {
	DriverInfoEditPage,
	driverInfoEditPageLoader,
} from "$pages/DriverInfoEditPage";
import {
	DriverInfoPage,
	driverInfoPageLoader,
} from "$pages/DriverInfoPage";
import {
	DriverInfoReportGeneralPage,
	driverInfoReportGeneralPageLoader,
} from "$pages/DriverInfoReportGeneralPage";
import {
	DriverInfoReportMedicalPage,
	driverInfoReportMedicalPageLoader,
} from "$pages/DriverInfoReportMedicalPage";
import {
	DriverNewPage,
	driverNewPageLoader,
} from "$pages/DriverNewPage";
import { DriverReportGeneralIndexPage } from "$pages/DriverReportGeneralIndexPage";
import { driverReportGeneralIndexPageLoader } from "$pages/DriverReportGeneralIndexPage/loader";
import {
	DriverReportGeneralInfoEditPage,
	driverReportGeneralInfoEditPageLoader,
} from "$pages/DriverReportGeneralInfoEditPage";
import {
	DriverReportGeneralInfoPage,
	driverReportGeneralInfoPageLoader,
} from "$pages/DriverReportGeneralInfoPage";
import {
	DriverReportGeneralNewPage,
	driverReportGeneralNewPageLoader,
} from "$pages/DriverReportGeneralNewPage";
import {
	DriverReportMedicalIndexPage,
	DriverReportMedicalIndexPageLoaderData,
} from "$pages/DriverReportMedicalIndexPage";
import { DriverReportMedicalNewPage } from "$pages/DriverReportMedicalNewPage/DriverReportMedicalNewPage";
import { driverReportMedicalNewPageLoader } from "$pages/DriverReportMedicalNewPage/loader";
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
	createBrowserRouter,
	RouteObject,
} from "react-router-dom";

const DRIVER_REPORT_ROUTES: RouteObject = {
	path: "report",
	children: [
		{
			path: "general",
			children: [
				{
					index: true, // List all general report
					element: (
						<DriverReportGeneralIndexPage />
					),
					loader:
						driverReportGeneralIndexPageLoader,
				},
				{
					path: "new", // Create new general report
					element: <DriverReportGeneralNewPage />,
					loader:
						driverReportGeneralNewPageLoader,
				},
				{
					path: "info/:reportId", // Show medical report
					element: (
						<DriverReportGeneralInfoPage />
					),
					loader:
						driverReportGeneralInfoPageLoader,
				},
				{
					path: "info/:reportId/edit", // Edit report
					element: (
						<DriverReportGeneralInfoEditPage />
					),
					loader:
						driverReportGeneralInfoEditPageLoader,
				},
			],
		},
		{
			path: "medical",
			children: [
				{
					index: true, // List all medical report
					element: (
						<DriverReportMedicalIndexPage />
					),
					loader:
						DriverReportMedicalIndexPageLoaderData,
				},
				{
					path: "new", // Create new medical report
					element: <DriverReportMedicalNewPage />,
					loader:
						driverReportMedicalNewPageLoader,
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
};
const DRIVER_INFO_ROUTES = {
	path: "info/:driverId",
	children: [
		{
			index: true, // Show driver info
			element: <DriverInfoPage />,
			loader: driverInfoPageLoader,
		},
		{
			path: "edit", // Edit driver info
			element: <DriverInfoEditPage />,
			loader: driverInfoEditPageLoader,
		},
		{
			path: "report/general", // New general report for driver
			element: <DriverInfoReportGeneralPage />,
			loader: driverInfoReportGeneralPageLoader,
		},
		{
			path: "report/medical", // New medical report for driver
			element: <DriverInfoReportMedicalPage />,
			loader: driverInfoReportMedicalPageLoader,
		},
	],
};
const DRIVER_ROUTES: RouteObject = {
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
		DRIVER_INFO_ROUTES,
		DRIVER_REPORT_ROUTES,
	],
};

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
						path: "info/:routeId",
						element: <PickupRoutePage />,
						loader: pickupRoutePageLoader,
					},
					{
						path: "info/:routeId/edit",
						element: <PickupRouteEditPage />,
					},
				],
			},
			VEHICLE_ROUTES,
			DRIVER_ROUTES,
		],
	},
]);
