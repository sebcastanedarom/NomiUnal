import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FireEmployeeComponent } from './fire-employee.component';

describe('FireEmployeeComponent', () => {
  let component: FireEmployeeComponent;
  let fixture: ComponentFixture<FireEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FireEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FireEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
