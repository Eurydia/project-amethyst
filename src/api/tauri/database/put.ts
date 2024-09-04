import {
	DriverModel,
	DriverReportModel,
} from "$types/models/Driver";
import {
	PickupRouteModel,
	PickupRouteReportModel,
} from "$types/models/PickupRoute";
import {
	VehicleModel,
	VehicleReportGeneralModel,
	VehicleReportInspectionModel,
} from "$types/models/Vehicle";
import { invoke } from "@tauri-apps/api/tauri";

//#region Attendance log
export const putAttendanceLog = async ({
	id,
	actualArrivalDatetime,
	actualDepartureDatetime,
}: {
	id: number;
	actualArrivalDatetime: string;
	actualDepartureDatetime: string;
}) => {
	invoke("put_attendance_log", {
		id,
		actualArrivalDatetime,
		actualDepartureDatetime,
	});
};
//#endregion

//#region Driver
export const putDriver = async (
	model: DriverModel,
) => invoke("put_driver", { model });
export const putDriverReportGeneral = async (
	report: DriverReportModel,
) =>
	invoke("put_driver_report_general", { report });
export const putDriverReportMedical = async (
	report: DriverReportModel,
) =>
	invoke("put_driver_report_medical", { report });
//#endregion

//#region Pickup Route
export const putPickupRoute = async (
	model: PickupRouteModel,
) => invoke("put_pickup_route", { model });
export const putPickupRouteReportGeneral = async (
	report: PickupRouteReportModel,
) =>
	invoke("put_pickup_route_report_general", {
		report,
	});
//#endregion

//#region Vehicle
export const putVehicle = async (
	model: VehicleModel,
) => invoke("put_vehicle", { model });
export const putVehicleReportGeneral = async (
	report: VehicleReportGeneralModel,
) =>
	invoke("put_vehicle_report_general", {
		report,
	});
export const putVehicleReportInspection = async (
	report: VehicleReportInspectionModel,
) =>
	invoke("put_vehicle_report_inspection", {
		report,
	});
//#endregion
