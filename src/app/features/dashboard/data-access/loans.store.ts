import { computed, inject, Injectable, signal } from '@angular/core';

import { LoanFilters } from '../../../core/models/loan-filters.model';
import { Loan } from '../../../core/models/loan.model';
import { LoansApiService } from '../../../core/services/loans-api.service';
import { matchesLoanFilters } from '../../../core/utils/loan.utils';
import {
  buildMonthlyMetrics,
  getTopUsersByLoansCount,
  getTopUsersByPaidPercent,
  getTopUsersByPercentToBodyRatio,
} from '../../../core/utils/metrics.utils';

const INITIAL_LOAN_FILTERS: LoanFilters = {
  issuanceDateFrom: '',
  issuanceDateTo: '',
  actualReturnDateFrom: '',
  actualReturnDateTo: '',
  showOnlyOverdue: false,
};

@Injectable({
  providedIn: 'root',
})
export class LoansStore {
  private readonly loansApiService = inject(LoansApiService);

  readonly loans = signal<Loan[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);
  readonly hasLoaded = signal(false);

  readonly filters = signal<LoanFilters>({ ...INITIAL_LOAN_FILTERS });

  readonly pageSizeOptions = [10, 25, 50, 100] as const;
  readonly pageSize = signal(10);
  readonly currentPage = signal(1);

  readonly filteredLoans = computed(() => {
    return this.loans().filter((loan) => matchesLoanFilters(loan, this.filters()));
  });

  readonly totalItems = computed(() => {
    return this.filteredLoans().length;
  });

  readonly totalPages = computed(() => {
    return Math.max(1, Math.ceil(this.totalItems() / this.pageSize()));
  });

  readonly paginatedLoans = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.pageSize();
    const endIndex = startIndex + this.pageSize();

    return this.filteredLoans().slice(startIndex, endIndex);
  });

  readonly monthlyMetrics = computed(() => {
    return buildMonthlyMetrics(this.loans());
  });

  readonly topUsersByLoansCount = computed(() => {
    return getTopUsersByLoansCount(this.loans());
  });

  readonly topUsersByPaidPercent = computed(() => {
    return getTopUsersByPaidPercent(this.loans());
  });

  readonly topUsersByPercentToBodyRatio = computed(() => {
    return getTopUsersByPercentToBodyRatio(this.loans());
  });

  readonly pageNumbers = computed(() => {
    const totalPages = this.totalPages();
    const currentPage = this.currentPage();
    const visiblePagesCount = 5;

    let startPage = Math.max(1, currentPage - Math.floor(visiblePagesCount / 2));
    const endPage = Math.min(totalPages, startPage + visiblePagesCount - 1);

    startPage = Math.max(1, endPage - visiblePagesCount + 1);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index,
    );
  });


  loadLoans(): void {
    if (this.hasLoaded() || this.isLoading()) {
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    this.loansApiService.getLoans().subscribe({
      next: (loans) => {
        this.loans.set(loans);
        this.hasLoaded.set(true);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Не вдалося завантажити дані');
        this.isLoading.set(false);
      },
    });
  }

  updateFilters(filters: Partial<LoanFilters>): void {
    this.filters.update((currentFilters) => ({
      ...currentFilters,
      ...filters,
    }));

    this.currentPage.set(1);
  }

  resetFilters(): void {
    this.filters.set({ ...INITIAL_LOAN_FILTERS });
    this.currentPage.set(1);
  }

  setCurrentPage(page: number): void {
    const normalizedPage = Math.min(Math.max(page, 1), this.totalPages());

    this.currentPage.set(normalizedPage);
  }

  setPageSize(pageSize: number): void {
    this.pageSize.set(pageSize);
    this.currentPage.set(1);
  }

}
