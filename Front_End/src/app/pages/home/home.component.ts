import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateNewEmployee() {
    this.router.navigate(['home/new-employee']);
  }
  navigateEmployeeInformation() {
    this.router.navigate(['home/employee-information']);
  }
  navigateFireEmployee() {
    this.router.navigate(['home/fire-employee']);
  }
  navigatePayroll() {
    this.router.navigate(['home/payroll']);
  }

  navigateLogin() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }



}
