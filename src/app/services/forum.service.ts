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

  getGuideEdit(topicId:number) {
    return this._http.get(urls.guideEditUrl+'/'+topicId);
  }

  deleteGuide(topicId) {
    return this._http.delete(urls.guideDeleteUrl+'/'+topicId);
  }

  getGuideSpectator() {
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

  getDocumentList(page:number, size:number) {
    return this._http.get(urls.documentListUrl+'?page='+page+'&size='+size, {
      reportProgress: true,
    });
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

  deleteAttachFile(fileId) {
    return this._http.delete(urls.deleteAttchFileUrl+'/'+fileId);
  }
  
  postGuideAnswer(topicId,formData) {
    return this._http.post(urls.answerTopicUrl+'/'+topicId, formData);
  }

  postQnaAnswer(topicId,formData) {
    return this._http.post(urls.answerTopicUrl+'/'+topicId, formData);
  }

  deleteAnswer(id) {
    return this._http.delete(urls.answerUrl+'/'+id);
  }

  postGuide(formData) {
    return this._http.post(urls.topicUrl, formData);
  }

  updateGuide(topicId, formData) {
    return this._http.post(urls.topicUrl+'/'+topicId, formData);
  }

  postQna(formData) {
    return this._http.post(urls.topicUrl, formData);
  }

}
