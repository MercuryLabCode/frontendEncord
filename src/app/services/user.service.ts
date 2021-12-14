import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { global } from '../services/global';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  public url: string;
  public identity;
  public token;
  public users;
  public login = false;
 

  constructor(public _http: HttpClient) {
    this.url = global.url;
  }
  getListUsers() {
    this.getUsers().subscribe(
      (res) => {
        if (res.status == 'success') {
          this.users = res.users;
        }
      },
      (error) => {}
    );
  }
  logeado(){
    return true;
  }

  getUsers(): Observable<any> {
    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this._http.get(this.url + 'usuarios', { headers: headers });
  }

  register(user): Observable<any> {
    let json = JSON.stringify(user);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.post(this.url + 'usuario' + '/registro', params, {
      headers: headers,
    });
  }

  signup(user, gettoken = null): Observable<any> {
   
    if (gettoken != null) {
      user.gettoken = 'true';
    }
    let json = JSON.stringify(user);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.post(this.url + 'usuario' + '/login', params, {
      headers: headers,
    });
  }

  getIdentity() {
    let identity = JSON.parse(sessionStorage.getItem('identity'));

    if (identity && identity != 'undefined') {
      this.identity = identity;
      this.logeado();
      this.login=true;
    } else {
      this.identity = null;
    }
   
    return this.identity;
  }
  getToken() {
    let token = sessionStorage.getItem('token');

    if (token && token != 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }
}
