import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtdChartDashboardComponent } from './btd-chart-dashboard.component';

describe('BtdChartDashboardComponent', () => {
  let component: BtdChartDashboardComponent;
  let fixture: ComponentFixture<BtdChartDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtdChartDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtdChartDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
