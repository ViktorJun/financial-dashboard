import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansStore } from '../../data-access/loans.store';
import { GeneralTablePageComponent } from './general-table-page.component';

describe('GeneralTablePageComponent', () => {
  let component: GeneralTablePageComponent;
  let fixture: ComponentFixture<GeneralTablePageComponent>;

  const loansStoreMock = {
    loans: signal([]),
    filteredLoans: signal([]),
    paginatedLoans: signal([]),
    isLoading: signal(false),
    error: signal(null),
    filters: signal({
      issuanceDateFrom: '',
      issuanceDateTo: '',
      actualReturnDateFrom: '',
      actualReturnDateTo: '',
      showOnlyOverdue: false,
    }),
    currentPage: signal(1),
    totalPages: signal(1),
    pageNumbers: signal([1]),
    pageSize: signal(10),
    pageSizeOptions: [10, 25, 50, 100],
    totalItems: signal(0),
    loadLoans: jasmine.createSpy('loadLoans'),
    updateFilters: jasmine.createSpy('updateFilters'),
    resetFilters: jasmine.createSpy('resetFilters'),
    setCurrentPage: jasmine.createSpy('setCurrentPage'),
    setPageSize: jasmine.createSpy('setPageSize'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralTablePageComponent],
      providers: [
        {
          provide: LoansStore,
          useValue: loansStoreMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralTablePageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
