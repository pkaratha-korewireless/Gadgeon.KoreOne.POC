/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiSubscribeService } from './api-subscribe.service';

describe('Service: ApiSubscribe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiSubscribeService]
    });
  });

  it('should ...', inject([ApiSubscribeService], (service: ApiSubscribeService) => {
    expect(service).toBeTruthy();
  }));
});
