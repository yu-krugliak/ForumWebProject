import { UsersService } from './../api/services/users.service';
import { UserView } from './../api/models/user-view';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  userInfo: UserView = {};
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.getUserInformation();
  }

  getUserInformation() : void{
    this.usersService.apiUsersEmailEmailGet$Json({email: localStorage.getItem("email")!}).subscribe((data: UserView)=>{
      console.log(data);
      this.userInfo = data;
    }) 
  }
}
