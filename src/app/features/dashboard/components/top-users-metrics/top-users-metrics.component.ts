import { Component, input } from '@angular/core';

import {
  TopUserByLoansCount,
  TopUserByPaidPercent,
  TopUserByPercentToBodyRatio,
} from '../../../../core/models/top-user-metric.model';
import {
  formatCurrency,
  formatPercent,
} from '../../../../core/utils/number.utils';

@Component({
  selector: 'app-top-users-metrics',
  standalone: true,
  imports: [],
  templateUrl: './top-users-metrics.component.html',
})
export class TopUsersMetricsComponent {
  readonly topUsersByLoansCount = input.required<TopUserByLoansCount[]>();
  readonly topUsersByPaidPercent = input.required<TopUserByPaidPercent[]>();
  readonly topUsersByPercentToBodyRatio =
    input.required<TopUserByPercentToBodyRatio[]>();

  protected readonly formatCurrency = formatCurrency;
  protected readonly formatPercent = formatPercent;
}
