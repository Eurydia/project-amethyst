export type PickupRouteModel = {
	id: string;

	name: string;
	arrival_time: string;
	departure_time: string;
};

export type PickupRouteEntry = {
	id: string;
	name: string;

	vehicles: {
		id: string;
		licensePlate: string;
	}[];

	drivers: {
		id: string;
		name: string;
		surname: string;
	}[];
};

export type PickupRouteReportModel = {
	id: string;
	route_id: string;

	datetime: string;
	title: string;
	content: string;
	topics: string;
};

export type PickupRouteReport = {
	id: string;
	routeId: string;
	routeName: string;

	title: string;
	content: string;
	topics: string[];
	datetime: string;
};

export type PickupRouteReportEntry = {
	id: string;
	routeId: string;
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
	datetime: string;
	title: string;
	content: string;
	topics: string[];
	route: PickupRouteModel | null;
};
