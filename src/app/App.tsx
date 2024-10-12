import { useSyncLogAction } from "$hooks/useSyncLogAction";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/th";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { BROWSER_ROUTES } from "./routes";
import { theme } from "./theme";

export const App = () => {
  const syncAction = useSyncLogAction();
  useEffect(() => {
    syncAction();
  }, []);
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="th"
    >
      <ToastContainer
        icon={false}
        autoClose={2750}
        position="bottom-left"
        pauseOnFocusLoss={false}
      />
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <RouterProvider router={BROWSER_ROUTES} />
      </ThemeProvider>
    </LocalizationProvider>
  );
};
