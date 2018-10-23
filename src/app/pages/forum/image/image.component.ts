import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
declare var ClipboardJS:any;

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  show = true;

  p: number = 1;
  size: number = 6;
  total:number = 0;
  collection: any[] = []; 
  // form
  title: String = '';
  registerForm: FormGroup;
  submitted = false;

  current_user:any={};

  // modal
  modal_item:any={};

  constructor(private formBuilder: FormBuilder,
    private _imageService:ImageService,
    private userService:UserService) { 
    this.registerForm = this.formBuilder.group({
      description: [''],
      file: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.userService.getUserSession().subscribe(data =>{
      console.log(data);
      this.current_user=data['user'];
    }
    ,
    (err)=>{
        console.log(err,err.message);
      }
    );
    this.getImageList();

    new ClipboardJS('#btnCopy');

  }

  setPage(i,event:any) {
    event.preventDefault();  
    this.p=i;
    this.getImageList();
  }

  pageChanged(event:any){
    console.log('event',event);
    this.p = event;
    this.getImageList();
  }

  getImageList(){
    
    this._imageService.getImageList(this.p-1, this.size).subscribe(data => {
      console.log(data);
      
      this.collection = data['content'];
      this.total= data['totalElements'];
      
      console.log('this.total',this.total);
      this.show = false; 
    }
    ,
    (err)=>{
        console.log(err,err.message);
      }
    );
  }

  deleteImage(id) {
    this._imageService.deleteImage(id).subscribe(data =>{
      console.log(data);
      this.getImageList();
    }
    ,
    (err)=>{
        console.log(err,err.message);
      }
    );  
  }

  setValue(item){
    console.log(item.fileName);
    this.modal_item = item;
  }


  // 첨부파일
  get f() { return this.registerForm.controls; }

  // form summit
  onSubmit(files: FileList) {

    console.log('onSubmit');

    this.submitted = true;
    const formValue = this.registerForm.value;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        console.log('Invaild');
        return;
    }

    const formData = new FormData();

    formData.append('file', files[0]);
    formData.append('description', formValue.description);
    formData.append('uploader', this.current_user.username);
    
    console.log(formData);
    
    
    this._imageService.postImage(formData)
      .subscribe(res => {
        console.log(res);
        this.getImageList();
    });
    
  }

}
