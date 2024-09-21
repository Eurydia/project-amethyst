import { getAttendanceLogToday } from "$backend/database/get/attendance-logs";
import { getDriver } from "$backend/database/get/drivers";
import { getOperationLogToday } from "$backend/database/get/operational-logs";
import { getPickupRoute } from "$backend/database/get/pickup-routes";
import { getVehicle } from "$backend/database/get/vehicles";
import { postAttendanceLog } from "$backend/database/post";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { BROWSER_ROUTES } from "./routes";
import { theme } from "./theme";

export const App = () => {
  useEffect(() => {
    let active = true;

    (async () => {
      const opLogs = await getOperationLogToday();
      const attLogs = await getAttendanceLogToday();
      if (active && attLogs.length === 0 && opLogs.length > 0) {
        const today = dayjs().startOf("day");
        const posts = opLogs.map(async (log) => {
          const route = await getPickupRoute(log.route_id);
          if (route === null) {
            return null;
          }

          const driver = await getDriver(log.driver_id);
          if (driver === null) {
            return null;
          }
          const vehicle = await getVehicle(log.vehicle_id);
          if (vehicle === null) {
            return null;
          }

          const expectedArrivalTime = dayjs(route.arrival_time, "HH:mm");
          const expectedDepartureTime = dayjs(route.departure_time, "HH:mm");

          const expectedArrivalDatetime = today
            .set("hour", expectedArrivalTime.hour())
            .set("minute", expectedArrivalTime.minute())
            .format();
          const expectedDepartureDatetime = today
            .set("hour", expectedDepartureTime.hour())
            .set("minute", expectedDepartureTime.minute())
            .format();

          return postAttendanceLog({
            actualArrivalDatetime: null,
            actualDepartureDatetime: null,
            expectedArrivalDatetime,
            expectedDepartureDatetime,

            route,
            vehicle,
            driver,
          });
        });
        await Promise.all(posts);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="th">
      <ToastContainer icon={false} autoClose={2750} />
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <RouterProvider router={BROWSER_ROUTES} />
      </ThemeProvider>
    </LocalizationProvider>
  );
};
