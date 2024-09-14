import { DRIVER_ROUTES } from "$pages/Driver";
import { DRIVER_INFO_ROUTES } from "$pages/DriverInfo";
import { DRIVER_REPORT_GENERAL_ROUTES } from "$pages/DriverReport/General";
import { DRIVER_REPORT_MEDICAL_ROUTES } from "$pages/DriverReport/Medical";
import { ErrorPage } from "$pages/ErrorPage";
import { HomePage, homePageLoader } from "$pages/HomePage";
import { OPERATIONAL_LOG_ROUTES } from "$pages/OperationalLog";
import { PICKUP_ROUTE_ROUTES } from "$pages/PickupRoute";
import { PICKUP_ROUTE_INFO_ROUTES } from "$pages/PickupRouteInfo";
import { PICKUP_ROUTE_REPORT_GENERAL_ROUTES } from "$pages/PickupRouteReport/General";
import { VEHICLE_ROUTES } from "$pages/Vehicle";
import { VEHICLE_INFO_ROUTES } from "$pages/VehicleInfo";
import { VEHICLE_REPORT_GENERAL_ROUTES } from "$pages/VehicleReport/General";
import { VEHICLE_REPORT_INSPECTION_ROUTES } from "$pages/VehicleReport/Inspection";
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

      PICKUP_ROUTE_ROUTES,
      PICKUP_ROUTE_INFO_ROUTES,
      PICKUP_ROUTE_REPORT_GENERAL_ROUTES,

      VEHICLE_ROUTES,
      VEHICLE_INFO_ROUTES,
      VEHICLE_REPORT_GENERAL_ROUTES,
      VEHICLE_REPORT_INSPECTION_ROUTES,

      DRIVER_ROUTES,
      DRIVER_INFO_ROUTES,
      DRIVER_REPORT_MEDICAL_ROUTES,
      DRIVER_REPORT_GENERAL_ROUTES,
    ],
  },
]);
