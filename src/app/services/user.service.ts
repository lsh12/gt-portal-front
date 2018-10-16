import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as urls from "../common/urls";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  getUserSession() {
    return this._http.get(urls.userSessionUrl);
  }

}
