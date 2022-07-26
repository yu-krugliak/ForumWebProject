import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryStepperComponent } from './category-stepper.component';

describe('CategoryStepperComponent', () => {
  let component: CategoryStepperComponent;
  let fixture: ComponentFixture<CategoryStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryStepperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
