import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import '../../../../common/ckeditor.loader';
import 'ckeditor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ForumService } from '../../../../services/forum.service';

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
  current_user:any={};

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

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private _forumService:ForumService, private router: Router) {
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
    this.getGuideDetail();

  }

  getGuideDetail() {
    this._forumService.getGuideDetail(this.topic_id).subscribe(data =>{
      console.log(data);
      this.topic_data=data;
      this.topic_user=data['user'];
      this.topic_answers=data['answers'];
      this.topic_attach_file=data['attachFile'];

      this.registerForm.controls['category'].setValue(this.topic_data.category);
      this.registerForm.controls['title'].setValue(this.topic_data.title);
      this.registerForm.controls['content'].setValue(this.topic_data.content);


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
  
  //event handler for the select element's change event
  selectChangeTemplateHandler (event: any) {
    //update the ui
    this.selectedTemplate = event.target.value;

    switch(this.selectedTemplate) {
      
      case "guide" : {
        console.log(this.selectedTemplate);  
        this.showPermit = 1;
        break;
      }
      case "document" : {
        console.log(this.selectedTemplate);
        this.showPermit = 0;
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

  deleteFile(attach_file) {
    this._forumService.deleteAttachFile(attach_file.id).subscribe(data =>{
      console.log(data);
      this.getGuideDetail();
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
        console.log('Invaild');
        return;
    }

    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
    const formData = new FormData();

    console.log(this.registerForm);
    console.log(files);

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

    console.log(permitMember);

    formData.append('permit',permitMember);

    console.log(formData);
    
    
    this._forumService.updateGuide(this.topic_id,formData)
      .subscribe(res => {
        this.router.navigate(['/forum/guide']);
        console.log(res);
    });
  }

  // delete guide
  deleteGuide(){
    console.log(this.topic_id);
    this._forumService.deleteGuide(this.topic_id).subscribe(data =>{
      console.log(data);
      this.router.navigate(['/forum/guide']);
    }
    ,
    (err)=>{
        console.log(err,err.message);
      }
    );
  }

}
