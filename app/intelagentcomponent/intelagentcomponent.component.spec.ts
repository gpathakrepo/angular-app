import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntelagentcomponentComponent } from './intelagentcomponent.component';

describe('IntelagentcomponentComponent', () => {
  let component: IntelagentcomponentComponent;
  let fixture: ComponentFixture<IntelagentcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntelagentcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntelagentcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
