import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePerfilComponent } from './employee-perfil.component';

describe('EmployeePerfilComponent', () => {
  let component: EmployeePerfilComponent;
  let fixture: ComponentFixture<EmployeePerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeePerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
