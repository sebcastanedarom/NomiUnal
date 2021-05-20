import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { EmployeeServiceService } from '../services/employee-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router,
              private eService: EmployeeServiceService){
    }

    canActivate(): boolean {
      if (this.eService.islogin()) {
        return true;
      } else{
        this.router.navigate(['/login']);
        return false;
      }
     }
}
