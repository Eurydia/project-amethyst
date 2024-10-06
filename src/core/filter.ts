import {
  matchSorter,
  MatchSorterOptions,
} from "match-sorter";

export const filterObjects = <T extends Object>(
  items: T[],
  value: string,
  searchKeys: MatchSorterOptions<T>["keys"]
): T[] => {
  const searchTokens = value
    .normalize()
    .split(" ")
    .map((token) => token.trim())
    .filter((token) => token.length > 0);
  return searchTokens.reduceRight(
    (leftover, token) =>
      matchSorter(leftover, token, {
        keys: searchKeys,
      }),
    items
  );
};

export const filterStrings = (
  items: string[],
  value: string
) => {
  const searchTokens = value
    .normalize()
    .split(" ")
    .map((token) => token.trim())
    .filter((token) => token.length > 0);
  return searchTokens.reduceRight(
    (leftover, token) => matchSorter(leftover, token),
    items
  );
};
