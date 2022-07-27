import { TopicStepperComponent } from './../topic-stepper/topic-stepper.component';
import { TopicRequest } from './../../api/models/topic-request';
import { CategoryRequest } from './../../api/models/category-request';
import { Category } from './../../api/models/category';
import { LoginFormComponent } from '../../authentication/login-form/login-form.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryView } from '../../api/models/category-view';
import { TopicView } from './../../api/models/topic-view';
import { TokenRequest } from '../../api/models/token-request';
import { TokenResponse } from '../../api/models/token-response';
import { TokenService } from '../../api/services';
import { CategoriesService } from '../../api/services/categories.service';
import { TopicService } from './../../api/services/topic.service';
import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export default class HomeComponent implements OnInit {

   categories : Category[] = [];
   protected category: Category = {};
   protected addCatFlag: boolean = false;
   protected topic: TopicView = {};
   protected addTopicFlag: boolean = false;
   protected confirmPost: boolean = false;

  constructor(private categoriesService: CategoriesService, private topicService: TopicService,
     private tokenService: TokenService, private dialog: MatDialog, private snackBar: MatSnackBar,
     private viewPortScroller: ViewportScroller){}

  ngOnInit() {
    this.refresh();
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

  refresh(){
    this.categories = [];
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

  getTopicsByCategory(categoryId : any) : TopicView[]{
    let topics: TopicView[] =[];

    this.topicService.apiTopicBycategoryIdGet$Json({id: categoryId}).subscribe((data: TopicView[])=>{
      console.log(data);
      topics = data;
    }) 
    
    return topics;
  }

  sendTopic() {
    let request: TopicRequest = ({
      name: this.topic.name,
      description: this.topic.description,
      categoryId: this.topic.categoryId,
    });
    console.log(request);
    
    if (!this.topic.id) {
      this.addNewTopic(request);
      this.addTopicFlag = false;
    }
    else {
      this.editTopic(request);
    }

    this.confirmPost = false;
    this.topic = {};
  }

  private addNewTopic(request: TopicRequest) {
    console.log(this.topic);

    this.topicService.apiTopicPost$Json({ body: request }).subscribe((data: TopicRequest) => {
      console.log(data);
      this.refresh();
    });
  }

  private editTopic(request: TopicRequest) {
    console.log(request);

    this.topicService.apiTopicTopicIdPut$Response({topicId: this.topic.id!, body:request}).subscribe(() => {
      console.log("editing topic...");
      this.refresh();
    });
  }

  sendCategory() {
    let request: CategoryRequest = ({
      name: this.category.name,
      description: this.category.description
    });

    if (!this.category.id) {
      this.addNewCategory(request);
      this.addCatFlag = false;
    }
    else {
      this.editCategory(request);
    }

    this.category = {};
  }

  private addNewCategory(request: CategoryRequest) {
    console.log(this.category);

    this.categoriesService.apiCategoriesPost$Json({ body: request }).subscribe((data: CategoryView) => {
      console.log(data);
      this.refresh();
    });
  }

  private editCategory(request: CategoryRequest) {
    console.log(request);

    this.categoriesService.apiCategoriesCategoryIdPut$Response({categoryId: this.category.id!, body:request}).subscribe(() => {
      console.log("editing category...");
      this.refresh();
    });
  }

  addCategory(){
    this.addCatFlag = true;
    this.category = {};
    this.smoothScrollToInput("stepper");
  }

  addTopic(categoryId: string){
    this.addTopicFlag = true;
    this.topic.categoryId = categoryId;
    this.managgingDialog();
  }

  editTopicButton(categoryId: string, topic: TopicView){
    this.addTopicFlag = false;
    this.topic.categoryId = categoryId;
    this.topic = topic;
    this.managgingDialog();
  }

  managgingDialog(){
    const dialogRef = this.dialog.open(TopicStepperComponent, {
      width: '450px',
      data: {topic: this.topic, addTopicFlag: this.addTopicFlag, confirmPost: this.confirmPost},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The topic stepper was closed');
      console.log(result);
      this.topic = result.topic;
      this.addTopicFlag = result.addTopicFlag;
      this.confirmPost = result.confirmPost;

      if(this.confirmPost){
        this.sendTopic();
      }
    });
  }

  edit(categoryToEdit: Category){
    this.smoothScrollToInput("stepper");
    this.category = {...categoryToEdit};
  }

  deleteCategory(categoryIdToDelete: string){

    this.categoriesService.apiCategoriesCategoryIdDelete$Response({categoryId: categoryIdToDelete}).subscribe(() =>{
      this.refresh();
    });

    if(this.category.id === categoryIdToDelete){
      this.category = {};
    }

    this.openSnackBar("Category has been deleted😢", "Thanks");
  }

  deleteTopic(topicIdToDelete: string){
    this.topicService.apiTopicTopicIdDelete$Response({topicId: topicIdToDelete}).subscribe(() =>{
      this.refresh();
    });

    if(this.topic.id === topicIdToDelete){
      this.topic = {};
    }

    this.openSnackBar("Topic has been deleted😢", "Thanks");
  }

  openTopicDialog(enterAnimationDuration: string, exitAnimationDuration: string){
    this.dialog.open(TopicStepperComponent, {
      // width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  smoothScrollToInput(elementId: string): void{
    this.viewPortScroller.scrollToAnchor(elementId);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 3000});
  }

}

