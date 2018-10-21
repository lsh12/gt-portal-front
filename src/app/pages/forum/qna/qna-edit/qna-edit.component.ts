import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ForumService } from 'src/app/services/forum.service';

@Component({
  selector: 'app-qna-edit',
  templateUrl: './qna-edit.component.html',
  styleUrls: ['./qna-edit.component.css']
})
export class QnaEditComponent implements OnInit {
  topic_id:number=0;
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
      this.topic_id=res.id
    );

    this.registerForm = this.formBuilder.group({
      content: ['', Validators.required],
    });

  }

  ngOnInit() {
    
    this.getQnaDetail();
  }

  getQnaDetail() {
    this._forumService.getQnaDetail(this.topic_id).subscribe(data =>{
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
    
    /*
    this._forumUserService.getUserSession().subscribe(data =>{
      console.log(data);
      this.current_user=data['user'];
     
    }
    ,
    (err)=>{
        console.log(err,err.message);
      }
    );
    */
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


  // form summit for answer
  onSubmit(files: FileList) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        console.log('Invaild');
        return;
    }

    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
    const formData = new FormData();

    console.log(this.registerForm);
    console.log(files);

    const formValue = this.registerForm.value;

    formData.append('content', formValue.content);
    
    console.log(formData);
    this._forumService.postQnaAnswer(this.topic_data.id, formData)
      .subscribe(res => {
        this.getQnaDetail();
        console.log(res);
    });
    
  }

  // delete qna
  deleteQna(){
    console.log(this.topic_data.id);
    this._forumService.deleteQna(this.topic_data.id).subscribe(data =>{
      console.log(data);
      this.router.navigate(['/forum/qna']);
    }
    ,
    (err)=>{
        console.log(err,err.message);
      }
    );
  }
}
