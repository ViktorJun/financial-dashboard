export interface Loan {
  id: number;
  user: string;
  body: number;
  percent: number;
  issuance_date: string;
  return_date: string;
  actual_return_date: string | null;
}
