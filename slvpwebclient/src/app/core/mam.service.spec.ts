import { TestBed } from '@angular/core/testing';

import { MamService } from './mam.service';

describe('MamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MamService = TestBed.get(MamService);
    expect(service).toBeTruthy();
  });
});
