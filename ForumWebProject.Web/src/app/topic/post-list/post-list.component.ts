import { Observable } from 'rxjs';
import { PostRequest } from './../../api/models/post-request';
import { PostsService } from './../../api/services/posts.service';
import { PostView } from './../../api/models/post-view';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PermissionsManager } from '../../services/permissions-service';
import { HasPermissionDirective } from 'src/app/directives/permission-directive';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  private _topicId!: string;
  protected post: PostView = {};
  images: number[] = [];

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
      this.images =[];
      this.getRandomImage();
    });
  }

  reply(replyToPost: PostView | undefined){
    this.smoothScrollToInput();

    this.post.replyTo = replyToPost;
    this.post.replyToPostId = replyToPost?.id;
    console.log(this.post);
  }

  closeReply(){
    this.post.replyToPostId = undefined;
    this.post.replyTo = undefined;
  }

  send() : void{
    let request: PostRequest = ({
      text: this.post.text,
      topicId: this._topicId,
      replyToPostId: this.post.replyToPostId,
    });

    if(!this.post.id){
      this.addNewPost(request);
    }
    else{
      this.editPost(request);
    }

    this.post = {};
  }

  private addNewPost(request: PostRequest) {
    console.log(this.post);

    this.postsService.apiPostsPost$Json({ body: request }).subscribe((data: PostView) => {
      console.log(data);
      this.refresh();
    });
  }

  private editPost(request: PostRequest) {
    console.log(request);

    this.postsService.apiPostsPostIdPut$Response({postId: this.post.id!, body:request}).subscribe(() => {
      console.log("editing...");
      this.refresh();
    });
  }

  delete(postIdToDelete: string){

    this.postsService.apiPostsPostIdDelete$Response({postId: postIdToDelete}).subscribe(() =>{
      this.refresh();
    });

    if(this.post.id === postIdToDelete){
      this.post = {};
    }

    if(this.post.replyToPostId === postIdToDelete){
      this.post.replyTo = undefined;
      this.post.replyToPostId = undefined;
    }

    this.openSnackBar("Post has been deleted😢", "Thanks");
  }

  edit(postToEdit: PostView){
    this.smoothScrollToInput();
    this.post = {...postToEdit};
  }

  smoothScrollToInput(){
    const inputElement = (<HTMLInputElement>document.getElementById("new-post-text"));
    inputElement.focus({preventScroll: true});
    inputElement.scrollIntoView({
      behavior: "smooth"
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 3000});
  }

  getRandomImage(): void{
    for(var i = 0; i < this.posts.length; i++){
      this.images.push((Math.floor( Math.random() * 25)) + 1);
    }
  }
}

