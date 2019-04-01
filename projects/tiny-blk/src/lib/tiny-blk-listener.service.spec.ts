import { TestBed } from '@angular/core/testing';

import { TinyBlkListenerService } from './tiny-blk-listener.service';

describe('GvSblService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TinyBlkListenerService = TestBed.get(TinyBlkListenerService);
    expect(service).toBeTruthy();
  });
});
