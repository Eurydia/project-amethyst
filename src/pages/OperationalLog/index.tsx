import { RouteObject } from "react-router-dom";
import { IndexPage, indexPageLoader } from "./IndexPage";
import { NewPage, newPageLoader } from "./NewPage";

export const OPERATIONAL_LOG_ROUTES: RouteObject = {
  path: "operational-logs",
  children: [
    {
      index: true,
      element: <IndexPage />,
      loader: indexPageLoader,
    },
    {
      path: "new",
      element: <NewPage />,
      loader: newPageLoader, // OK
    },
  ],
};
