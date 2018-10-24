import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import '../../../../common/ckeditor.loader';
import 'ckeditor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ForumService } from '../../../../services/forum.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-guide-edit',
  templateUrl: './guide-edit.component.html',
  styleUrls: ['./guide-edit.component.css']
})
export class GuideEditComponent implements OnInit {

  topic_id:number=0;
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

  // multi-dropdown
  dataList:any = [];
  dropdownList:any = [];
  selectedItems = [];
  dropdownSettings = {};

  showPermit:number=1;

  selectedTemplate: string = '';

  isSubTitle: boolean = false;

  current_user:any={};
  current_user_role:any={};

  constructor(  private route: ActivatedRoute, 
                private formBuilder: FormBuilder, 
                private _forumService:ForumService,
                private userService:UserService, 
                private router: Router) {
    this.route.params.subscribe(res => 
      this.topic_id=res.id
    );

    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      subTitle: [''],
      category: [''],
      content: ['', Validators.required],
      file: [''],
      selectedItems: [[]]
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


    this._forumService.getGuideSpectator().subscribe(data =>{
      this.dropdownList = data;
    }
    ,
    (err)=>{
        console.log(err,err.message);
      }
    );
    

    this.dropdownSettings = { 
      singleSelection: false,
      text:"관람자 선택",
      selectAllText:'전부 선택',
      unSelectAllText:'전부 해제',
      searchPlaceholderText: 'Search Fields',
      enableSearchFilter: true,
      badgeShowLimit: 5,
      groupBy: "category"
    };

  }

  ngOnInit() {
    this.getGuideEdit();
  }

  getGuideEdit() {
    this._forumService.getGuideEdit(this.topic_id).subscribe(data =>{
      this.topic_data=data['topic'];
      this.topic_user=this.topic_data['user'];
      this.topic_answers=this.topic_data['answers'];
      this.topic_attach_file=this.topic_data['attachFile'];

      this.registerForm.controls['category'].setValue(this.topic_data.category);
      this.registerForm.controls['title'].setValue(this.topic_data.title);
      this.registerForm.controls['content'].setValue(this.topic_data.content);

      
      // permit 
      this.selectedItems = data['cumsumer'];

      if(this.topic_data.category == 'document') {
        this.showPermit = 0;
        this.registerForm.controls['subTitle'].setValue(this.topic_data.subTitle);
      }
    }
    ,
    (err)=>{
        console.log(err,err.message);
      }
    );
    
  }
  
  //event handler for the select element's change event
  selectChangeTemplateHandler (event: any) {
    //update the ui
    this.selectedTemplate = event.target.value;

    switch(this.selectedTemplate) {
      
      case "guide" : {
        this.showPermit = 1;
        break;
      }
      case "document" : {
        this.showPermit = 0;
        break;
      }
    }

  }
  
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

  deleteFile(attach_file) {
    this._forumService.deleteAttachFile(attach_file.id).subscribe(data =>{
      this.getGuideEdit();
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
    const formValue = this.registerForm.value;

    if(formValue.category == 'document') {
      if(!this.registerForm.get('subTitle').value){
        this.isSubTitle = true;
        return;
      }
    }

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
    const formData = new FormData();

    if(files[0]){
      formData.append('file', files[0]);
    }
    formData.append('title', formValue.title);
    formData.append('subTitle', formValue.subTitle);
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
    formData.append('permit',permitMember);
    this._forumService.updateGuide(this.topic_id,formData)
      .subscribe(res => {

        if(this.topic_data.category == 'document') {
          this.router.navigate(['/forum/document']);
        }
        else {
          this.router.navigate(['/forum/guide']);
        }
        
    });
  }

  // multi drop list
  onItemSelect(item: any) {
    
  }
  OnItemDeSelect(item: any) {
      
  }
  onSelectAll(items: any) {
      
  }
  onDeSelectAll(items: any) {
      
  }


}
