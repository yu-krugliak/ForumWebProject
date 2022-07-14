import { PostListComponent } from './topic/post-list/post-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import HomeComponent from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginFormComponent } from './authentication/login-form/login-form.component';
import { RegisterFormComponent } from './authentication/register-form/register-form.component';
import { RoutesConstants } from './services/route-constants';
import { LogoutComponent } from './authentication/logout/logout.component';

const routes: Routes = [
  { path: '', redirectTo: RoutesConstants.Home, pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component:  LoginFormComponent},
  { path: 'register', component:  RegisterFormComponent},
  { path: 'topic', component: PostListComponent},
  { path: 'logout', component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
