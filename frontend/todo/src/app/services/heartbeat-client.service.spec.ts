import { TestBed } from '@angular/core/testing';

import { HeartbeatClientService } from './heartbeat-client.service';

describe('HeartbeatClientService', () => {
  let service: HeartbeatClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeartbeatClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
