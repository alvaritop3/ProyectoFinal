import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMonitoresComponent } from './ver-monitores.component';

describe('VerMonitoresComponent', () => {
  let component: VerMonitoresComponent;
  let fixture: ComponentFixture<VerMonitoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerMonitoresComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VerMonitoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
