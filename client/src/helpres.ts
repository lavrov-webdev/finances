export const separateThousand = (value: number, addCurrencySymbol = true) => {
  if (value === undefined) return ''
  let result =  new Intl.NumberFormat("ru-RU" ).format(
    value,
  );
  return addCurrencySymbol ? result+=' ₽' : result
};

