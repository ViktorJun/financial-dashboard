export function parseDate(value: string | null): Date | null {
  if (!value) {
    return null;
  }

  const dateParts = value.split('-');

  if (dateParts.length !== 3) {
    return null;
  }

  const [year, month, day] = dateParts.map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
}

export function getTodayDateOnly(): Date {
  const today = new Date();

  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

export function isDateInRange(
  dateValue: string | null,
  fromValue: string,
  toValue: string,
): boolean {
  if (!fromValue && !toValue) {
    return true;
  }

  const date = parseDate(dateValue);

  if (!date) {
    return false;
  }

  const fromDate = parseDate(fromValue);
  const toDate = parseDate(toValue);

  if (fromDate && date < fromDate) {
    return false;
  }

  if (toDate && date > toDate) {
    return false;
  }

  return true;
}
export function getMonthKey(dateValue: string | null): string | null {
  const date = parseDate(dateValue);

  if (!date) {
    return null;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');

  return `${year}-${month}`;
}

export function getMonthLabel(monthKey: string): string {
  const [year, month] = monthKey.split('-').map(Number);

  return new Intl.DateTimeFormat('uk-UA', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(year, month - 1));
}
