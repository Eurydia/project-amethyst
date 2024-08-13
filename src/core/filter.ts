import { matchSorter } from "match-sorter";

export const filterItems = <T>(
	items: T[],
	searchTokens: string[],
	searchKeys: string[],
): T[] => {
	const results = searchTokens.reduceRight(
		(leftover, token) =>
			matchSorter(leftover, token, {
				keys: searchKeys,
			}),
		items,
	);
	return results;
};
