import { PostsService } from './../api/services/posts.service';
import { PostView } from './../api/models/post-view';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  private _topicId!: string;

  posts : PostView[] = [];

  constructor(private postsService: PostsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
    //.filter(params => params.order)
    .subscribe(params => {
      console.log(params); // { order: "popular" }
      this._topicId = params['id'];
      // this.order = params.order;
      // console.log(this.order); // popular
    });

    this.postsService.apiPostsBytopicIdGet$Json({id: this._topicId}).subscribe((data: PostView[])=>{
      console.log(data);
      this.posts = data;
    });
  }

  @ViewChild('postaccordion')  postPanels!: MatAccordion;
}

