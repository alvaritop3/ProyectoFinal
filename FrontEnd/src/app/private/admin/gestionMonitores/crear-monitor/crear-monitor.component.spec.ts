import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearMonitorComponent } from './crear-monitor.component';

describe('CrearMonitorComponent', () => {
  let component: CrearMonitorComponent;
  let fixture: ComponentFixture<CrearMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearMonitorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
