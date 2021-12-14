import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  public identity;
  public token;

  constructor(private _userService:UserService) {

    this.loadUser();

   }

  ngOnInit(){
  }

  ngDoCheck(){
    this.loadUser();
 }
 loadUser(){
   this.identity=this._userService.getIdentity();
   this.token=this._userService.getToken();
 }


}
