import { Component, OnInit, Input } from '@angular/core';
import { EmployeeModel } from '../../models/employee.model';

@Component({
  selector: 'app-summary-employee-card',
  templateUrl: './summary-employee-card.component.html',
  styleUrls: ['./summary-employee-card.component.css']
})
export class SummaryEmployeeCardComponent implements OnInit {

  constructor() { }
  @Input() employee: EmployeeModel;
  @Input() index: number;
  ngOnInit(): void {

  }

}
