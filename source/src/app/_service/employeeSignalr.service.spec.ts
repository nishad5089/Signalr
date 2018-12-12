/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmployeeSignalrService } from './employeeSignalr.service';

describe('Service: EmployeeSignalr', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeSignalrService]
    });
  });

  it('should ...', inject([EmployeeSignalrService], (service: EmployeeSignalrService) => {
    expect(service).toBeTruthy();
  }));
});
