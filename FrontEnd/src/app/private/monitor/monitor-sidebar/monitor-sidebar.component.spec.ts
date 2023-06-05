import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorSidebarComponent } from './monitor-sidebar.component';

describe('MonitorSidebarComponent', () => {
  let component: MonitorSidebarComponent;
  let fixture: ComponentFixture<MonitorSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitorSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitorSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
