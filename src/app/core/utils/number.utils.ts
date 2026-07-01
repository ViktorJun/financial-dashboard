export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat('uk-UA', {
    style: 'percent',
    maximumFractionDigits: 2,
  }).format(value);
}
