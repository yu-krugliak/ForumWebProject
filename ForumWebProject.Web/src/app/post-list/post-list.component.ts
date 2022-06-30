import { PostRequest } from './../api/models/post-request';
import { PostsService } from './../api/services/posts.service';
import { PostView } from './../api/models/post-view';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  private _topicId!: string;
  _replyToPost: PostView | undefined;

  posts : PostView[] = [];

  constructor(private postsService: PostsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
    //.filter(params => params.order)
    .subscribe(params => {
      console.log(params); 
      this._topicId = params['id'];
    });

    this.refresh();
  }
  refresh(){
    this.postsService.apiPostsBytopicIdGet$Json({id: this._topicId}).subscribe((data: PostView[])=>{
      console.log(data);
      this.posts = data;
    });
  }

  reply(replyToPost: PostView | undefined){
    this._replyToPost = replyToPost;
  }

  closeReply(){
    this._replyToPost = undefined;
  }

  send() : void{
    let request: PostRequest = ({
      text: (<HTMLInputElement>document.getElementById("new-post-text")).value,
      topicId: this._topicId,
      replyToPostId: this._replyToPost?.id,
    });
    (<HTMLInputElement>document.getElementById("new-post-text")).value = '';
    console.log(request);

    this.postsService.apiPostsPost$Json({body: request}).subscribe((data: PostView) =>{
        console.log(data);
    });
    this._replyToPost = undefined;
    this.refresh();
  }
}

