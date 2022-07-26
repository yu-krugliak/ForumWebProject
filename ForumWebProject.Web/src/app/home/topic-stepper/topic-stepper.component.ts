import { TopicView } from './../../api/models/topic-view';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { Category } from 'src/app/api/models/category';

@Component({
  selector: 'app-topic-stepper',
  templateUrl: './topic-stepper.component.html',
  styleUrls: ['./topic-stepper.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class TopicStepperComponent implements OnInit {

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
  @Input() addCatFlag: boolean = false;
  @Input() topic: TopicView = {};
  @Input() addTopicFlag: boolean = false;

  @Output() send = new EventEmitter<void>();

  sendPostToParent() {

    if(this.addTopicFlag){
      this.topic.name = this.firstFormGroup.controls["name"].value;
      this.topic.description = this.secondFormGroup.controls["desc"].value;
      this.send.emit();
      return;
    }

    this.category.name = this.firstFormGroup.controls["name"].value;
    this.category.description = this.secondFormGroup.controls["desc"].value;
    this.addCatFlag = false;

    this.send.emit();
  }

  stopEditing(){
    console.log("STOP");

    if(this.addTopicFlag){
      this.topic.id = undefined;
      this.topic.name = undefined;
      this.topic.description = undefined;
      this.addTopicFlag = false;
      return;
    }

    this.category.id = undefined;
    this.category.name = undefined;
    this.category.description = undefined;
    this.addCatFlag = false;
  }
}

