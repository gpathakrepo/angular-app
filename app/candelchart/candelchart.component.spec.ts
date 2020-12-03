import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandelchartComponent } from './candelchart.component';

describe('CandelchartComponent', () => {
  let component: CandelchartComponent;
  let fixture: ComponentFixture<CandelchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandelchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandelchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
