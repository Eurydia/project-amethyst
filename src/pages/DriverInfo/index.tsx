import { RouteObject } from "react-router-dom";
import { EditPage, editPageLoader } from "./EditPage";
import { IndexPage, indexPageLoader } from "./IndexPage";

export const DRIVER_INFO_ROUTES: RouteObject = {
  path: "drivers/info/:driverId",
  children: [
    {
      index: true,
      element: <IndexPage />,
      loader: indexPageLoader, // OK
    },
    {
      path: "edit",
      element: <EditPage />,
      loader: editPageLoader,
    },
  ],
};
