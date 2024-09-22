/** @format */

import { tuariPostPickupRoute } from "$backend/database/post";
import { PickupRouteExportData } from "$types/models/pickup-route";
import { useCallback } from "react";
import { toast } from "react-toastify";
import XLSX from "xlsx";

type Options = {
	successMessage?: string;
	errorMessage?: string;
};
export const useImportPickupRoutes = (options?: Options) => {
	let successMsg = "Added routes"; // TODO: translate
	if (options !== undefined && options.successMessage !== undefined) {
		successMsg = options.successMessage;
	}
	let errorMsg = "Registration failed"; // TODO: translate
	if (options !== undefined && options.errorMessage !== undefined) {
		errorMsg = options.errorMessage;
	}

	const importRoute = useCallback(
		async (file: File): Promise<void> => {
			const buffer = await file.arrayBuffer();
			const workbook = XLSX.read(buffer);
			const sheet = workbook.Sheets[workbook.SheetNames[0]];
			const entries =
				XLSX.utils.sheet_to_json<Omit<PickupRouteExportData, "id">>(sheet);
			const postRequets = entries.map((entry) =>
				tuariPostPickupRoute({
					name: entry["ชื่อสาย"],
					arrivalTime: entry["เวลารับเข้า"],
					departureTime: entry["เวลารับออก"],
				})
			);
			await Promise.allSettled(postRequets).then(
				() => toast.success(successMsg),
				() => toast.error(errorMsg)
			);
		},
		[successMsg, errorMsg]
	);
	return importRoute;
};
