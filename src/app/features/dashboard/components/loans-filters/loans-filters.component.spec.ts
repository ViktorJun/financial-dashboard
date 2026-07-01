import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanFilters } from '../../../../core/models/loan-filters.model';
import { LoansFiltersComponent } from './loans-filters.component';

const mockFilters: LoanFilters = {
  issuanceDateFrom: '',
  issuanceDateTo: '',
  actualReturnDateFrom: '',
  actualReturnDateTo: '',
  showOnlyOverdue: false,
};

describe('LoansFiltersComponent', () => {
  let component: LoansFiltersComponent;
  let fixture: ComponentFixture<LoansFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoansFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoansFiltersComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('filters', mockFilters);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
