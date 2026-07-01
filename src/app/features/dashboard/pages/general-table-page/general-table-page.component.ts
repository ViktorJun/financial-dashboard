import { Component, inject, OnInit } from '@angular/core';

import { LoansFiltersComponent } from '../../components/loans-filters/loans-filters.component';
import { LoansPaginationComponent } from '../../components/loans-pagination/loans-pagination.component';
import { LoansTableComponent } from '../../components/loans-table/loans-table.component';
import { LoansStore } from '../../data-access/loans.store';

@Component({
  selector: 'app-general-table-page',
  standalone: true,
  imports: [
    LoansFiltersComponent,
    LoansPaginationComponent,
    LoansTableComponent,
  ],
  templateUrl: './general-table-page.component.html',
})
export class GeneralTablePageComponent implements OnInit {
  readonly loansStore = inject(LoansStore);

  ngOnInit(): void {
    this.loansStore.loadLoans();
  }
}
