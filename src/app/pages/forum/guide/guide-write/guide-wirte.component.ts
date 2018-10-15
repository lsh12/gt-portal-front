import { Component, OnInit, ViewChild, Inject } from '@angular/core';

import '../../../../common/ckeditor.loader';
import 'ckeditor';
import * as urls from "../../../../common/urls";
import { CkeditorConfigService } from '../../../../services/ckeditor-config.service';
import { APP_BASE_HREF } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { ForumService } from '../../../../services/forum.service';

@Component({
  selector: 'app-guide-write',
  templateUrl: './guide-write.component.html',
  styleUrls: ['./guide-write.component.css']
})
export class GuideWriteComponent implements OnInit {
  ckeditorContent: string = '<p>Some html</p>';
  ckeditorConfig: any;

  // form
  title: String = '';
  registerForm: FormGroup;
  submitted = false;

  // multi-dropdown
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  showPermit:number=1;

  selectedTemplate: string = '';


  constructor(private ckService: CkeditorConfigService, 
              private formBuilder: FormBuilder, 
              private _http: HttpClient,
              private forumService:ForumService,
              private router: Router) {
    
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['guide'],
      content: ['', Validators.required],
      file: [''],
      selectedItems: [[]]
    });

    this.forumService.getGuideSpectator().subscribe(data =>{
      this.dropdownList = JSON.parse(JSON.stringify(data));

      console.log(this.dropdownList);
    }
    ,
    (err)=>{
        console.log(err,err.message);
      }
    );


    /*

    this.dropdownList = [
      { "id": 1, "itemName": "India", "category": "asia" },
      { "id": 2, "itemName": "Singapore", "category": "asia pacific" },
      { "id": 3, "itemName": "Germany", "category": "Europe" },
      { "id": 4, "itemName": "France", "category": "Europe" },
      { "id": 5, "itemName": "South Korea", "category": "asia" },
      { "id": 6, "itemName": "Sweden", "category": "Europe" },
    ];

    */

    this.selectedItems = [
        
    ];
    this.dropdownSettings = { 
          singleSelection: false, 
          text:"관람자 선택",
          selectAllText:'전부 선택',
          unSelectAllText:'전부 해제',
          enableSearchFilter: true,
          enableFilterSelectAll: false,
          groupBy:"category"
        };            
  }

  ngOnInit() {
    //this.ckeditorConfig=this.ckService.getConfig();
  }

  ngAfterViewChecked() {
    CKEDITOR.config.filebrowserUploadUrl = urls.uploadImageFileIdUrl;
  }

  //event handler for the select element's change event
  selectChangeTemplateHandler (event: any) {
    //update the ui
    this.selectedTemplate = event.target.value;

    switch(this.selectedTemplate) {
      
      case "guide" : {
        console.log(this.selectedTemplate);  
        this.showPermit = 1;
        //this.topicDesc = this.guideTemplateService.getRestfulTemplate();
        //this.registerForm.get('content').setValue(this.topicDesc);
        break;
      }
      case "document" : {
        console.log(this.selectedTemplate);
        this.showPermit = 0;
        //this.topicDesc = this.guideTemplateService.getTcpTemplate();
        //this.registerForm.get('content').setValue(this.topicDesc);
        break;
      }
    }

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
    formData.append('category', formValue.category);
    
    var permitMember:string='';
    
    for(let item in formValue.selectedItems){
      if(item == "0"){
        permitMember = formValue.selectedItems[item].id;
        continue;
      }
      permitMember = permitMember+','+formValue.selectedItems[item].id;
    } 

    console.log(permitMember);

    formData.append('permit',permitMember);

    console.log(formData);
    
    
    this.forumService.postGuide(formData)
      .subscribe(res => {
        this.router.navigate(['/forum/guide']);
        console.log(res);
    });
    
  }

  // multi drop list
  onItemSelect(item: any) {
    console.log(item);
    //console.log(this.registerForm.get('selectedItems').value);
  }
  OnItemDeSelect(item: any) {
      console.log(item);
      console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
      console.log(items);
  }
  onDeSelectAll(items: any) {
      console.log(items);
  }
}
