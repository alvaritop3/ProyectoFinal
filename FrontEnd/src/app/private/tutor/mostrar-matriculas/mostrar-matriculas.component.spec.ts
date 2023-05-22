import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarMatriculasComponent } from './mostrar-matriculas.component';

describe('MostrarMatriculasComponent', () => {
  let component: MostrarMatriculasComponent;
  let fixture: ComponentFixture<MostrarMatriculasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarMatriculasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarMatriculasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
