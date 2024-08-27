import { matchSorter } from "match-sorter";

export const filterItems = <T extends Object>(
	items: T[],
	searchTokens: string[],
	searchKeys: (keyof T)[],
): T[] => {
	const keys = searchKeys.map((key) =>
		key.toString(),
	);

	return searchTokens.reduceRight(
		(leftover, token) =>
			matchSorter(leftover, token, {
				keys,
			}),
		items,
	);
};
