import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private eService: EmployeeServiceService) {
    this.creatForm();
  }

  ngOnInit(): void {
  }
  creatForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required], []],
      password: ['', [Validators.required], []],
    });
  }

  postData() {
      this.eService.getToken(this.form.get('username').value, this.form.get('password').value)
      .subscribe((resp: any) => {
        localStorage.setItem('token', resp.token);
        this.router.navigate(['/home']);
      },(recj) => {
        console.log(recj.error),
        Swal.fire(
          'Datos incorrectos',
          '',
          'error'
        );
      });
  }
}
