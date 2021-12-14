import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';


import { global } from '../services/global';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  public url: string;
  public token;
public user;
  constructor(private _http: HttpClient, private _userService: UserService) {
    this.url = global.url;
    this.user =this._userService.getIdentity();
   
    this.token = this._userService.getToken();
  }
  /**
   * listado de datos dependiendo de la url que se le pase
   * @param url, completo de la URl
   * @returns  retorna la respuesta del backend, response si status 200, error si estatus 400
   */
  getData(url): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded' )
      .set('Authorization', this.token);
     

    return this._http.get(this.url + url, { headers: headers });
  }
  /**
   *
   * @param url
   * @param id
   * @returns
   */
   viewData(url, id): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.token);

    return this._http.get(this.url + url + '/' + id, { headers: headers });
  }
  /**
   *
   * @param url
   * @param params
   * @returns
   */

  addData(url, params): Observable<any> {
    let json = JSON.stringify(params);
    let data = 'json=' + json;

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.token);

    return this._http.post(this.url + url, data, {
      headers: headers,
    });
  }
  /**
   *
   * @param url
   * @param params
   * @param id
   * @returns
   */


  updateData(url,params,id):Observable<any>{

    let json = JSON.stringify(params);
    let data = 'json=' + json;

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.token);

    return this._http.put(this.url + url+'/'+id, data, {
      headers: headers,
    });

  }

  /**
   *
   * @param url
   * @param id
   * @returns
   */

  deleteData(url, id): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.token);

    return this._http.delete(this.url + url + '/' + id, { headers: headers });
  }


  /**
   *
   * @param url
   * @param id
   * @returns
   */
  filterData(url,id):Observable<any>{

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.token);

    return this._http.post(this.url + url + '/' + id, { headers: headers });

  }
    /**
   *
   * @param url
   * @param id
   * @returns
   */
  filterDataGet(url):Observable<any>{

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.token);

    return this._http.get(this.url + url , { headers: headers });

  }





  

}
