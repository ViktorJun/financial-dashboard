import { Loan } from '../models/loan.model';
import { MonthlyMetric } from '../models/monthly-metric.model';
import { getMonthKey, getMonthLabel } from './date.utils';
import { isReturnedLoan } from './loan.utils';
import {
  TopUserByLoansCount,
  TopUserByPaidPercent,
  TopUserByPercentToBodyRatio,
} from '../models/top-user-metric.model';

export function buildMonthlyMetrics(loans: Loan[]): MonthlyMetric[] {
  const metricsByMonth = new Map<string, MonthlyMetric>();

  for (const loan of loans) {
    const monthKey = getMonthKey(loan.issuance_date);

    if (!monthKey) {
      continue;
    }

    const existingMetric = metricsByMonth.get(monthKey);

    const metric: MonthlyMetric = existingMetric ?? {
      monthKey,
      monthLabel: getMonthLabel(monthKey),
      issuedCount: 0,
      averageBody: 0,
      totalBody: 0,
      totalPercent: 0,
      returnedCount: 0,
    };

    metric.issuedCount += 1;
    metric.totalBody += loan.body;
    metric.totalPercent += loan.percent;

    if (isReturnedLoan(loan)) {
      metric.returnedCount += 1;
    }

    metricsByMonth.set(monthKey, metric);
  }

  return Array.from(metricsByMonth.values())
    .map((metric) => ({
      ...metric,
      averageBody: metric.issuedCount > 0
        ? metric.totalBody / metric.issuedCount
        : 0,
    }))
    .sort((firstMetric, secondMetric) =>
      firstMetric.monthKey.localeCompare(secondMetric.monthKey),
    );
}
export function getTopUsersByLoansCount(loans: Loan[]): TopUserByLoansCount[] {
  const loansCountByUser = new Map<string, number>();

  for (const loan of loans) {
    const currentLoansCount = loansCountByUser.get(loan.user) ?? 0;

    loansCountByUser.set(loan.user, currentLoansCount + 1);
  }

  return Array.from(loansCountByUser.entries())
    .map(([user, loansCount]) => ({
      user,
      loansCount,
    }))
    .sort((firstUser, secondUser) => secondUser.loansCount - firstUser.loansCount)
    .slice(0, 10);
}
export function getTopUsersByPaidPercent(loans: Loan[]): TopUserByPaidPercent[] {
  const paidPercentByUser = new Map<string, number>();

  const returnedLoans = loans.filter(isReturnedLoan);

  for (const loan of returnedLoans) {
    const currentPaidPercent = paidPercentByUser.get(loan.user) ?? 0;

    paidPercentByUser.set(loan.user, currentPaidPercent + loan.percent);
  }

  return Array.from(paidPercentByUser.entries())
    .map(([user, totalPaidPercent]) => ({
      user,
      totalPaidPercent,
    }))
    .sort(
      (firstUser, secondUser) =>
        secondUser.totalPaidPercent - firstUser.totalPaidPercent,
    )
    .slice(0, 10);
}
export function getTopUsersByPercentToBodyRatio(
  loans: Loan[],
): TopUserByPercentToBodyRatio[] {
  const totalsByUser = new Map<
    string,
    {
      totalBody: number;
      totalPaidPercent: number;
    }
  >();

  const returnedLoans = loans.filter(isReturnedLoan);

  for (const loan of returnedLoans) {
    const currentTotals = totalsByUser.get(loan.user) ?? {
      totalBody: 0,
      totalPaidPercent: 0,
    };

    totalsByUser.set(loan.user, {
      totalBody: currentTotals.totalBody + loan.body,
      totalPaidPercent: currentTotals.totalPaidPercent + loan.percent,
    });
  }

  return Array.from(totalsByUser.entries())
    .map(([user, totals]) => ({
      user,
      totalBody: totals.totalBody,
      totalPaidPercent: totals.totalPaidPercent,
      ratio:
        totals.totalBody > 0
          ? totals.totalPaidPercent / totals.totalBody
          : 0,
    }))
    .sort((firstUser, secondUser) => secondUser.ratio - firstUser.ratio)
    .slice(0, 10);
}
