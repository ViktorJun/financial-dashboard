import { Component, input } from '@angular/core';
import { CurrencyPipe, PercentPipe } from '@angular/common';

import {
  TopUserByLoansCount,
  TopUserByPaidPercent,
  TopUserByPercentToBodyRatio,
} from '../../../../core/models/top-user-metric.model';

@Component({
  selector: 'app-top-users-metrics',
  standalone: true,
  imports: [CurrencyPipe, PercentPipe],
  templateUrl: './top-users-metrics.component.html',
})
export class TopUsersMetricsComponent {
  readonly topUsersByLoansCount = input.required<TopUserByLoansCount[]>();
  readonly topUsersByPaidPercent = input.required<TopUserByPaidPercent[]>();
  readonly topUsersByPercentToBodyRatio =
    input.required<TopUserByPercentToBodyRatio[]>();
}
