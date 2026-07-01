import { LoanFilters } from '../models/loan-filters.model';
import { Loan } from '../models/loan.model';
import { getTodayDateOnly, isDateInRange, parseDate } from './date.utils';

export type LoanStatus = 'returned' | 'active' | 'overdue';

export function isReturnedLoan(loan: Loan): boolean {
  return Boolean(loan.actual_return_date);
}

export function isOverdueLoan(
  loan: Loan,
  currentDate: Date = getTodayDateOnly(),
): boolean {
  const returnDate = parseDate(loan.return_date);
  const actualReturnDate = parseDate(loan.actual_return_date);

  if (!returnDate) {
    return false;
  }

  if (actualReturnDate) {
    return actualReturnDate > returnDate;
  }

  return returnDate < currentDate;
}

export function getLoanStatus(loan: Loan): LoanStatus {
  if (isOverdueLoan(loan)) {
    return 'overdue';
  }

  if (isReturnedLoan(loan)) {
    return 'returned';
  }

  return 'active';
}

export function getLoanStatusLabel(loan: Loan): string {
  const status = getLoanStatus(loan);

  const labels: Record<LoanStatus, string> = {
    returned: 'Повернений',
    active: 'Активний',
    overdue: 'Прострочений',
  };

  return labels[status];
}

export function getLoanStatusClass(loan: Loan): string {
  const status = getLoanStatus(loan);

  const classes: Record<LoanStatus, string> = {
    returned: 'text-bg-success',
    active: 'text-bg-primary',
    overdue: 'text-bg-danger',
  };

  return classes[status];
}

export function getLoanRowClass(loan: Loan): string {
  return isOverdueLoan(loan) ? 'table-danger' : '';
}

export function matchesLoanFilters(loan: Loan, filters: LoanFilters): boolean {
  const matchesIssuanceDate = isDateInRange(
    loan.issuance_date,
    filters.issuanceDateFrom,
    filters.issuanceDateTo,
  );

  const matchesActualReturnDate = isDateInRange(
    loan.actual_return_date,
    filters.actualReturnDateFrom,
    filters.actualReturnDateTo,
  );

  const matchesOverdueStatus =
    !filters.showOnlyOverdue || isOverdueLoan(loan);

  return matchesIssuanceDate && matchesActualReturnDate && matchesOverdueStatus;
}
