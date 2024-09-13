import { PickupRouteModel } from "./pickup-route";

export type PickupRouteReport = {
	id: number;
	routeId: number;

	routeName: string;
	title: string;
	content: string;
	topics: string[];
	datetime: string;
};

export type PickupRouteReportEntry = {
	id: number;
	routeId: number;

	routeName: string;
	title: string;
	topics: string[];
	datetime: string;
};

export type PickupRouteFormData = {
	name: string;
	arrivalTime: string;
	departureTime: string;
};

export type PickupRouteReportFormData = {
	route: PickupRouteModel;
	datetime: string;
	title: string;
	content: string;
	topics: string[];
};
