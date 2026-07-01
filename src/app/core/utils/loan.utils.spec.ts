import { Loan } from '../models/loan.model';
import {
  getLoanStatus,
  isOverdueLoan,
  isReturnedLoan,
  matchesLoanFilters,
} from './loan.utils';

const createLoan = (overrides: Partial<Loan> = {}): Loan => ({
  id: 1,
  user: 'Test User',
  body: 1000,
  percent: 100,
  issuance_date: '2021-01-01',
  return_date: '2021-01-10',
  actual_return_date: null,
  ...overrides,
});

describe('loan.utils', () => {
  describe('isReturnedLoan', () => {
    it('should return true when actual_return_date exists', () => {
      const loan = createLoan({
        actual_return_date: '2021-01-09',
      });

      expect(isReturnedLoan(loan)).toBeTrue();
    });

    it('should return false when actual_return_date is null', () => {
      const loan = createLoan({
        actual_return_date: null,
      });

      expect(isReturnedLoan(loan)).toBeFalse();
    });
  });

  describe('isOverdueLoan', () => {
    it('should return true when actual return date is after planned return date', () => {
      const loan = createLoan({
        return_date: '2021-01-10',
        actual_return_date: '2021-01-15',
      });

      expect(isOverdueLoan(loan)).toBeTrue();
    });

    it('should return false when actual return date is before planned return date', () => {
      const loan = createLoan({
        return_date: '2021-01-10',
        actual_return_date: '2021-01-09',
      });

      expect(isOverdueLoan(loan)).toBeFalse();
    });

    it('should return true when loan is not returned and return date is in the past', () => {
      const loan = createLoan({
        return_date: '2021-01-10',
        actual_return_date: null,
      });

      const currentDate = new Date(2021, 0, 15);

      expect(isOverdueLoan(loan, currentDate)).toBeTrue();
    });

    it('should return false when loan is not returned and return date is in the future', () => {
      const loan = createLoan({
        return_date: '2021-01-20',
        actual_return_date: null,
      });

      const currentDate = new Date(2021, 0, 15);

      expect(isOverdueLoan(loan, currentDate)).toBeFalse();
    });
  });

  describe('getLoanStatus', () => {
    it('should return overdue for overdue loan', () => {
      const loan = createLoan({
        return_date: '2021-01-10',
        actual_return_date: '2021-01-15',
      });

      expect(getLoanStatus(loan)).toBe('overdue');
    });

    it('should return returned for returned loan without overdue', () => {
      const loan = createLoan({
        return_date: '2021-01-10',
        actual_return_date: '2021-01-09',
      });

      expect(getLoanStatus(loan)).toBe('returned');
    });
  });

  describe('matchesLoanFilters', () => {
    it('should return true when loan matches empty filters', () => {
      const loan = createLoan();

      const result = matchesLoanFilters(loan, {
        issuanceDateFrom: '',
        issuanceDateTo: '',
        actualReturnDateFrom: '',
        actualReturnDateTo: '',
        showOnlyOverdue: false,
      });

      expect(result).toBeTrue();
    });

    it('should return false when issuance date is outside filter range', () => {
      const loan = createLoan({
        issuance_date: '2021-01-01',
      });

      const result = matchesLoanFilters(loan, {
        issuanceDateFrom: '2021-02-01',
        issuanceDateTo: '',
        actualReturnDateFrom: '',
        actualReturnDateTo: '',
        showOnlyOverdue: false,
      });

      expect(result).toBeFalse();
    });

    it('should return true for overdue loan when showOnlyOverdue is enabled', () => {
      const loan = createLoan({
        return_date: '2021-01-10',
        actual_return_date: '2021-01-15',
      });

      const result = matchesLoanFilters(loan, {
        issuanceDateFrom: '',
        issuanceDateTo: '',
        actualReturnDateFrom: '',
        actualReturnDateTo: '',
        showOnlyOverdue: true,
      });

      expect(result).toBeTrue();
    });
  });
});
