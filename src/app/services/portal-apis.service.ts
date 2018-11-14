import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as urls from '../common/urls';

@Injectable({
  providedIn: 'root'
})
export class PortalApisService {

  constructor(private _http: HttpClient) { }

  getGuideList(page: number, size: number) {
    return this._http.get(urls.api_list + '?page=' + page + '&size=' + size, {
      reportProgress: true,
    });
  }
}
