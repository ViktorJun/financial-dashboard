export interface TopUserByLoansCount {
  user: string;
  loansCount: number;
}

export interface TopUserByPaidPercent {
  user: string;
  totalPaidPercent: number;
}

export interface TopUserByPercentToBodyRatio {
  user: string;
  totalBody: number;
  totalPaidPercent: number;
  ratio: number;
}
