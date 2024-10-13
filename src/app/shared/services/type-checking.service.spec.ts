import { TestBed } from '@angular/core/testing';

import { TypeCheckingService } from './type-checking.service';

describe('TypeCheckingService', () => {
  let service: TypeCheckingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeCheckingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
