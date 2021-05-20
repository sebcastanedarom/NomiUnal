import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryEmployeeCardComponent } from './summary-employee-card.component';

describe('SummaryEmployeeCardComponent', () => {
  let component: SummaryEmployeeCardComponent;
  let fixture: ComponentFixture<SummaryEmployeeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryEmployeeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryEmployeeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
