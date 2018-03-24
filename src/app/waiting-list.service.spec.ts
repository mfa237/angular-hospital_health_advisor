import { TestBed, inject } from '@angular/core/testing';

import { WaitingListService } from './waiting-list.service';

describe('WaitingListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WaitingListService]
    });
  });

  it('should be created', inject([WaitingListService], (service: WaitingListService) => {
    expect(service).toBeTruthy();
  }));
});
