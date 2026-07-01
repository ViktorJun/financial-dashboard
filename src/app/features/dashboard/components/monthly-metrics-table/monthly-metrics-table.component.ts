import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { MonthlyMetric } from '../../../../core/models/monthly-metric.model';

@Component({
  selector: 'app-monthly-metrics-table',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './monthly-metrics-table.component.html',
})
export class MonthlyMetricsTableComponent {
  readonly metrics = input.required<MonthlyMetric[]>();
}
