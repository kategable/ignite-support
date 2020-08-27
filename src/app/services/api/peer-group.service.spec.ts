import { TestBed } from '@angular/core/testing';

import { PeerGroupService } from './peer-group.service';

describe('PeerGroupService', () => {
  let service: PeerGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeerGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
