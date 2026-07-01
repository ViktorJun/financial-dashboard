import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyMetricsTableComponent } from './monthly-metrics-table.component';

describe('MonthlyMetricsTableComponent', () => {
  let component: MonthlyMetricsTableComponent;
  let fixture: ComponentFixture<MonthlyMetricsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyMetricsTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MonthlyMetricsTableComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('metrics', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
