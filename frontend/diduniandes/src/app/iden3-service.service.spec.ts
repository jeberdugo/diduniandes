import { TestBed } from '@angular/core/testing';

import { Iden3ServiceService } from './iden3-service.service';

describe('Iden3ServiceService', () => {
  let service: Iden3ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Iden3ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
