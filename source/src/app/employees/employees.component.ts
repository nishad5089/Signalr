import { EmployService } from './../_service/employ.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {

  constructor(private employeeService: EmployService) { }

  ngOnInit() {
  }

}
