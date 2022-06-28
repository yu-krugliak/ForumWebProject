import { LoginFormComponent } from './../login-form/login-form.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryView } from '../api/models/category-view';
import { TopicView } from './../api/models/topic-view';
import { TokenRequest } from '../api/models/token-request';
import { TokenResponse } from '../api/models/token-response';
import { TokenService } from '../api/services';
import { CategoriesService } from '../api/services/categories.service';
import { TopicService } from './../api/services/topic.service';
import { MatAccordion } from '@angular/material/expansion';
import { Category } from '../api/models/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export default class HomeComponent implements OnInit {

   categories : Category[] = [];

  constructor(private categoriesService: CategoriesService, private topicService: TopicService,
     private tokenService: TokenService, private dialog: MatDialog){}

  ngOnInit() {

    this.categoriesService.apiCategoriesGet$Json().subscribe((data: CategoryView[])=>{
        console.log(data);

        data.forEach(d => {

          let cat : Category = ({
            id: d.id,
            name: d.name,
            description: d.description,
            parentCategoryId: d.parentCategoryId,
          });

          this.topicService.apiTopicBycategoryIdGet$Json({id: d.id}).subscribe((topic: TopicView[])=>{
            console.log(topic);
            cat.topics = topic;
          }) 

          this.categories.push(cat);
        });
      })  
  }

  testLogin(){
    let loginData : TokenRequest = {
      email: "sadpepe@gmail.com",
      password: "secure"
    };

    this.tokenService.apiTokenPost({body: loginData})
    .subscribe((r: TokenResponse) => {
        localStorage.setItem("token", r.token);
        console.log(r.token);
    });
  }

  openLoginDialog(enterAnimationDuration: string, exitAnimationDuration: string){
    this.dialog.open(LoginFormComponent, {
      // width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  @ViewChild('homeaccordion')  homePanels!: MatAccordion;

  openAll(){
    this.homePanels.openAll();
  }

  closeAll(){
    this.homePanels.closeAll();
  }

  substr(s: any, start: number, end: number) : string{
    return s.substring(start, end);
  }

  getTopicsByCategory(categoryId : any) : TopicView[]{
    let topics :TopicView[] =[];

    this.topicService.apiTopicBycategoryIdGet$Json({id: categoryId}).subscribe((data: TopicView[])=>{
      console.log(data);
      topics = data;
    }) 
    
    return topics;
  }
}

