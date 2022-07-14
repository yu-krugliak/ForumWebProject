import { PostRequest } from './../../api/models/post-request';
import { PostsService } from './../../api/services/posts.service';
import { PostView } from './../../api/models/post-view';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PermissionsManager } from '../../services/permissions-service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  private _topicId!: string;
  _replyToPost: PostView | undefined;

  posts : PostView[] = [];

  constructor(private postsService: PostsService, public permissionsManager: PermissionsManager,
    private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.queryParams
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
    const inputElement = (<HTMLInputElement>document.getElementById("new-post-text"));
    inputElement.focus({preventScroll: true});
    inputElement.scrollIntoView({
      behavior: "smooth"
    });
    this._replyToPost = replyToPost;
  }

  closeReply(){
    this._replyToPost = undefined;
  }

  send() : void{
    const inputElement = (<HTMLInputElement>document.getElementById("new-post-text"));
    let request: PostRequest = ({
      text: inputElement.value,
      topicId: this._topicId,
      replyToPostId: this._replyToPost?.id,
    });

    inputElement.value = '';
    console.log(request);

    this.postsService.apiPostsPost$Json({body: request}).subscribe((data: PostView) =>{
        console.log(data);
        this.refresh();
    });
    
    this._replyToPost = undefined;
    inputElement.scrollIntoView();
  }

  delete(postIdToDelete: string){

    this.postsService.apiPostsPostIdDelete$Response({postId: postIdToDelete}).subscribe(() =>{
      this.refresh();
    });

    this.openSnackBar("Post has been deleted😢", "Thanks");
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}

