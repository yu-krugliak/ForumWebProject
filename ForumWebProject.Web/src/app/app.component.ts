import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from './api/services';
import { LoginFormComponent } from './login-form/login-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Forum';

  constructor(private tokenService: TokenService, private dialog: MatDialog){}


  @Output() login: EventEmitter<any> = new EventEmitter();

  pressLogin(){
    this.login.emit(null);
  }

  openLoginDialog(enterAnimationDuration: string, exitAnimationDuration: string){
    this.dialog.open(LoginFormComponent, {
      // width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
