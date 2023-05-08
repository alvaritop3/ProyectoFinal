import { TestBed } from '@angular/core/testing';

import { DatosTutorService } from './datos-tutor.service';

describe('DatosTutorService', () => {
  let service: DatosTutorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosTutorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
