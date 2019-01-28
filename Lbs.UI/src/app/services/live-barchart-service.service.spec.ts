import { TestBed } from '@angular/core/testing';

import { LiveBarchartServiceService } from './live-barchart-service.service';

describe('LiveBarchartServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LiveBarchartServiceService = TestBed.get(LiveBarchartServiceService);
    expect(service).toBeTruthy();
  });
});
