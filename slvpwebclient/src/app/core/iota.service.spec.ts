import { TestBed } from '@angular/core/testing';

import { IotaService } from './iota.service';

describe('IotaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IotaService = TestBed.get(IotaService);
    expect(service).toBeTruthy();
  });
});
