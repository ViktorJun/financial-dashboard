import { Component, input } from '@angular/core';

import { MonthlyMetric } from '../../../../core/models/monthly-metric.model';
import { formatCurrency } from '../../../../core/utils/number.utils';

@Component({
  selector: 'app-monthly-metrics-table',
  standalone: true,
  imports: [],
  templateUrl: './monthly-metrics-table.component.html',
})
export class MonthlyMetricsTableComponent {
  readonly metrics = input.required<MonthlyMetric[]>();

  protected readonly formatCurrency = formatCurrency;
}
