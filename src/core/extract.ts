import { URLSearchParams } from "url";

export const extractBacklinkRouteData = (
	searchParams: URLSearchParams,
) => {
	const paramPath = searchParams.get(
		"previousPath",
	);
	const paramPathLabel = searchParams.get(
		"previousPathLabel",
	);

	if (
		paramPath === null ||
		paramPathLabel === null
	) {
		return {
			previousPath: "/",
			previousPathLabel: "หน้าแรก",
		};
	}

	const previousPath =
		decodeURIComponent(paramPath);
	const previousPathLabel = decodeURIComponent(
		paramPathLabel,
	);

	return {
		previousPath,
		previousPathLabel,
	};
};
