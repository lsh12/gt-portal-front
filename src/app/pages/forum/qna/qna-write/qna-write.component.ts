import { Component, OnInit } from '@angular/core';
import '../../../../common/ckeditor.loader';
import 'ckeditor';
import * as urls from "../../../../common/urls";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { ForumService } from '../../../../services/forum.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-qna-write',
  templateUrl: './qna-write.component.html',
  styleUrls: ['./qna-write.component.css']
})
export class QnaWriteComponent implements OnInit {
  ckeditorContent: string = '<p>Some html</p>';
  ckeditorConfig: any;

  // form
  title: String = '';
  registerForm: FormGroup;
  submitted = false;

  current_user:any={};
  current_user_role:any={};
  
  constructor(
              private formBuilder: FormBuilder, 
              private forumService:ForumService,
              private userService:UserService,
              private router: Router) {
    
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      file: ['']
    });
      
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
    
  }

  ngAfterViewChecked() {
    //CKEDITOR.config.filebrowserUploadUrl = urls.uploadImageFileIdUrl;
  }

  // 첨부파일
  get f() { return this.registerForm.controls; }

  onFileChange(files: FileList) {
    const reader = new FileReader();
 
    if (files && files.length > 0) {
      
      // For Preview
      const file = files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.registerForm.patchValue({
          file: reader.result
       });
        // need to run CD since file load runs outside of zone
        //this.cd.markForCheck();
      };
    }
  }

  // back
  onBack() {
    this.router.navigate(['/forum/qna']);
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

    if(files[0]){
      formData.append('file', files[0]);
    }
    formData.append('title', formValue.title);
    formData.append('content', formValue.content);
    formData.append('category',  'qna');
    this.forumService.postQna(formData)
      .subscribe(res => {
        this.router.navigate(['/forum/qna']);
    });
    
  }

}
