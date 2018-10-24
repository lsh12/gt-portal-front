import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ForumService } from '../../../../services/forum.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  topic_subTitle:string;
  topic_data:any={};
  topic_user:any={};
  topic_answers:Array<any>=[];
  topic_attach_file:Array<any>=[];
  
  // answer
  ckeditorContent: string = '<p>Some html</p>';
  ckeditorConfig: any;

  // form
  registerForm: FormGroup;
  submitted = false;
  current_user:any={};
  current_user_role:any={};
  constructor(
      private route: ActivatedRoute, 
      private formBuilder: FormBuilder, 
      private _forumService:ForumService,
      private userService:UserService,
      private router: Router) {
    this.route.params.subscribe(res => 
      this.topic_subTitle=res.subTitle
    );
    this.userService.getUserSession().subscribe(data =>{
      this.current_user=data['user'];
      this.current_user_role=data['role'];
    }
    ,
    (err)=>{
        window.location.href='/admin/login';
      }
    );  
  }

  ngOnInit() {
    this.getDocumentDetail();
  }

  getDocumentDetail() {
    this._forumService.getDocumentDetail(this.topic_subTitle).subscribe(data =>{
      this.topic_data=data;
      this.topic_user=data['user'];
      this.topic_answers=data['answers'];
      this.topic_attach_file=data['attachFile'];
    }
    ,
    (err)=>{
        console.log(err,err.message);
      }
    );
    
    
  }

  // back
  onBack() {
    this.router.navigate(['/forum/document']);
  }

  downloadFile(attach_file) {
    this._forumService.downloadByFileUrl(attach_file.fileDownloadUri).subscribe(data =>{
      window.URL.createObjectURL(data);

      var url = window.URL.createObjectURL(data);
      var a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = attach_file.fileName;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove(); // remove the element
    }
    ,
    (err)=>{
        console.log(err,err.message);
      }
    );

  }

  // delete document
  deleteDocument(){
    this._forumService.deleteDocument(this.topic_data.id).subscribe(data =>{
      this.router.navigate(['/forum/document']);
    }
    ,
    (err)=>{
        console.log(err,err.message);
      }
    );
  }
}
