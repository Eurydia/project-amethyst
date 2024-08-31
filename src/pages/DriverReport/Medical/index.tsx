import { RouteObject } from "react-router-dom";
import {
	NewPage,
	newPageLoader,
} from "./NewPage";
import {
	IndexPage,
	indexPageLoader,
} from "./IndexPage";
import {
	InfoPage,
	infoPageLoader,
} from "./InfoPage";
import {
	InfoEditPage,
	infoEditPageLoader,
} from "./InfoEditPage";

export const DRIVER_REPORT_MEDICAL_ROUTES: RouteObject =
	{
		path: "drivers/report/medical",
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
