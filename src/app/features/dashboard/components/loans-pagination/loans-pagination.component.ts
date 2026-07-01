import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-loans-pagination',
  standalone: true,
  imports: [],
  templateUrl: './loans-pagination.component.html',
})
export class LoansPaginationComponent {
  readonly currentPage = input.required<number>();
  readonly totalPages = input.required<number>();
  readonly pageNumbers = input.required<number[]>();
  readonly pageSize = input.required<number>();
  readonly pageSizeOptions = input.required<readonly number[]>();
  readonly totalItems = input.required<number>();

  readonly pageChange = output<number>();
  readonly pageSizeChange = output<number>();

  protected readonly startItemNumber = computed(() => {
    if (this.totalItems() === 0) {
      return 0;
    }

    return (this.currentPage() - 1) * this.pageSize() + 1;
  });

  protected readonly endItemNumber = computed(() => {
    return Math.min(this.currentPage() * this.pageSize(), this.totalItems());
  });

  protected changePage(page: number): void {
    this.pageChange.emit(page);
  }

  protected changePageSize(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;

    this.pageSizeChange.emit(Number(selectElement.value));
  }
}
