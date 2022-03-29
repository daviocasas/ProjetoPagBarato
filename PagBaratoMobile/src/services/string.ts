export const removeSpecialChars = (str: string) => {
  return str ? str.replace(/[^A-Za-z0-9]/g, '').replace(/\/s/g, '') : '';
};

export const thousandsSeparator = (value: any) =>
  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
