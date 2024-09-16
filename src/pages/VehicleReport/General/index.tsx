import { RouteObject } from "react-router-dom";
import { IndexPage, indexPageLoader } from "./IndexPage";
import {
  InfoEditPage,
  infoEditPageLoader,
} from "./InfoEditPage";
import { InfoPage, infoPageLoader } from "./InfoPage";
import { NewPage, newPageLoader } from "./NewPage";

export const VEHICLE_REPORT_GENERAL_ROUTES: RouteObject = {
  path: "vehicles/report/general",
  children: [
    {
      index: true,
      element: <IndexPage />,
      loader: indexPageLoader, // OK
    },
    {
      path: "new",
      element: <NewPage />,
      loader: newPageLoader, // OK
    },
    {
      path: "info/:reportId",
      element: <InfoPage />,
      loader: infoPageLoader, // OK
    },
    {
      path: "info/:reportId/edit",
      element: <InfoEditPage />,
      loader: infoEditPageLoader, // OK
    },
  ],
};
