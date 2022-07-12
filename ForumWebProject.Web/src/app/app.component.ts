import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from './api/services';
import { LoginFormComponent } from './login-form/login-form.component';
import { RoutesConstants } from './shared/route-constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Forum';
  private _redirect: string = '';

  constructor(private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); 
        this._redirect = params['redirect'] ?? undefined;
    });
  }


  @Output() login: EventEmitter<any> = new EventEmitter();

  pressLogin(){
    this.login.emit(null);
  }

  openLoginFormWithRedirectParam(){
    var href = this.router.url;
    console.log(href);
    this.router.navigate([RoutesConstants.Login], {queryParams: {redirect: this._redirect ?? href}});
  }

  openRegisterFormWithRedirectParam(){
    var href = this.router.url;
    console.log(href);
    this.router.navigate([RoutesConstants.Register], {queryParams: {redirect: this._redirect ?? href}});
  }

  logout(){
    localStorage.clear();
    //window.location.reload();
    var href = this.router.url;
    this.router.navigateByUrl(href);
  }

  isLogged():boolean{
    if(localStorage.getItem("token")){
      return true;
    }
    return false;
  }
  // openLoginDialog(enterAnimationDuration: string, exitAnimationDuration: string){
  //   this.dialog.open(LoginFormComponent, {
  //     // width: '250px',
  //     enterAnimationDuration,
  //     exitAnimationDuration,
  //   });
  // }
}
