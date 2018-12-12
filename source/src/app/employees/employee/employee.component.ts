import { Employee } from './../../Models/employee';

import { Observable } from 'rxjs/Observable';
import { EmployService } from './../../_service/employ.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { ToastrService } from '../../../../node_modules/ngx-toastr';

import { FormBuilder, Validators, FormGroup } from '../../../../node_modules/@angular/forms';
import { HubConnection, HubConnectionBuilder } from '../../../../node_modules/@aspnet/signalr';
import { EmployeeSignalrService } from '../../_service/employeeSignalr.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  // radioChecked: any;
  private _hubConnection: HubConnection;
  dataSaved = false;
  employeeForm: FormGroup;
  allEmployees: Employee[];
  employeeIdToUpdate = null;
  message = null;

  employees: Employee[];
  constructor(private formBuilder: FormBuilder,    private _ngZone: NgZone,
    public employeeService: EmployService, private toastr: ToastrService, private employeeSignalrService: EmployeeSignalrService) {

    }

  ngOnInit() {
    this.employeeSignalrService.messageReceived.subscribe((employee: Employee) => {
  this.allEmployees.push(employee);
localStorage.setItem('user', JSON.stringify(employee));
  });
    // this done into employeeSignalrService
    // this._hubConnection = new HubConnectionBuilder()
    // .withUrl('http://localhost:5000/employee')
    // .build();

    // this._hubConnection.on('Send', (data: any) => {
    //   this.loadAllEmployees();
    // });
    // this._hubConnection
    // .start()
    // .then(() => {
    //  // this.connectionIsEstablished = true;
    //   console.log('Hub connection started');
    //  // this.connectionEstablished.emit(true);
    // });
    this.employeeForm = this.formBuilder.group({
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Designation: ['', [Validators.required]],
      Gender: ['', [Validators.required]],
      Address: ['', [Validators.required]],
    });
    this.loadAllEmployees();
  }
  loadAllEmployees() {
    this.employeeService.getEmployees().subscribe((data: Employee[]) => {
         this.allEmployees = data;
    });

  // console.log(this.allEmployees);
  }
  onFormSubmit() {
    this.dataSaved = false;
    const employee = this.employeeForm.value;
    this.createEmployee(employee);
    this.employeeForm.reset();
  }
  createEmployee(employee: Employee) {
    if (this.employeeIdToUpdate == null) {
      this.employeeForm.reset();
      this.employeeService.createEmployee(employee).subscribe(() => {
        this.dataSaved = true;
        this.message = 'record Saved Successfully';
       this.loadAllEmployees();
       this.employeeIdToUpdate = null;
        this.toastr.success('New Record Added Succcessfully', 'Employee Register');
      });
     } else {
      employee.id = this.employeeIdToUpdate;
      this.employeeService.updateEmployee(employee).subscribe(() => {
        this.dataSaved = true;
        this.message = 'record Saved Successfully';
       this.loadAllEmployees();
       this.employeeForm.reset();
       this.toastr.success('Updated Succcessfully', 'Employee Register');

      });
     }
  }
  loadEmployeeToEdit(empId: string) {

    this.employeeService.getEmployeeById(empId).subscribe((employee: Employee) => {
      this.dataSaved = false;
this.message = null;

this.employeeIdToUpdate = employee.id;
// this.radioChecked = employee.gender.toString();

// console.log(this.radioChecked);
this.employeeForm.controls['FirstName'].setValue(employee.firstName);
this.employeeForm.controls['LastName'].setValue(employee.lastName);
this.employeeForm.controls['Email'].setValue(employee.email);
this.employeeForm.controls['Designation'].setValue(employee.designation);
this.employeeForm.controls['Gender'].setValue(`${employee.gender}`);
// this.employeeForm.controls['Gender'].setValue(employee.gender.toString());
this.employeeForm.controls['Address'].setValue(employee.address);

    });
  }
  deleteEmployee(empId: string) {
    if (confirm('Are you sure to delete this record ?')) {
      this.employeeService.deleteEmployee(empId).subscribe((employee) => {
        this.employeeForm.reset();
        this.loadAllEmployees();
        this.dataSaved = true;
        this.message = 'Deleted Successfully';
        this.employeeIdToUpdate = null;

            });
    }
  }
  resetForm() {
    this.employeeForm.reset();
    this.dataSaved = false;
    this.message = null;
  }
//   resetForm(form?: NgForm) {
//   if (form != null) {
//       form.reset();
//   }
//   this.employeeService.selectedEmployee = {
//     'Id' : '',
//     'FirstName' : '',
//     'LastName' : '',
//     'Gender' : null,
//     'Email' : '',
//     'Designation' : '',
//     'Address' : '' };

// }

// onSubmit(form: NgForm) {
//   if (form.value.EmployeeID == null) {
//     this.employeeService.createEmployee(form.value)
//       .subscribe(data => {
//         this.resetForm(form);
//         this.employeeService.getEmployees();
//        this.toastr.success('New Record Added Succcessfully', 'Employee Register');
//       });
//   } else {
//     this.employeeService.updateEmployee(form.value)
//     .subscribe(data => {
//       this.resetForm(form);
//       this.employeeService.getEmployees();
//       this.toastr.info('Record Updated Successfully!', 'Employee Register');
//     });
//   }
// }
}
