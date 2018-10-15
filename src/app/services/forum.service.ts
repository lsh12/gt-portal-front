import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as urls from "../common/urls";

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  constructor(private _http: HttpClient) { }
  
  getGuideList(page:number, size:number) {
    return this._http.get(urls.guideListUrl+'?page='+page+'&size='+size, {
      reportProgress: true,
    });
  }

  getGuideDetail(topicId:number) {
    return this._http.get(urls.guideDetailUrl+'/'+topicId);
  }

  deleteGuide(topicId) {
    return this._http.delete(urls.guideDeleteUrl+'/'+topicId);
  }

  getGuideSpectator() {
    console.log(urls.spectatorUrl);
    
    return this._http.get(urls.spectatorUrl);
  }

  getQnaList(page:number, size:number) {
    return this._http.get(urls.qnaListUrl+'?page='+page+'&size='+size, {
      reportProgress: true,
    });
  }

  getQnaDetail(topicId:number) {
    return this._http.get(urls.qnaDetailUrl+'/'+topicId);
  }

  deleteQna(topicId) {
    return this._http.delete(urls.qnaDeleteUrl+'/'+topicId);
  }

  getDocumentDetail(topicTitle:string) {
    return this._http.get(urls.documentDetailUrl+'/'+topicTitle);
  }

  deleteDocument(topicId) {
    return this._http.delete(urls.documentDeleteUrl+'/'+topicId);
  }
  downloadByFileUrl(downloadUrl:string) {
    return this._http.get(downloadUrl,{ responseType: 'blob' });
  }

  postGuideAnswer(topicId,formData) {
    return this._http.post(urls.answerTopicUrl+'/'+topicId, formData);
  }

  postQnaAnswer(topicId,formData) {
    return this._http.post(urls.answerTopicUrl+'/'+topicId, formData);
  }

  postGuide(formData) {
    return this._http.post(urls.topicUrl, formData);
  }

  postQna(formData) {
    return this._http.post(urls.topicUrl, formData);
  }

}
