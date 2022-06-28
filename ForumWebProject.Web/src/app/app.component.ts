import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Forum';

  @Output() login: EventEmitter<any> = new EventEmitter();

  pressLogin(){
    this.login.emit(null);
  }
}
