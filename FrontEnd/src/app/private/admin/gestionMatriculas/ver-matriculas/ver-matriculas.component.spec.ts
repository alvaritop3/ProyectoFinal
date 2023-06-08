import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMatriculasComponent } from './ver-matriculas.component';

describe('VerMatriculasComponent', () => {
  let component: VerMatriculasComponent;
  let fixture: ComponentFixture<VerMatriculasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerMatriculasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VerMatriculasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
