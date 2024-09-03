import { RouteObject } from "react-router-dom";
import {
	IndexPage,
	indexPageLoader,
} from "./IndexPage";
import {
	NewPage,
	newPageLoader,
} from "./NewPage";

export const DRIVER_ROUTES: RouteObject = {
	path: "drivers",
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
	],
};
