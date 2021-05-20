import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FireEmpoloyeePerfilComponent } from './fire-empoloyee-perfil.component';

describe('FireEmpoloyeePerfilComponent', () => {
  let component: FireEmpoloyeePerfilComponent;
  let fixture: ComponentFixture<FireEmpoloyeePerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FireEmpoloyeePerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FireEmpoloyeePerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
