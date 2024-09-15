import { RouteObject } from "react-router-dom";
import { IndexPage, indexPageLoader } from "./IndexPage";
import { NewPage, newPageLoader } from "./NewPage";

export const PICKUP_ROUTE_ROUTES: RouteObject = {
  path: "pickup-routes",
  children: [
    {
      index: true,
      element: <IndexPage />,
      loader: indexPageLoader,
    },
    {
      path: "new",
      element: <NewPage />,
      loader: newPageLoader,
    },
  ],
};
