import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabcomponentComponent } from './tabcomponent.component';

describe('TabcomponentComponent', () => {
  let component: TabcomponentComponent;
  let fixture: ComponentFixture<TabcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
