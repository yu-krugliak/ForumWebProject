import { PostListComponent } from './post-list/post-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import HomeComponent from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { RoutesConstants } from './shared/route-constants';

const routes: Routes = [
  { path: '', redirectTo: RoutesConstants.Home, pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component:  LoginFormComponent},
  { path: 'register', component:  RegisterFormComponent},
  { path: 'topic', component: PostListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
