import { TestBed } from '@angular/core/testing';

import { DatosAlumnoService } from './datos-alumno.service';

describe('DatosAlumnoService', () => {
  let service: DatosAlumnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosAlumnoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
