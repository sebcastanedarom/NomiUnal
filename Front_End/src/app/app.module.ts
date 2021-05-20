import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NewEmployeeComponent } from './pages/new-employee/new-employee.component';
import { EmployeeInformationComponent } from './pages/employee-information/employee-information.component';
import { FireEmployeeComponent } from './pages/fire-employee/fire-employee.component';
import { PayrollComponent } from './pages/payroll/payroll.component';
import { LoginComponent } from './login/login/login.component';
import { appRouting } from './app.routes';
import { NavbarComponent } from './shared/navbar/navbar.component';
import {  ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SummaryEmployeeCardComponent } from './shared/summary-employee-card/summary-employee-card.component';
import { EmployeePerfilComponent } from './pages/employee-information/employee-perfil/employee-perfil.component';
import { FireEmpoloyeePerfilComponent } from './pages/fire-employee/fire-empoloyee-perfil/fire-empoloyee-perfil.component';
import { PaymentReportComponent } from './pages/employee-information/payment-report/payment-report.component';
import { ExtraHoursComponent } from './pages/employee-information/extra-hours/extra-hours.component';
import { EditInformationComponent } from './pages/employee-information/edit-information/edit-information.component';
import { PaymentsComponent } from './pages/employee-information/payments/payments.component';
import { AbsencesComponent } from './pages/employee-information/absences/absences.component';
import { DiscountsComponent } from './pages/employee-information/discounts/discounts.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewEmployeeComponent,
    EmployeeInformationComponent,
    FireEmployeeComponent,
    PayrollComponent,
    LoginComponent,
    NavbarComponent,
    SummaryEmployeeCardComponent,
    EmployeePerfilComponent,
    FireEmpoloyeePerfilComponent,
    PaymentReportComponent,
    ExtraHoursComponent,
    EditInformationComponent,
    PaymentsComponent,
    AbsencesComponent,
    DiscountsComponent
  ],
  imports: [
    BrowserModule,
    appRouting,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    MDBBootstrapModule.forRoot()    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
