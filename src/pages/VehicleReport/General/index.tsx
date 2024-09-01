import { RouteObject } from "react-router-dom";
import {
	IndexPage,
	indexPageLoader,
} from "./IndexPage";
import {
	NewPage,
	newPageLoader,
} from "./NewPage";
import {
	InfoPage,
	infoPageLoader,
} from "./InfoPage";
import {
	InfoEditPage,
	infoEditPageLoader,
} from "./InfoEditPage";

export const VEHICLE_REPORT_GENERAL_ROUTES: RouteObject =
	{
		path: "vehicles/report/general",
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
			{
				path: "info/:reportId",
				element: <InfoPage />,
				loader: infoPageLoader,
			},
			{
				path: "info/:reportId/edit",
				element: <InfoEditPage />,
				loader: infoEditPageLoader,
			},
		],
	};
