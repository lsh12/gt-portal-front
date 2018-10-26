import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import '../../../../common/ckeditor.loader';
import 'ckeditor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ForumService } from '../../../../services/forum.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-guide-detail',
  templateUrl: './guide-detail.component.html',
  styleUrls: ['./guide-detail.component.css']
})
export class GuideDetailComponent implements OnInit {

  topic_id:number=0;
  topic_data:any={};
  topic_user:any={};
  topic_answers:Array<any>=[];
  topic_attach_file:Array<any>=[];
  current_user:any={};
  current_user_role:any={};

  // answer
  ckeditorContent: string = '<p>Some html</p>';
  ckeditorConfig: any;

  // form
  registerForm: FormGroup;
  submitted = false;

  constructor( 
          private route: ActivatedRoute, 
          private formBuilder: FormBuilder, 
          private _forumService:ForumService, 
          private userService:UserService,
          private router: Router) {
    this.route.params.subscribe(res => 
      this.topic_id=res.id
    );

    this.registerForm = this.formBuilder.group({
      content: ['', Validators.required],
    });

    this.userService.getUserSession().subscribe(data =>{
      this.current_user=data['user'];
      this.current_user_role=data['role'];
    }
    ,
    (err)=>{
        console.log(err,err.message);
      }
    );


  }

  ngOnInit() {
    this.getGuideDetail();
  }
  
  ngAfterViewChecked() {
    CKEDITOR.config.allowedContent=true
    CKEDITOR.config.fillEmptyBlocks=false;
    CKEDITOR.config.autoParagraph=false;
  }

  getGuideDetail() {
    this._forumService.getGuideDetail(this.topic_id).subscribe(data =>{
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

  // form summit
  onSubmit(files: FileList) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
    const formData = new FormData();

    const formValue = this.registerForm.value;

    formData.append('content', formValue.content);
    this._forumService.postGuideAnswer(this.topic_data.id, formData)
      .subscribe(res => {
        this.getGuideDetail();
    });
    
  }

  // delete guide
  deleteGuide(){
    this._forumService.deleteGuide(this.topic_data.id).subscribe(data =>{
      this.router.navigate(['/forum/guide']);
    }
    ,
    (err)=>{
        console.log(err,err.message);
      }
    );
  } 

  // remove answer
  removeAnswer(id){
    this._forumService.deleteAnswer(id).subscribe(data =>{
      this.getGuideDetail();
    }
    ,
    (err)=>{
        console.log(err,err.message);
      }
    );
  }

}
