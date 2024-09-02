import { filterItems } from "$core/filter";
import { IndexPageLoaderData } from "./loader";

export const getRouteOptions = (
	entries: IndexPageLoaderData["entries"],
) => {
	const uniqueRoutes: Record<string, string> = {};
	for (const entry of entries) {
		uniqueRoutes[entry.route.id] =
			entry.route.name;
	}
	const routeOptions = Object.entries(
		uniqueRoutes,
	).map(([value, label]) => ({
		label,
		value,
	}));
	return routeOptions;
};

export const filterEntries = (
	entries: IndexPageLoaderData["entries"],
	selectedRoutes: string[],
) => {
	const routeSet = new Set(selectedRoutes);
	return entries.filter((entry) =>
		routeSet.has(entry.route.id),
	);
};

export const searchEntries = (
	entries: IndexPageLoaderData["entries"],
	search: string,
) => {
	return filterItems(entries, search, [
		"route.name",
		"vehicles.*.licensePlate",
		"drivers.*.name",
		"drivers.*.surname",
	]);
};
