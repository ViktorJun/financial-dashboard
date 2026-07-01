import { Component, inject, OnInit } from '@angular/core';

import { MonthlyMetricsTableComponent } from '../../components/monthly-metrics-table/monthly-metrics-table.component';
import { LoansStore } from '../../data-access/loans.store';
import { TopUsersMetricsComponent } from '../../components/top-users-metrics/top-users-metrics.component';

@Component({
  selector: 'app-short-info-page',
  standalone: true,
  imports: [MonthlyMetricsTableComponent, TopUsersMetricsComponent],
  templateUrl: './short-info-page.component.html',
})
export class ShortInfoPageComponent implements OnInit {
  readonly loansStore = inject(LoansStore);

  ngOnInit(): void {
    this.loansStore.loadLoans();
  }
}
