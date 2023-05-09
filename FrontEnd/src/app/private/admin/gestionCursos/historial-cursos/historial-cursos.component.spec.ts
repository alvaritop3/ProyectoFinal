import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialCursosComponent } from './historial-cursos.component';

describe('HistorialCursosComponent', () => {
  let component: HistorialCursosComponent;
  let fixture: ComponentFixture<HistorialCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialCursosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
