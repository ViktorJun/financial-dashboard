import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopUsersMetricsComponent } from './top-users-metrics.component';

describe('TopUsersMetricsComponent', () => {
  let component: TopUsersMetricsComponent;
  let fixture: ComponentFixture<TopUsersMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopUsersMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopUsersMetricsComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('topUsersByLoansCount', []);
    fixture.componentRef.setInput('topUsersByPaidPercent', []);
    fixture.componentRef.setInput('topUsersByPercentToBodyRatio', []);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
