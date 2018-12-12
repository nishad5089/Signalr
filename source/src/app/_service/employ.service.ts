import { Employee } from './../Models/employee';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class EmployService {
  selectedEmployee: Employee;
  url = 'http://localhost:5000/api/employee';

constructor(private http: HttpClient) { }

getEmployees(): Observable<Employee[]> {
  return this.http.get<Employee[]>(this.url);
}
getEmployeeById(employeeId: string): Observable<Employee> {

  return this.http.get<Employee>(this.url + '/' + employeeId).map(response => <Employee>response);
}
createEmployee(employee: Employee): Observable<Employee> {

     const httpHeaders = new HttpHeaders().set('Content-type' , 'application/json');
   const options = {headers: httpHeaders};
  return this.http.post<Employee>(this.url, employee, options);
}
updateEmployee(employee: Employee): Observable<number> {
  const headers = new HttpHeaders().set('Content-type' , 'application/json');
  const options = {headers: headers};

  return this.http.put<number>(this.url + '/' + employee.id, employee, options);
}
deleteEmployee(employeeId: string): Observable<number>  {
  const headers = new HttpHeaders().set('Content-type' , 'application/json');
  return this.http.delete<number>(this.url + '/' + employeeId);
}
}
