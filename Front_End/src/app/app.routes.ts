import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './login/login/login.component';
import { NewEmployeeComponent } from './pages/new-employee/new-employee.component';
import { EmployeeInformationComponent } from './pages/employee-information/employee-information.component';
import { FireEmployeeComponent } from './pages/fire-employee/fire-employee.component';
import { PayrollComponent } from './pages/payroll/payroll.component';
import { EmployeePerfilComponent } from './pages/employee-information/employee-perfil/employee-perfil.component';
import { FireEmpoloyeePerfilComponent } from './pages/fire-employee/fire-empoloyee-perfil/fire-empoloyee-perfil.component';
import { AbsencesComponent } from './pages/employee-information/absences/absences.component';
import { DiscountsComponent } from './pages/employee-information/discounts/discounts.component';
import { EditInformationComponent } from './pages/employee-information/edit-information/edit-information.component';
import { ExtraHoursComponent } from './pages/employee-information/extra-hours/extra-hours.component';
import { PaymentReportComponent } from './pages/employee-information/payment-report/payment-report.component';
import { PaymentsComponent } from './pages/employee-information/payments/payments.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent, },
  { path: 'home/new-employee', component: NewEmployeeComponent, canActivate: [LoginGuard]  },
  { path: 'home/employee-information', component: EmployeeInformationComponent , canActivate: [LoginGuard] },
  { path: 'home/fire-employee', component: FireEmployeeComponent , canActivate: [LoginGuard] },
  { path: 'home/payroll', component: PayrollComponent , canActivate: [LoginGuard] },
  { path: 'home/employee-information/employee-perfil/:id', component: EmployeePerfilComponent , canActivate: [LoginGuard] },
  { path: 'home/fire-employee/fire-employee-perfil/:id', component: FireEmpoloyeePerfilComponent , canActivate: [LoginGuard] },
  { path: 'home/employee-information/employee-perfil/absences/:id', component: AbsencesComponent , canActivate: [LoginGuard] },
  { path: 'home/employee-information/employee-perfil/discounts/:id', component: DiscountsComponent , canActivate: [LoginGuard] },
  { path: 'home/employee-information/employee-perfil/edit-information/:id', component: EditInformationComponent, canActivate: [LoginGuard]},
  { path: 'home/employee-information/employee-perfil/extra-hours/:id', component: ExtraHoursComponent , canActivate: [LoginGuard] },
  { path: 'home/employee-information/employee-perfil/payment-report/:id', component: PaymentReportComponent , canActivate: [LoginGuard] },
  { path: 'home/employee-information/employee-perfil/payments/:id', component: PaymentsComponent , canActivate: [LoginGuard] },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const appRouting = RouterModule.forRoot(routes);
