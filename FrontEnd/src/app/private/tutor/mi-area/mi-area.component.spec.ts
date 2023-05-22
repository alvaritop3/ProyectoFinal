import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiAreaComponent } from './mi-area.component';

describe('MiAreaComponent', () => {
  let component: MiAreaComponent;
  let fixture: ComponentFixture<MiAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
