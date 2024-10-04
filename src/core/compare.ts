export const compareStrings = (a: string, b: string) => {
  return a
    .trim()
    .normalize()
    .localeCompare(b.trim().normalize());
};
