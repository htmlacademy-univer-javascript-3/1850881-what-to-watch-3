export const convertDateTime = (date: string) => {
  const inputDate = new Date(date);
  return inputDate.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
};
