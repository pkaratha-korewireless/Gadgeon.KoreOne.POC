/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiGetService } from './api-get.service';

describe('Service: ApiGet', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiGetService]
    });
  });

  it('should ...', inject([ApiGetService], (service: ApiGetService) => {
    expect(service).toBeTruthy();
  }));
});
