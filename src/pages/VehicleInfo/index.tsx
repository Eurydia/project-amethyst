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
	ReportGeneralPage,
	reportGeneralPageLoader,
} from "./ReportGeneralPage";
import {
	ReportInspectionPage,
	reportInspectionPageLoader,
} from "./ReportInspectionPage";

export const VEHICLE_INFO_ROUTES: RouteObject = {
	path: "vehicles/info/:vehicleId",
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
			path: "report/inspection",
			element: <ReportInspectionPage />,
			loader: reportInspectionPageLoader,
		},
	],
};
