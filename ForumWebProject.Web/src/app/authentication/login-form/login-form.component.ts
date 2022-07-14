import { UsersService } from '../../api/services/users.service';
import { RoutesConstants } from '../../services/route-constants';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenRequest } from '../../api/models/token-request';
import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, RequiredValidator, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TokenService } from '../../api/services/token.service';
import { TokenResponse } from '../../api/models/token-response';
import { WelcomeDialogComponent } from '../welcome-dialog/welcome-dialog.component';
import { StrictHttpResponse } from '../../api/strict-http-response';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionsManager } from '../../services/permissions-service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent {
  private _redirect: string = '';
  logedFlag: boolean = false;

  constructor(private tokenService: TokenService, private usersService: UsersService, private permissionsManager: PermissionsManager,
     private dialog: MatDialog, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); 
        this._redirect = params['redirect'] ?? undefined;
    });
  }
     
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, 
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', Validators.required),
  });

  submit() {
    // if (this.form.valid) {
    //   this.submitEM.emit(this.form.value);
    // }
    this.cleanLocalStorage();
    this.form.controls['password'].setErrors(null);

    let loginData : TokenRequest = {
      email: this.form.controls["email"].value,
      password: this.form.controls["password"].value
    };

    this.tokenService.apiTokenPost$Response({body: loginData})
    .subscribe({
      next:(r: StrictHttpResponse<TokenResponse>) => {

        if(r.status == 200){
          this.setToken(r.body);
          this.setPermissions();
          console.log(this._redirect);
          this.router.navigateByUrl(this._redirect ?? RoutesConstants.Home);
        }

      },
      error: (err: Array<string>) =>{
        console.log(`catched error in login form: ${err}`);
      // if(err.statusCode == 401){
        
      // }
        this.form.controls['password'].setErrors({'incorrect': true});
        console.log("invalid");
      }
    });
  }

  setToken(tokenResponse: TokenResponse){
    localStorage.setItem("token", tokenResponse.token);
    localStorage.setItem("expiryTime", tokenResponse.expiryTime);

    this.logedFlag = true;
    this.openWelcomeDialog('300ms', '300ms');
  }

  setPermissions(){
    this.usersService.apiUsersPermissionsGet$Json().subscribe((perms: string[]) => {
      this.permissionsManager.setPermissions(perms);
    })
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

  switchToRegister(){
    this.router.navigate([RoutesConstants.Register], {queryParams: {redirect: this._redirect}});
  }

  @Input() error: string | null = '';

  @Output() submitEM = new EventEmitter();
}
