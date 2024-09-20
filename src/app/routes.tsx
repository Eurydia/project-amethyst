import {
  DriverIndexPage,
  driverIndexPageLoader,
} from "$pages/DriverIndexPage";
import {
  DriverInfoPage,
  driverInfoPageLoader,
} from "$pages/DriverInfoPage";
import {
  DriverReportGeneralIndexPage,
  driverReportGeneralIndexPageLoader,
} from "$pages/DriverReportGeneralIndexPage";
import {
  DriverReportGeneralInfoPage,
  driverReportGeneralInfoPageLoader,
} from "$pages/DriverReportGeneralInfoPage";
import {
  DriverReportMedicalIndexPage,
  driverReportMedicalIndexPageLoader,
} from "$pages/DriverReportMedicalIndexPage";
import { DriverReportMedicalInfoPage } from "$pages/DriverReportMedicalInfoPage/DriverReportMedicalInfoPage";
import { driverReportMedicalInfoPageLoader } from "$pages/DriverReportMedicalInfoPage/loader";
import { ErrorPage } from "$pages/ErrorPage";
import { HomePage, homePageLoader } from "$pages/HomePage";
import {
  OperationalLogIndexPage,
  operationalLogIndexPageLoader,
} from "$pages/OperationalLogIndexPage";
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

      {
        path: "operational-logs",
        element: <OperationalLogIndexPage />,
        loader: operationalLogIndexPageLoader,
      },

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
            element: <PickupRouteInfoPage />,
            loader: pickupRouteInfoPageLoader,
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
          {
            path: "info/:driverId",
            element: <DriverInfoPage />,
            loader: driverInfoPageLoader,
          },
          {
            path: "report/general",
            children: [
              {
                index: true,
                element: <DriverReportGeneralIndexPage />,
                loader: driverReportGeneralIndexPageLoader,
              },
              {
                path: "info/:reportId",
                element: <DriverReportGeneralInfoPage />,
                loader: driverReportGeneralInfoPageLoader,
              },
            ],
          },
          {
            path: "report/medical",
            children: [
              {
                index: true,
                element: <DriverReportMedicalIndexPage />,
                loader: driverReportMedicalIndexPageLoader,
              },
              {
                path: "info/:reportId",
                element: <DriverReportMedicalInfoPage />,
                loader: driverReportMedicalInfoPageLoader,
              },
            ],
          },
        ],
      },
    ],
  },
]);
