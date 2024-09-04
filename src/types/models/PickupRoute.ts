export type PickupRouteModel = {
	id: number;

	name: string;
	arrival_time: string;
	departure_time: string;
};

export type PickupRouteEntry = {
	id: number;
	name: string;

	vehicles: {
		id: number;
		licensePlate: string;
	}[];

	drivers: {
		id: number;
		name: string;
		surname: string;
	}[];
};

export type PickupRouteReportModel = {
	id: number;
	route_id: number;

	datetime: string;
	title: string;
	content: string;
	topics: string;
};

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
	route: PickupRouteModel | null;
	datetime: string;
	title: string;
	content: string;
	topics: string[];
};
