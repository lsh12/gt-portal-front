import { Component, OnInit } from '@angular/core';
import '../../../../common/ckeditor.loader';
import 'ckeditor';
import * as urls from "../../../../common/urls";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { ForumService } from '../../../../services/forum.service';

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

  constructor(
              private formBuilder: FormBuilder, 
              private forumService:ForumService,
              private router: Router) {
    
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      file: ['']
    });
      
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
 
    console.log('onFileChange:'+event);

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

  // form summit
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

    if(files[0]){
      formData.append('file', files[0]);
    }
    formData.append('title', formValue.title);
    formData.append('content', formValue.content);
    formData.append('category',  'qna');
   
    console.log(formData);
    
    this.forumService.postQna(formData)
      .subscribe(res => {
        this.router.navigate(['/forum/qna']);
        console.log(res);
    });
    
  }

}
