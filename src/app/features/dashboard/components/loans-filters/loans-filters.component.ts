import { Component, input, output } from '@angular/core';

import { LoanFilters } from '../../../../core/models/loan-filters.model';

@Component({
  selector: 'app-loans-filters',
  standalone: true,
  imports: [],
  templateUrl: './loans-filters.component.html',
})
export class LoansFiltersComponent {
  readonly filters = input.required<LoanFilters>();

  readonly filtersChange = output<Partial<LoanFilters>>();
  readonly filtersReset = output<void>();

  protected updateDateFilter(
    filterName: keyof Omit<LoanFilters, 'showOnlyOverdue'>,
    event: Event,
  ): void {
    const inputElement = event.target as HTMLInputElement;

    this.filtersChange.emit({
      [filterName]: inputElement.value,
    });
  }

  protected updateOverdueFilter(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    this.filtersChange.emit({
      showOnlyOverdue: inputElement.checked,
    });
  }

  protected resetFilters(): void {
    this.filtersReset.emit();
  }
}
