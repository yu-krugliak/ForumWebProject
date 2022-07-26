import { HasPermissionDirective } from './directives/permission-directive';
//import { PostEditFormComponent } from './topic/post-editor/
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Provider, forwardRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AboutComponent } from './about/about.component';
import { PostListComponent } from './topic/post-list/post-list.component';
import HomeComponent from './home/home-categories/home.component';
import { CategoryStepperComponent } from './home/category-stepper/category-stepper.component';

import { MaterialModule } from './material.module';

import { ApiModule } from './api/api.module';
import { ApiInterceptor } from './services/api-interceptor.service';
import { LoginFormComponent } from './authentication/login-form/login-form.component';
import { RegisterFormComponent } from './authentication/register-form/register-form.component';
import { WelcomeDialogComponent } from './authentication/welcome-dialog/welcome-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { PermissionsManager } from './services/permissions-service';
import { PostEditorComponent } from './topic/post-editor/post-editor.component';
import { TopicStepperComponent } from './home/topic-stepper/topic-stepper.component';
import { UserCardComponent } from './user-card/user-card.component';

export const API_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useExisting: forwardRef(() => ApiInterceptor),
  multi: true
};

@NgModule({
  declarations: [
    AppComponent,
    
    HomeComponent,
    AboutComponent,
    LoginFormComponent,
    RegisterFormComponent,
    PostListComponent,
    PostEditorComponent,
    WelcomeDialogComponent,
    CategoryStepperComponent,
    TopicStepperComponent,
    UserCardComponent,

    HasPermissionDirective
  ],

  imports: [
    AppRoutingModule,
    HttpClientModule,
    ApiModule.forRoot({rootUrl: 'http://localhost:5069'}),

    BrowserModule, ReactiveFormsModule, MaterialModule, BrowserAnimationsModule, FormsModule
  ],
  
  providers: [
    ApiInterceptor,
    API_INTERCEPTOR_PROVIDER,
    {
      provide: MatDialogRef,
      useValue: {}
    },
    PermissionsManager
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
