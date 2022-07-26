import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicStepperComponent } from './topic-stepper.component';

describe('TopicStepperComponent', () => {
  let component: TopicStepperComponent;
  let fixture: ComponentFixture<TopicStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicStepperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
