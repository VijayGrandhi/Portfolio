import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicexpComponent } from './academicexp.component';

describe('AcademicexpComponent', () => {
  let component: AcademicexpComponent;
  let fixture: ComponentFixture<AcademicexpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicexpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicexpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
