/** @format */

import { tuariPostPickupRoute } from "$backend/database/post";
import { PickupRouteFormData } from "$types/models/pickup-route";
import { useCallback } from "react";
import { toast } from "react-toastify";

type Options = {
	toastSuccessMessage?: string;
	toastErrorMessage?: string;
};
export const usePostPickupRoute = (options?: Options) => {
	let successMsg = "Added new route"; // TODO: translate;
	if (options !== undefined && options.toastSuccessMessage !== undefined) {
		successMsg = options.toastSuccessMessage;
	}

	let errorMsg = "Registration failed"; // TODO: translate;
	if (options !== undefined && options.toastErrorMessage !== undefined) {
		errorMsg = options.toastErrorMessage;
	}

	const fn = useCallback(
		(formData: PickupRouteFormData) =>
			tuariPostPickupRoute(formData).then(
				(routeId) => {
					toast.success(successMsg);
					return routeId;
				},
				() => {
					toast.error(errorMsg);
					return null;
				}
			),
		[]
	);
	return fn;
};
