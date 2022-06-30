import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
// export class RegisterFormComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

export class RegisterFormComponent {
  constructor(){}

  form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    username : new FormControl('', Validators.required),
    firstname : new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmpassword : new FormControl('', Validators.required),
  });

  submit() {
    // if (this.form.valid) {
    //   this.submitEM.emit(this.form.value);
    // }

    // this.tokenService.apiTokenPost({body: loginData})
    // .subscribe((r: TokenResponse) => {
    //     localStorage.setItem("token", r.token);
    //     console.log(r.token);
    // });
  }
  @Input() error: string | null = '';

  @Output() submitEM = new EventEmitter();
}
