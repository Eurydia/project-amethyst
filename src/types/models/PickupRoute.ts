export type PickupRouteModel = {
	id: string;

	name: string;
	arrival_time: string;
	departure_time: string;
};

export type PickupRouteReportModel = {
	id: string;
	route_id: string;

	datetime: string;
	title: string;
	content: string;
	topics: string;
};

export type PickupRouteFormData = Omit<
	PickupRouteModel,
	"id"
>;

export type PickupRouteReportFormData = {
	datetime: string;
	title: string;
	content: string;
	topics: string[];
	route: PickupRouteModel | null;
};
