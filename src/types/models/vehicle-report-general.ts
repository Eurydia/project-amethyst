import { VehicleModel } from "./vehicle";

export type VehicleReportGeneralModel = {
	id: number;
	datetime: string;
	title: string;
	content: string;
	topics: string;

	vehicle_id: number;
};

export type VehicleReportGeneralFormData = {
	datetime: string;
	title: string;
	content: string;
	topics: string[];
	vehicle: VehicleModel;
};

export type VehicleReportGeneralEntry = {
	id: number;
	datetime: string;
	title: string;
	topics: string[];

	vehicleId: number;
	vehicleLicensePlate: string;
};
