import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansPaginationComponent } from './loans-pagination.component';

describe('LoansPaginationComponent', () => {
  let component: LoansPaginationComponent;
  let fixture: ComponentFixture<LoansPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoansPaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoansPaginationComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('currentPage', 1);
    fixture.componentRef.setInput('totalPages', 1);
    fixture.componentRef.setInput('pageNumbers', [1]);
    fixture.componentRef.setInput('pageSize', 10);
    fixture.componentRef.setInput('pageSizeOptions', [10, 25, 50, 100]);
    fixture.componentRef.setInput('totalItems', 0);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
