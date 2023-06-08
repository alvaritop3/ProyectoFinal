import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMonitorComponent } from './detalle-monitor.component';

describe('DetalleMonitorComponent', () => {
  let component: DetalleMonitorComponent;
  let fixture: ComponentFixture<DetalleMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleMonitorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
