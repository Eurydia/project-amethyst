import { PageView } from "$views/PageView";
import { RouteObject } from "react-router-dom";
import { IndexPage, indexPageLoader } from "./IndexPage";
import { NewPage, newPageLoader } from "./NewPage";

export const DRIVER_ROUTES: RouteObject = {
  path: "drivers",
  element: <PageView />,
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
