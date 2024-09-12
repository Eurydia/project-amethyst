import { createSearchParams } from "react-router-dom";

export const prepareQueryParam = (
	previousPath: string,
	previousPathLabel: string,
) =>
	createSearchParams({
		previousPath,
		previousPathLabel,
	}).toString();
