export const formatRatingScore = (num: number) => num.toLocaleString('en-US', {
  style: 'decimal',
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
}).replace('.', ',');
