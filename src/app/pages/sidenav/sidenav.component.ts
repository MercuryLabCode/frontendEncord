import { Component, OnInit,Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute} from '@angular/router';
import { global } from '../../services/global';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  public identity;
  public token;
  public validacion = true;
  public id;
  public url;
  constructor(private _userService: UserService,
    @Inject(DOCUMENT) document: any) { }

  ngOnInit(){

    this.url = global.url;
  }
  ngDoCheck() {
     if (document.location.pathname != '/login') {

     this.loadUser();
     }
    if (document.location.pathname == '/list_modul') {
      this.validacion = false;

    } else {
      this.validacion = true;

    }
  }
  loadUser() {
    this.identity = this._userService.getIdentity();
    
    this.token = this._userService.getToken();
   this.id=this.identity.perfil_id;

  }

}
