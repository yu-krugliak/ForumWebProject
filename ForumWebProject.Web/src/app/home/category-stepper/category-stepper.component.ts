import { TopicView } from './../../api/models/topic-view';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { Category } from 'src/app/api/models/category';

@Component({
  selector: 'app-category-stepper',
  templateUrl: './category-stepper.component.html',
  styleUrls: ['./category-stepper.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class CategoryStepperComponent implements OnInit {

  firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    desc: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
  }

  @Input() category: Category = {};
  @Input() addCatFlag: boolean = true;

  @Output() send = new EventEmitter<void>();

  sendCategoryToParent() {
    this.category.name = this.firstFormGroup.controls["name"].value;
    this.category.description = this.secondFormGroup.controls["desc"].value;
    //this.addCatFlag = false;

    this.send.emit();
  }

  stopEditing(){
    console.log("STOP");

    this.category.id = undefined;
    this.category.name = undefined;
    this.category.description = undefined;
    this.addCatFlag = false;
  }
}
