import {
	matchSorter,
	MatchSorterOptions,
} from "match-sorter";

export const filterItems = <T extends Object>(
	items: T[],
	searchTokens: string[],
	searchKeys: MatchSorterOptions<T>["keys"],
): T[] => {
	return searchTokens.reduceRight(
		(leftover, token) =>
			matchSorter(leftover, token, {
				keys: searchKeys,
			}),
		items,
	);
};
