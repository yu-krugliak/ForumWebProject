import { TopicView } from './../../api/models/topic-view';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { Category } from 'src/app/api/models/category';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from '../dialog-data';

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

  constructor(private _formBuilder: FormBuilder, public dialogRef: MatDialogRef<TopicStepperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
  }

  // @Input() topic: TopicView = {};
  // @Input() addTopicFlag: boolean = false;
  // @Input() confirmPost: boolean = false;

  

  // @Output() sendTopic = new EventEmitter<void>();

  sendPostToParent() {
    // this.topic.name = this.firstFormGroup.controls["name"].value;
    // this.topic.description = this.secondFormGroup.controls["desc"].value;
    //this.addTopicFlag = false;
    // this.dialogRef.close();
    this.data.confirmPost = true;

    this.dialogRef.close(this.data);
  }

  stopEditing(){
    console.log("STOP");
    this.data.topic.id = undefined;
    this.data.topic.name = undefined;
    this.data.topic.description = undefined;
    this.data.addTopicFlag = false;
    this.data.confirmPost = false;

    this.dialogRef.close(this.data);
  }
}

