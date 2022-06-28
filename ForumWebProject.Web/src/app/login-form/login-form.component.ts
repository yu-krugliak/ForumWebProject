import { TokenRequest } from '../api/models/token-request';
import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TokenService } from '../api/services/token.service';
import { TokenResponse } from '../api/models/token-response';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
// export class LoginFormComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

export class LoginFormComponent {
  constructor(public dialogRef: MatDialogRef<LoginFormComponent>, private tokenService: TokenService){}

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    // if (this.form.valid) {
    //   this.submitEM.emit(this.form.value);
    // }

    let loginData : TokenRequest = {
      email: this.form.controls["email"].value,
      password: this.form.controls["password"].value
    };

    this.tokenService.apiTokenPost({body: loginData})
    .subscribe((r: TokenResponse) => {
        localStorage.setItem("token", r.token);
        console.log(r.token);
    });
  }
  @Input() error: string | null = '';

  @Output() submitEM = new EventEmitter();
}
