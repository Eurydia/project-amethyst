import {
	DriverFormData,
	DriverReportFormData,
} from "$types/models/Driver";
import {
	PickupRouteFormData,
	PickupRouteReportFormData,
} from "$types/models/PickupRoute";
import {
	VehicleFormData,
	VehicleReportGeneralFormData,
	VehicleReportInspectionFormData,
} from "$types/models/Vehicle";
import { invoke } from "@tauri-apps/api/tauri";

//#region Attendance log
export const putAttendanceLog = async ({
	id,
	actualArrivalDatetime,
	actualDepartureDatetime,
}: {
	id: number;
	actualArrivalDatetime: string | null;
	actualDepartureDatetime: string | null;
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
	driverId: number,
	driver: DriverFormData,
) =>
	invoke("put_driver", {
		driverId,
		...driver,
	});
export const putDriverReportGeneral = async (
	reportId: number,
	report: DriverReportFormData,
) =>
	invoke("put_driver_report_general", {
		reportId,
		...report,
	});
export const putDriverReportMedical = async (
	reportId: number,
	report: DriverReportFormData,
) =>
	invoke("put_driver_report_medical", {
		reportId,
		...report,
	});
//#endregion

//#region Pickup Route
export const putPickupRoute = async (
	routeId: number,
	route: PickupRouteFormData,
) =>
	invoke("put_pickup_route", {
		routeId,
		...route,
	});
export const putPickupRouteReportGeneral = async (
	reportId: number,
	report: PickupRouteReportFormData,
) =>
	invoke("put_pickup_route_report_general", {
		reportId,
		...report,
	});
//#endregion

//#region Vehicle
export const putVehicle = async (
	vehicleId: number,
	vehicle: VehicleFormData,
) =>
	invoke("put_vehicle", {
		vehicleId,
		...vehicle,
	});
export const putVehicleReportGeneral = async (
	reportId: number,
	report: VehicleReportGeneralFormData,
) =>
	invoke("put_vehicle_report_general", {
		reportId,
		...report,
	});
export const putVehicleReportInspection = async (
	reportId: number,
	report: VehicleReportInspectionFormData,
) =>
	invoke("put_vehicle_report_inspection", {
		reportId,
		...report,
	});
//#endregion
