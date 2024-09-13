import {
	getVehicle,
	getVehicleReportInspectionAll,
} from "$backend/database/get";
import {
	VehicleReportInspectionEntry,
	VehicleReportInspectionModel,
} from "$types/models/Vehicle";

export const VEHICLE_REPORT_INSPECTION_MODEL_TRANSFORMER =
	{
		toVehicleReportInspectionEntry: async (
			report: VehicleReportInspectionModel,
		) => {
			const vehicle = await getVehicle(
				report.vehicle_id,
			);
			if (vehicle === null) {
				return null;
			}

			const reports = (
				await getVehicleReportInspectionAll()
			)
				.filter(
					({ vehicle_id }) =>
						vehicle_id === vehicle.id,
				)
				.toReversed();

			let count = 0;
			for (const report of reports) {
				if (report.vehicle_id === vehicle.id) {
					count++;
				}
				if (report.id === report.id) {
					break;
				}
			}
			const entry: VehicleReportInspectionEntry =
				{
					inspectionRoundNumber: count,

					id: report.id,
					datetime: report.datetime,
					topics: report.topics.split(","),

					vehicleId: vehicle.id,
					vehicleLicensePlate:
						vehicle.license_plate,
				};
			return entry;
		},
	};
