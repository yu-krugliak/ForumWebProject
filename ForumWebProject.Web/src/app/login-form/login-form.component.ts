import { TokenRequest } from '../api/models/token-request';
import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, RequiredValidator, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TokenService } from '../api/services/token.service';
import { TokenResponse } from '../api/models/token-response';
import { WelcomeDialogComponent } from '../welcome-dialog/welcome-dialog.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent {
  constructor(public dialogRef: MatDialogRef<LoginFormComponent>, private tokenService: TokenService, private dialog: MatDialog){}
  logedFlag: boolean = false;

  form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  submit() {
    // if (this.form.valid) {
    //   this.submitEM.emit(this.form.value);
    // }
    this.cleanLocalStorage();

    let loginData : TokenRequest = {
      email: this.form.controls["email"].value,
      password: this.form.controls["password"].value
    };

    this.tokenService.apiTokenPost({body: loginData})
    .subscribe((r: TokenResponse) => {
        if(r.token){
          this.setToken(r);
          console.log(r.token);
        }
        else{
          this.form;
        }
    });
  }

  setToken(tokenResponse: TokenResponse){
    localStorage.setItem("token", tokenResponse.token);
    localStorage.setItem("expiryTime", tokenResponse.expiryTime);

    this.logedFlag = true;
    this.openWelcomeDialog('300ms', '300ms');
  }

  openWelcomeDialog(enterAnimationDuration: string, exitAnimationDuration: string){
    this.dialog.open(WelcomeDialogComponent, {
      // width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  cleanLocalStorage(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiryTime");
  }

  @Input() error: string | null = '';

  @Output() submitEM = new EventEmitter();
}
