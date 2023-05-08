import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarCursosComponent } from './mostrar-cursos.component';

describe('MostrarCursosComponent', () => {
  let component: MostrarCursosComponent;
  let fixture: ComponentFixture<MostrarCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarCursosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
