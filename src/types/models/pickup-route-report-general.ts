import { PickupRouteModel } from "./pickup-route";

export type PickupRouteReportGeneralModel = {
	reportId: number;
	route: PickupRouteModel;
	datetime: string;
	title: string;
	content: string;
	topics: string[];
};
export type PickupRouteReportFormData = {
	route: PickupRouteModel;
	datetime: string;
	title: string;
	content: string;
	topics: string[];
};
