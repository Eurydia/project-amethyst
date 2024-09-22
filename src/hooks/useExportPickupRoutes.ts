/** @format */

import { tauriGetPickupRoute } from "$backend/database/get/pickup-routes";
import { PICKUP_ROUTE_MODEL_TRANSFORMER } from "$core/transformers/pickup-route-model";
import {
	PickupRouteEntry,
	PickupRouteExportData,
} from "$types/models/pickup-route";
import { useCallback } from "react";
import { toast } from "react-toastify";
import XLSX from "xlsx";

type Options = {
	workbookName?: string;
	worksheetName?: string;
	successMessage?: string;
};
export const useExportPickupRoutes = (options?: Options) => {
	let successMsg = "Exported pickup routes"; // TODO: translate
	if (options !== undefined && options.successMessage !== undefined) {
		successMsg = options.successMessage;
	}
	let workbookName = "pickup routes"; // TODO: translate
	if (options !== undefined && options.workbookName !== undefined) {
		workbookName = options.workbookName;
	}
	let worksheetName = "routes"; // TODO: translate
	if (options !== undefined && options.worksheetName !== undefined) {
		worksheetName = options.worksheetName;
	}

	const exportRoutes = useCallback(
		async (routeEntries: PickupRouteEntry[]) => {
			const routes = await Promise.all(
				routeEntries
					.map((entry) => entry.id)
					.map((routeId) => tauriGetPickupRoute(routeId))
			);
			const routeData = routes
				.filter((route) => route !== null)
				.toSorted((a, b) => a.id - b.id)
				.map(PICKUP_ROUTE_MODEL_TRANSFORMER.toPickupRouteExportData);

			const header: (keyof PickupRouteExportData)[] = [
				"เลขรหัส",
				"ชื่อสาย",
				"เวลารับเข้า",
				"เวลารับออก",
			];
			const worksheet = XLSX.utils.json_to_sheet(routeData, {
				header,
			});
			const workbook = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName);
			XLSX.writeFile(workbook, workbookName + ".xlsx");
			toast.success(successMsg);
		},
		[workbookName, worksheetName, successMsg]
	);
	return exportRoutes;
};
