import { PostView } from './../../api/models/post-view';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HasPermissionDirective } from 'src/app/directives/permission-directive';
import { PermissionsManager } from 'src/app/services/permissions-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css']
})
export class PostEditorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  @Input() post: PostView = {};

  @Output() sendPost = new EventEmitter<void>();

  sendPostToParent() {
    const inputElement = (<HTMLInputElement>document.getElementById("new-post-text"));
    this.sendPost.emit();
    inputElement.scrollIntoView();
  }

  stopEditing(){
    this.post.id = undefined;
    this.post.replyTo = undefined;
    this.post.replyToPostId = undefined;
    this.post.text = undefined;

    console.log("STOP");
  }

  closeReply(){
    this.post!.replyTo = undefined;
    this.post!.replyToPostId = undefined;
  }
}
