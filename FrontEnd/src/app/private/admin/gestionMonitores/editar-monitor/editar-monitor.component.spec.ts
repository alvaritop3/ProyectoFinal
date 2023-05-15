import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMonitorComponent } from './editar-monitor.component';

describe('EditarMonitorComponent', () => {
  let component: EditarMonitorComponent;
  let fixture: ComponentFixture<EditarMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarMonitorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
