import {
  DriverIndexPage,
  driverIndexPageLoader,
} from "$pages/DriverIndexPage";
import { ErrorPage } from "$pages/ErrorPage";
import { HomePage, homePageLoader } from "$pages/HomePage";
import { OPERATIONAL_LOG_ROUTES } from "$pages/OperationalLog";
import {
  PickupRouteIndexPage,
  pickupRouteIndexPageLoader,
} from "$pages/PickupRouteIndexPage";
import {
  PickupRouteInfoPage,
  pickupRouteInfoPageLoader,
} from "$pages/PickupRouteInfoPage";
import {
  PickupRouteReportGeneralIndexPage,
  pickupRouteReportGeneralIndexPageLoader,
} from "$pages/PickupRouteReportGeneralIndexPage";
import {
  PickupRouteReportGeneralInfoPage,
  pickupRouteReportGeneralInfoPageLoader,
} from "$pages/PickupRouteReportGeneralInfoPage";
import {
  VehicleIndexPage,
  vehicleIndexPageLoader,
} from "$pages/VehicleIndexPage";
import {
  VehicleInfoPage,
  vehicleInfoPageLoader,
} from "$pages/VehicleInfoPage";
import {
  VehicleReportGeneralIndexPage,
  vehicleReportGeneralIndexPageLoader,
} from "$pages/VehicleReportGeneralIndexPage";
import {
  VehicleReportGeneralInfoPage,
  vehicleReportGeneralInfoPageLoader,
} from "$pages/VehicleReportGeneralInfoPage";
import {
  VehicleReportInspectionIndexPage,
  vehicleReportInspectionIndexPageLoader,
} from "$pages/VehicleReportInspectionIndexPage";
import {
  VehicleReportInspectionInfoPage,
  vehicleReportInspectionInfoPageLoader,
} from "$pages/VehicleReportInspectionInfoPage";
import { MainView } from "$views/MainView";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainView />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homePageLoader,
      },

      ///////////////////////
      OPERATIONAL_LOG_ROUTES,

      {
        path: "pickup-routes",
        children: [
          {
            index: true,
            element: <PickupRouteIndexPage />,
            loader: pickupRouteIndexPageLoader,
          },
          {
            path: "info/:routeId",
            loader: pickupRouteInfoPageLoader,
            element: <PickupRouteInfoPage />,
          },
          {
            path: "report/general",
            children: [
              {
                index: true,
                element: (
                  <PickupRouteReportGeneralIndexPage />
                ),
                loader:
                  pickupRouteReportGeneralIndexPageLoader,
              },
              {
                path: "info/:reportId",
                element: (
                  <PickupRouteReportGeneralInfoPage />
                ),
                loader:
                  pickupRouteReportGeneralInfoPageLoader,
              },
            ],
          },
        ],
      },
      {
        path: "vehicles",
        children: [
          {
            index: true,
            element: <VehicleIndexPage />,
            loader: vehicleIndexPageLoader,
          },
          {
            path: "info/:vehicleId",
            element: <VehicleInfoPage />,
            loader: vehicleInfoPageLoader,
          },
          {
            path: "report/general",
            children: [
              {
                index: true,
                element: <VehicleReportGeneralIndexPage />,
                loader: vehicleReportGeneralIndexPageLoader,
              },
              {
                path: "info/:reportId",
                element: <VehicleReportGeneralInfoPage />,
                loader: vehicleReportGeneralInfoPageLoader,
              },
            ],
          },
          {
            path: "report/inspection",
            children: [
              {
                index: true,
                element: (
                  <VehicleReportInspectionIndexPage />
                ),
                loader:
                  vehicleReportInspectionIndexPageLoader,
              },
              {
                path: "info/:reportId",
                element: (
                  <VehicleReportInspectionInfoPage />
                ),
                loader:
                  vehicleReportInspectionInfoPageLoader,
              },
            ],
          },
        ],
      },

      {
        path: "drivers",
        children: [
          {
            index: true,
            element: <DriverIndexPage />,
            loader: driverIndexPageLoader,
          },
        ],
      },
      // DRIVER_INFO_ROUTES,
      // DRIVER_REPORT_MEDICAL_ROUTES,
      // DRIVER_REPORT_GENERAL_ROUTES,
    ],
  },
]);
