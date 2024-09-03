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
import {
	ReportMedicalPage,
	reportMedicalPageLoader,
} from "./ReportMedicalPage";

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
		{
			path: "report/general",
			element: <ReportGeneralPage />,
			loader: reportGeneralPageLoader,
		},
		{
			path: "report/medical",
			element: <ReportMedicalPage />,
			loader: reportMedicalPageLoader,
		},
		{
			path: "log/operational",
			element: <LogOperationalPage />,
			loader: logOperationalPageLoader,
		},
	],
};
