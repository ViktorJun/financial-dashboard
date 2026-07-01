import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from '../models/loan.model';

@Injectable({
  providedIn: 'root',
})
export class LoansApiService {
  private readonly http = inject(HttpClient);

  private readonly apiBaseUrl = 'https://raw.githubusercontent.com';
  private readonly loansEndpoint = 'LightOfTheSun/front-end-coding-task-db/master';

  getLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.apiBaseUrl}/${this.loansEndpoint}/db.json`);
  }
}
