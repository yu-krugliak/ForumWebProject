import { ActivatedRoute, Router } from '@angular/router';
import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { RegisterRequest } from '../../api/models';
import { UsersService } from '../../api/services';
import {MatSnackBar} from '@angular/material/snack-bar';
import { RoutesConstants } from '../../services/route-constants';
import { StrictHttpResponse } from '../../api/strict-http-response';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})

export class RegisterFormComponent {
  private _redirect: string = '';

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, 
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    username : new FormControl('', Validators.required),
    firstname : new FormControl('', Validators.required),
    lastname : new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, 
      Validators.pattern("[0-9a-zA-Z!@#$%^&*]{6,}")]), 
    confirmpassword : new FormControl('', Validators.required),
  });

  constructor(private usersService: UsersService, private snackBar: MatSnackBar, private route: ActivatedRoute,
    private router: Router){}

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); 
        this._redirect = params['redirect'] ?? undefined;
    });
  }

  onPasswordChange() {
    var password = this.form.controls["password"];
    var confirmPassword = this.form.controls["confirmpassword"];

    if (password.value == confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: false });
    } else {
      confirmPassword.setErrors({ mismatch: true });
    }
  }

  send() : void{

    let request: RegisterRequest = ({
      email: this.form.controls["email"].value,
      userName: this.form.controls["username"].value,
      firstName: this.form.controls["firstname"].value,
      lastName: this.form.controls["lastname"].value,
      password: this.form.controls["password"].value,
      confirmPassword: this.form.controls["confirmpassword"].value,
    });

    console.log(request);
    this.usersService.apiUsersPost$Response({body: request})
    .subscribe({
      next:(r: StrictHttpResponse<void>) => {

        if(r.status == 200){
          console.log(this._redirect);
          this.openSnackBar("You successfully registered. Now you can log in.", "Log In");
          this.router.navigate([RoutesConstants.Login], {queryParams: {redirect: this._redirect}});
        }

      },
      error: (err: Array<string>) =>{
        console.log(`catched error in login form: ${err}`);
        this.openSnackBar("Something went wrong. Try again.", "Try");
      }
    });
  }
  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 5000});
  }

  @Input() error: string | null = '';

  @Output() submitEM = new EventEmitter();
}
 


