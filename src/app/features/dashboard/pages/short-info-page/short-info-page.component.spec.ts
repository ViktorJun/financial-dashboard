import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansStore } from '../../data-access/loans.store';
import { ShortInfoPageComponent } from './short-info-page.component';

describe('ShortInfoPageComponent', () => {
  let component: ShortInfoPageComponent;
  let fixture: ComponentFixture<ShortInfoPageComponent>;

  const loansStoreMock = {
    isLoading: signal(false),
    error: signal(null),
    monthlyMetrics: signal([]),
    topUsersByLoansCount: signal([]),
    topUsersByPaidPercent: signal([]),
    topUsersByPercentToBodyRatio: signal([]),
    loadLoans: jasmine.createSpy('loadLoans'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortInfoPageComponent],
      providers: [
        {
          provide: LoansStore,
          useValue: loansStoreMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShortInfoPageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
