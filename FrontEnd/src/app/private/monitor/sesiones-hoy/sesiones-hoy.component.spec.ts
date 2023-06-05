import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionesHoyComponent } from './sesiones-hoy.component';

describe('SesionesHoyComponent', () => {
  let component: SesionesHoyComponent;
  let fixture: ComponentFixture<SesionesHoyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SesionesHoyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SesionesHoyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
