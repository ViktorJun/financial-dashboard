import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

import { Loan } from '../../../../core/models/loan.model';
import {
  getLoanRowClass,
  getLoanStatusClass,
  getLoanStatusLabel,
} from '../../../../core/utils/loan.utils';

@Component({
  selector: 'app-loans-table',
  standalone: true,
  imports: [NgClass, CurrencyPipe, DatePipe],
  templateUrl: './loans-table.component.html',
})
export class LoansTableComponent {
  readonly loans = input.required<Loan[]>();

  protected readonly getLoanRowClass = getLoanRowClass;
  protected readonly getLoanStatusClass = getLoanStatusClass;
  protected readonly getLoanStatusLabel = getLoanStatusLabel;
}
