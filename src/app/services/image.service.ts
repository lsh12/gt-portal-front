import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as urls from "../common/urls";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private _http: HttpClient) { 
    
  }

  getImageList(page:number, size:number) {
    return this._http.get(urls.imagesUrl+'?page='+page+'&size='+size, {
      reportProgress: true,
    });
  }

  deleteImage(id) {
    return this._http.delete(urls.imagesUrl+'/'+id);
  }

  postImage(formData) {
    return this._http.post(urls.imagesUrl, formData);
  }

}
