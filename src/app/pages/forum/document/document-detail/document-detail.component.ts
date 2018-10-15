import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ForumService } from '../../../../services/forum.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  topic_title:string;
  topic_data:any={};
  topic_user:any={};
  topic_answers:Array<any>=[];
  topic_attach_file:Array<any>=[];
  current_user:any={};

  // answer
  ckeditorContent: string = '<p>Some html</p>';
  ckeditorConfig: any;

  // form
  registerForm: FormGroup;
  submitted = false;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private _forumService:ForumService, private router: Router) {
    this.route.params.subscribe(res => 
      this.topic_title=res.title
    );
  }

  ngOnInit() {
    this.getDocumentDetail();
  }

  getDocumentDetail() {
    this._forumService.getDocumentDetail(this.topic_title).subscribe(data =>{
      console.log(data);
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

  downloadFile(attach_file) {
    console.log('downloadFile:'+attach_file.id);

    this._forumService.downloadByFileUrl(attach_file.fileDownloadUri).subscribe(data =>{
      console.log(data);
      
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
    console.log(this.topic_data.id);
    this._forumService.deleteDocument(this.topic_data.id).subscribe(data =>{
      console.log(data);
      this.router.navigate(['/forum/guide/write']);
    }
    ,
    (err)=>{
        console.log(err,err.message);
      }
    );
  }
}
