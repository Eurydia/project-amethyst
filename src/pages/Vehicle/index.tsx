import { RouteObject } from "react-router-dom";
import {
	IndexPage,
	indexPageLoader,
} from "./IndexPage";
import {
	NewPage,
	newPageLoader,
} from "./NewPage";

export const VEHICLE_ROUTES: RouteObject = {
	path: "vehicles",
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
