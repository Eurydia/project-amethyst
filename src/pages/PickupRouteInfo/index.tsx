import { RouteObject } from "react-router-dom";
import {
	EditPage,
	editPageLoader,
} from "./EditPage";
import {
	IndexPage,
	indexPageLoader,
} from "./IndexPage";
import {
	LogOperationalPage,
	logOperationalPageLoader,
} from "./LogOperationalPage";
import {
	ReportGeneralPage,
	reportGeneralPageLoader,
} from "./ReportGeneralPage";

export const PICKUP_ROUTE_INFO_ROUTES: RouteObject =
	{
		path: "pickup-routes/info/:routeId",
		children: [
			{
				index: true,
				element: <IndexPage />,
				loader: indexPageLoader,
			},
			{
				path: "edit",
				element: <EditPage />,
				loader: editPageLoader,
			},
			{
				path: "report/general",
				element: <ReportGeneralPage />,
				loader: reportGeneralPageLoader,
			},
			{
				path: "log/operational",
				element: <LogOperationalPage />,
				loader: logOperationalPageLoader,
			},
		],
	};
