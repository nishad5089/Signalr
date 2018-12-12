/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmployService } from './employ.service';

describe('Service: Employ', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployService]
    });
  });

  it('should ...', inject([EmployService], (service: EmployService) => {
    expect(service).toBeTruthy();
  }));
});
