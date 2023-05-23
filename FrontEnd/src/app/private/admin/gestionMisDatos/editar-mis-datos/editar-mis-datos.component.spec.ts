import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMisDatosComponent } from './editar-mis-datos.component';

describe('EditarMisDatosComponent', () => {
  let component: EditarMisDatosComponent;
  let fixture: ComponentFixture<EditarMisDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarMisDatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarMisDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
