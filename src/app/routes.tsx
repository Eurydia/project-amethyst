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
import { createBrowserRouter } from "react-router-dom";

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
						element: <DriverInfoEditPage />,
						loader: driverInfoEditPageLoader,
					},
					{
						path: "info/:driverId/report/general", // New general report for driver
						element: (
							<DriverInfoReportGeneralPage />
						),
						loader:
							driverInfoReportGeneralPageLoader,
					},
					{
						path: "info/:driverId/report/medical", // New medical report for driver
						element: (
							<DriverInfoReportMedicalPage />
						),
						loader:
							driverInfoReportMedicalPageLoader,
					},
					{
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
										element: (
											<DriverReportGeneralNewPage />
										),
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
										element: (
											<DriverReportMedicalNewPage />
										),
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
					},
				],
			},
		],
	},
]);
