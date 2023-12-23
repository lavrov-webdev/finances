export const separateThousand = (value: number, addCurrencySymbol = true) => {
  if (value === undefined) return "";
  let result = new Intl.NumberFormat("ru-RU").format(value);
  return addCurrencySymbol ? (result += " ₽") : result;
};

export const groupBy = <T>(
  data: T[],
  groupFn: (d: T) => string,
): Record<string, T[]> => {
  const res: Record<string, T[]> = {};
  data.forEach((d) => {
    const key = groupFn(d);
    res[key] ? res[key].push(d) : (res[key] = [d]);
  });
  return res;
};
